from pyspark.sql import SparkSession
from pyspark.sql.functions import col, udf, to_timestamp
from pyspark.sql.types import IntegerType
from pyspark.ml.recommendation import ALS, ALSModel
from pyspark.sql.functions import corr
import json
import datetime
from pyspark.sql.functions import explode
import os
from pyspark.sql.functions import when, desc
from pyspark.sql import functions as F
from pyspark.sql.functions import lit

# 모델 최신 업데이트 시간 저장할 파일 경로 설정
filename = 'model_update_time.json'
hdfs_path = 'hdfs://172.17.0.2:9000'
model_path = hdfs_path + "/user/hadoop/model"

# 마지막 업데이트 시간을 불러오는 함수
def load_last_update_time(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            data = json.load(f)
            return data['last_update_time']
    else:
        return None

# 사용자 행동별 가중치 부여 함수
def action_weight(action):
    weights = {"click": 2, "search":4, "simulation": 7, "save": 10}
    return weights.get(action, 0)

# 사용자 별 상권 특징에 대한 가중치 정보
def load_user_weights(spark, userId):
    weights_path = hdfs_path + "/user/hadoop/weight/user_weights.json"
    try:
        # 파일이 존재하는지 확인
        user_weights = spark.read.json(weights_path)
        # userId 컬럼이 없는 경우 빈 DataFrame 반환
        if "userId" not in user_weights.columns:
            print("Error: userId column not found in user weights DataFrame.")
            return spark.createDataFrame([(userId, 0.0, 0.0, 0.0, 0.0, 0.0)], schema="userId long, totalTrafficFootValue double, totalSalesValue double, openedRateValue double, closedRateValue double, totalConsumptionValue double")
        # userId에 해당하는 레코드 필터링
        if user_weights.filter(user_weights.userId == userId).count() == 0:
            print(f"User {userId} not found in user weights DataFrame.")
            return spark.createDataFrame([(userId, 0.0, 0.0, 0.0, 0.0, 0.0)], schema="userId long, totalTrafficFootValue double, totalSalesValue double, openedRateValue double, closedRateValue double, totalConsumptionValue double")
        user_weights = user_weights.filter(user_weights.userId == userId)
        return user_weights.fillna(0, subset=["totalTrafficFootValue", "totalSalesValue", "openedRateValue", "closedRateValue", "totalConsumptionValue"])
    except Exception as e:
        print(f"Error loading user weights: {e}")
        # 파일이 존재하지 않는 경우 빈 DataFrame 반환
        return spark.createDataFrame([(userId, 0.0, 0.0, 0.0, 0.0, 0.0)], schema="userId long, totalTrafficFootValue double, totalSalesValue double, openedRateValue double, closedRateValue double, totalConsumptionValue double")

def update_user_weights(spark, userId, new_weights):
    weights_path = hdfs_path + "/user/hadoop/weight/user_weights.json"
    try:
        # 파일이 존재하는지 확인
        user_weights = spark.read.json(weights_path)
        # userId 컬럼이 없는 경우 빈 DataFrame 반환
        if "userId" not in user_weights.columns:
            print("Error: userId column not found in user weights DataFrame.")
            return
        # userId에 해당하는 레코드 필터링
        user_weights = user_weights.filter(user_weights.userId != userId)
        # 새로운 가중치 레코드 추가
        new_row = spark.createDataFrame([(*new_weights.values(),)], schema=list(new_weights.keys()))
        new_row = new_row.withColumn("userId", lit(userId))
        updated_weights = user_weights.union(new_row)
        # 저장
        updated_weights.write.mode('overwrite').json(weights_path)
        print(f"Updated weights for user {userId} successfully.")
    except Exception as e:
        print(f"Error updating user weights: {e}")
        # 파일이 존재하지 않는 경우 새로운 DataFrame 생성 후 가중치 추가
        new_row = spark.createDataFrame([(*new_weights.values(),)], schema=list(new_weights.keys()))
        new_row = new_row.withColumn("userId", lit(userId))
        new_row.write.mode('overwrite').json(weights_path)
        print(f"New weights for user {userId} added successfully.")

def load_model(model_path, df_actions):
    try:
        # 모델 로드 시도
        model = ALSModel.load(model_path)
        print("Model loaded successfully.")
        
        # 추가된 데이터를 사용하여 모델을 더 학습
        model = model.fit(df_actions)
        print("Model retrained with additional data.")
        
        # 다시 훈련된 모델 저장
        model.save(model_path)
        print("Retrained model saved.")
    except Exception as e:
        print("Model not found, training a new one. Error:", e)
        # 모델이 존재하지 않을 경우 새로 훈련
        als = ALS(maxIter=5, regParam=0.01, userCol="userId", itemCol="commercialCode", ratingCol="weight", coldStartStrategy="drop")
        model = als.fit(df_actions)
        # 훈련된 모델 저장
        model.save(model_path)
        print("New model trained and saved.")
    return model

def recommend_commercials(userId):
    # Spark 세션 초기화 - 추후 설정에 맞게 변경
    spark = SparkSession.builder \
        .appName("Recommendation") \
        .config("spark.hadoop.fs.defaultFS", hdfs_path) \
        .getOrCreate()
    
    # 이전 업데이트 시간 불러오기
    last_update_time = load_last_update_time(filename)
    print("Previous update time:", last_update_time)

    # HDFS에서 유저 행동 데이터 로드 - 추후 위치 변경
    df_actions = spark.read.csv(hdfs_path + "/user/hadoop/data/action_data.csv", header=True, inferSchema=True)

    # 문자열 타입의 timestamp를 datetime으로 변환
    df_actions = df_actions.withColumn("timestamp", to_timestamp(col("timestamp")))

    # 마지막 업데이트 시간 이후의 데이터만 필터링
    action_data = df_actions.filter(col("timestamp") > last_update_time)

    # 가장 최근 업데이트 timestamp 파일 시스템으로 가져오기 => 해당 timestamp 이후의 사용자 행동 데이터만 가져오기 위해
    last_update_time = datetime.datetime.now().isoformat()
    with open('model_update_time.json', 'w') as f:
        json.dump({'last_update_time': last_update_time}, f)

    action_columns = ["userId", "action", "commercialCode"]
    df_actions = df_actions.select(*action_columns)

    # UDF 등록 및 가중치 열 추가
    action_weight_udf = udf(action_weight, IntegerType())
    df_actions = df_actions.withColumn("weight", action_weight_udf(col("action")))

    commercial_data_path = hdfs_path + "/user/hadoop/data/commercial_data.csv"

    commercial_data = spark.read.csv(commercial_data_path, header=True, inferSchema=True)
    commercial_columns = ["commercialCode", "totalTrafficFoot", "totalSales", "openedRate", "closedRate", "totalConsumption"]
    df_commercials = commercial_data.select(*commercial_columns)

    # 모델 로드 및 학습
    model = load_model(spark, model_path, df_actions)

    # 사용자별 상권 추천 - 추천 상권 개수는 추후 조정
    user_recommendations = model.recommendForAllUsers(20)
    user_recommendations.show(truncate=False)

    # 'recommendations' 배열의 구조를 분해하여 'commercialCode'와 'rating'을 별도의 컬럼으로 생성
    recommendations_df = user_recommendations.withColumn("recommendation", explode("recommendations")).select(
        col("userId"),
        col("recommendation.commercialCode").alias("commercialCode"),
        col("recommendation.rating").alias("rating")
    )

    # 상권 데이터와 조인
    # df_commercials의 'commercialCode' 컬럼 타입이 문자열인지 확인하고 필요하면 타입을 조정
    df_integrated_with_recommendations = recommendations_df.join(df_commercials, recommendations_df.commercialCode == df_commercials.commercialCode, "inner")

    # userId가 유저의 아이디와 같은 경우만 가져오기 
    df_integrated_with_recommendations = df_integrated_with_recommendations[df_integrated_with_recommendations['userId'] == userId]

    # JSON 파일 로드
    user_weights = load_user_weights(spark, userId)

    # df_integrated_with_recommendations와 user_weights를 userId 컬럼을 기준으로 조인합니다.
    joined_df = df_integrated_with_recommendations.join(user_weights, on='userId', how='inner')


    # 각 항목에 대해 가중 평가 값을 계산합니다.
    weighted_df = joined_df.withColumn('weighted_totalTrafficFoot', col('totalTrafficFoot') * col('totalTrafficFootValue')) \
                        .withColumn('weighted_totalSales', col('totalSales') * col('totalSalesValue')) \
                        .withColumn('weighted_openedRate', col('openedRate') * col('openedRateValue')) \
                        .withColumn('weighted_closedRate', col('closedRate') * col('closedRateValue')) \
                        .withColumn('weighted_totalConsumption', col('totalConsumption') * col('totalConsumptionValue'))

    # 각 레코드의 rating을 계산하여 새로운 열인 'new_rating'에 저장
    df_updated = weighted_df.withColumn(
        "final_rating",
        F.col("rating") + 
        F.col("weighted_totalTrafficFoot") +
        F.col("weighted_totalSales") +
        F.col("weighted_openedRate") +
        F.col("weighted_closedRate") +
        F.col("weighted_totalConsumption")
    )

    # 삭제할 컬럼 이름 지정 (예시: "column_to_drop")
    columns_to_drop = ["totalTrafficFootValue", "totalSalesValue",
                    "openedRateValue", "closedRateValue", "totalConsumptionValue", "weighted_totalTrafficFoot", "weighted_totalSales", "weighted_openedRate", "weighted_closedRate",
                    "weighted_totalConsumption", "rating"]  # 삭제할 컬럼 이름들을 리스트로 지정

    # 컬럼 삭제
    df_cleaned = df_updated.drop(*columns_to_drop)

    # finalRating 열을 기준으로 내림차순 정렬
    final_recommendations_sorted = df_cleaned.orderBy(desc('final_rating'))

    # 반환할 결과
    final_recommendations_sorted.show(truncate=False)


    # 반환할 결과
    res = final_recommendations_sorted.toPandas().to_dict(orient="records")

    # 추천 점수와 각 특성 간의 상관관계 계산
    correlations = final_recommendations_sorted.select(
        corr("final_rating", "totalTrafficFoot").alias("corr_population"),
        corr("final_rating", "totalSales").alias("corr_sales"),
        corr("final_rating", "openedRate").alias("corr_openedRate"),
        corr("final_rating", "closedRate").alias("corr_closedRate"),
        corr("final_rating", "totalConsumption").alias("corr_consumption")
    )

    # correlations DataFrame의 각 열의 값을 수집하여 딕셔너리에 저장
    new_weights = {
        "userId": userId,
        "totalTrafficFootValue": correlations.select("corr_population").collect()[0][0],
        "totalSalesValue": correlations.select("corr_sales").collect()[0][0],
        "openedRateValue": correlations.select("corr_openedRate").collect()[0][0],
        "closedRateValue": correlations.select("corr_closedRate").collect()[0][0],
        "totalConsumptionValue": correlations.select("corr_consumption").collect()[0][0]
    }

    # 새로운 가중치와 이전 가중치 점진적 업데이트 (50%만 반영)
    update_ratio = 0.5  # 새 가중치를 50% 반영
    updated_weights = {
        "userId": new_weights["userId"],
        "totalTrafficFootValue": float(user_weights.select("totalTrafficFootValue").collect()[0][0]) * (1 - update_ratio) + float(new_weights["totalTrafficFootValue"]) * update_ratio,
        "totalSalesValue": float(user_weights.select("totalSalesValue").collect()[0][0]) * (1 - update_ratio) + float(new_weights["totalSalesValue"]) * update_ratio,
        "openedRateValue": float(user_weights.select("openedRateValue").collect()[0][0]) * (1 - update_ratio) + float(new_weights["openedRateValue"]) * update_ratio,
        "closedRateValue": float(user_weights.select("closedRateValue").collect()[0][0]) * (1 - update_ratio) + float(new_weights["closedRateValue"]) * update_ratio,
        "totalConsumptionValue": float(user_weights.select("totalConsumptionValue").collect()[0][0]) * (1 - update_ratio) + float(new_weights["totalConsumptionValue"]) * update_ratio
    }

    update_user_weights(userId, updated_weights)

    stop_spark(spark)
    
    return res  

def stop_spark(spark):
    spark.stop()