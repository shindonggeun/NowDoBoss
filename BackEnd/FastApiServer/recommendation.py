from pyspark.sql import SparkSession
from pyspark.sql.functions import col, udf
from pyspark.sql.types import IntegerType
from pyspark.ml.recommendation import ALS, ALSModel
from pyspark.sql.functions import corr
import json
import datetime
from pyspark.sql.functions import explode
import os
from pyspark.sql.functions import when

# 모델 최신 업데이트 시간 저장할 파일 경로 설정
filename = 'model_update_time.json'

model_path = "hdfs://namenode:8020/user/hadoop/model/als_model"

# Spark 세션 초기화 - 추후 설정에 맞게 변경
spark = SparkSession.builder \
    .appName("HadoopDataLoad") \
    .config("spark.hadoop.fs.defaultFS", "hdfs://namenode:8020") \
    .getOrCreate()

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
def load_user_weights(userId):
    weights_path = f"hdfs://namenode:8020/user/hadoop/weight/{userId}/user_weights.json"
    if spark._jsparkSession.catalog().tableExists(weights_path):
        return spark.read.json(weights_path)
    return spark.createDataFrame([], schema="weightValue double")

def load_model(spark, model_path, df_actions):
    try:
        # HDFS에서 모델 로드 시도
        model = ALSModel.load(model_path)
        model = als.fit(df_actions)
        model.save(model_path)
        print("Model loaded successfully.")
    except Exception as e:
        print("Model not found, training a new one. Error:", e)
        # 모델이 존재하지 않을 경우 새로 훈련
        als = ALS(maxIter=5, regParam=0.01, userCol="userId", itemCol="commercialCode", ratingCol="weight", coldStartStrategy="drop")
        model = als.fit(df_actions)
        # 새로 훈련된 모델 저장
        model.save(model_path)
        print("New model trained and saved.")
    return model

def recommendCommercials(userId):
    # 이전 업데이트 시간 불러오기
    last_update_time = load_last_update_time(filename)
    print("Previous update time:", last_update_time)

    # HDFS에서 유저 행동 데이터 로드 - 추후 위치 변경
    df_actions = spark.read.csv("hdfs://namenode:8020/user/hadoop/user_behavior_logs.csv")
 
    # 문자열 타입의 timestamp를 datetime으로 변환
    df_actions = df_actions.withColumn("timestamp", col("timestamp").cast("timestamp"))

    # 마지막 업데이트 시간 이후의 데이터만 필터링
    action_data = df_actions.filter(col("timestamp") > last_update_time)

    # 가장 최근 업데이트 timestamp 파일 시스템으로 가져오기 => 해당 timestamp 이후의 사용자 행동 데이터만 가져오기 위해
    last_update_time = datetime.datetime.now().isoformat()
    with open('model_update_time.json', 'w') as f:
        json.dump({'last_update_time': last_update_time}, f)

    # 이전 업데이트 시간 이후의 사용자 행동 데이터 가져오기 예시
    action_data = [
        (1, "click", 1),
        (1, "search", 2),
        (2, "search", 3),
        (2, "search", 4),
        (1, "save", 2),
        (3, "save", 1),
        (3, "click", 1),
        (4, "search", 2),
        (2, "search", 4),
        (1, "simulation", 2),
        (1, "simulation", 1),
        (1, "save", 1),
        (3, "save", 1),
        (3, "click", 1),
        (4, "search", 2),
        (2, "search", 3),
        (2, "search", 4),
        (1, "save", 2),
        (1, "simulation", 2),
        (5, "click", 1),
        (5, "click", 1),
        (2, "save", 1)
    ]
    action_columns = ["userId", "action", "commercialCode"]
    df_actions = spark.createDataFrame(action_data, schema=action_columns)

    # UDF 등록 및 가중치 열 추가
    action_weight_udf = udf(action_weight, IntegerType())
    df_actions = df_actions.withColumn("weight", action_weight_udf(col("action")))

    # 상권 데이터 예시 - 나중에 실제 데이터로
    commercial_data = [
        (1, 1000, 100, 5, 2, 80),
        (2, 500, 85, 8, 7, 75),
        (3, 1220, 110, 4, 5, 95),
        (4, 750, 50, 2, 2, 45)
    ]

    # 상권 코드, 유동 인구, 추정 매출, 개업률, 폐업률, 소비
    commercial_columns = ["commercialCode", "trafficFoot", "sales", "openedRate", "closedRate", "consumption"]
    df_commercials = spark.createDataFrame(commercial_data, schema=commercial_columns)

    # HDFS에서 모델 불러오기 + 학습 + 저장
    model = load_model(spark, model_path, df_actions)

    # 사용자별 상권 추천 - 추천 상권 개수는 추후 조정
    user_recommendations = model.recommendForAllUsers(10)
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

    # userId가 유저의 아이디와 같은 경우만 가져오기 ***** 나중에 요청한 userId 변수로 바꾸기 **********
    df_integrated_with_recommendations = df_integrated_with_recommendations[df_integrated_with_recommendations['userId'] == userId]

    # JSON 파일 로드
    user_weights = load_user_weights(userId)

    # 추천 결과 DataFrame과 가중치 DataFrame 조인
    df_recommendations_with_weights = recommendations_df.join(user_weights, "userId", "left_outer")

    # 가중치가 있는 경우와 없는 경우를 처리
    final_recommendations = df_recommendations_with_weights.select(
        "commercialCode", "trafficFoot", "sales", "openedRate", "closedRate", "consumption",
        when(col("weightValue").isNull(), col("rating")).otherwise(col("rating") + col("rating") * col("weightValue")).alias("finalRating")
    )
    # 반환할 결과
    res = final_recommendations.toPandas().to_dict(orient="records")

    # 추천 점수와 각 특성 간의 상관관계 계산
    correlations = final_recommendations.select(
        corr("rating", "trafficFoot").alias("corr_population"),
        corr("rating", "sales").alias("corr_sales"),
        corr("rating", "openedRate").alias("corr_openedRate"),
        corr("rating", "closedRate").alias("corr_closedRate"),
        corr("rating", "consumption").alias("corr_consumption")
    )

    # 새로운 가중치와 이전 가중치 점진적 업데이트 (50%만 반영) + 하둡에 저장
    # 새로운 가중치 정보를 저장할 딕셔너리
    new_weights = {}

    # correlations 데이터프레임의 각 열에 대해 반복하여 상관관계 값을 new_weights에 저장
    new_weights["trafficFoot"] = correlations["corr_population"]  
    new_weights["sales"] = correlations["corr_sales"]  
    new_weights["openedRate"] = correlations["corr_openedRate"]  
    new_weights["closedRate"] = correlations["corr_closedRate"]  
    new_weights["consumption"] = correlations["corr_consumption"]

    update_ratio = 0.5  # 새 가중치를 50% 반영
    updated_weights = {k: user_weights[k] * (1 - update_ratio) + new_weights[k] * update_ratio for k in user_weights} 

    # 저장 옵션 설정 및 실행
    weights_path = f"hdfs://namenode:8020/user/hadoop/weight/{userId}/user_weights.json"
    updated_weights.write.mode('overwrite').json(weights_path)

    return res

def stop_spark():
    spark.stop()