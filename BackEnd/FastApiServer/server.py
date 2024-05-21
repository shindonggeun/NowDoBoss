
from pydantic import BaseModel
from fastapi import FastAPI, Request, HTTPException, BackgroundTasks
from pyspark.sql import SparkSession
from pyspark.sql.functions import lit
import json
import scheduler
from pyspark.sql import SparkSession, Row
from pyspark import SparkConf
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
from pyspark.sql.utils import AnalysisException
import concurrent.futures
import mongoDB
import pandas as pd
from fastapi import BackgroundTasks

app = FastAPI()

# # Spark 세션 초기화
# spark = SparkSession.builder \
#     .appName("FastAPI-Spark Integration") \
#     .getOrCreate()

class Item(BaseModel):
    data: str

class UserRequest(BaseModel):
    userId: int


@app.post("/recommend")
async def recommend_commercial_areas(request: UserRequest, background_tasks: BackgroundTasks):
    print("추천에 도착!")
    try:
        # 요청 로그
        print(f"Received request: {request}")
        # 처리 로직
        spark = start_recommend_spark()
        response = await recommend_commercials(spark, request.userId, background_tasks)
        # 응답 로그
        print(f"Sending response: {response}")
        return response
    except Exception as e:
        # 에러 로그
        print(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/data")
async def receive_data(request: Request):
    body = await request.body()
    data_str = body.decode('utf-8')  # 바이트를 문자열로 디코딩
    data = json.loads(data_str)      # 문자열을 JSON(딕셔너리)으로 변환
    print("Received data:", data)
    return {"message": "Data received successfully", "receivedData": data}

@app.get("/recommend-test")
async def recommend_commercial_areas():
    # Spark 세션 생성
    spark = start_recommend_spark()

    try:
        # DataFrame으로 HDFS 파일 읽기
        df = spark.read.csv("hdfs://master1:9000/data/commercial_data.csv", header=True, inferSchema=True)

        # 데이터 출력
        df.show()
        return {"status": "success", "data": df.collect()}
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Spark 세션 종료
        spark.stop()

@app.get("/test-spark-connection")
async def test_spark_connection():
    try:
        # Spark 세션 생성
        spark = start_recommend_spark()

        # 간단한 DataFrame 생성
        data = [("Alice", 34), ("Bob", 45), ("Cathy", 29)]
        columns = ["Name", "Age"]
        df = spark.createDataFrame(data, columns)

        # DataFrame 출력
        df.show()

        return {"status": "success", "message": "Spark session created and DataFrame displayed successfully"}
    except Exception as e:
        # 에러 로그
        print(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Spark 세션 종료
        spark.stop()

def start_recommend_spark():
    spark = SparkSession.builder \
        .appName("FastAPI-Spark Integration") \
        .master("spark://master1:7077") \
        .config("spark.pyspark.python", "/opt/venv/bin/python") \
        .config("spark.pyspark.driver.python", "/opt/venv/bin/python") \
        .getOrCreate()

    return spark

def action_weight(action):
    weights = {"click": 2, "search":4, "analysis": 7, "save": 10}
    return weights.get(action, 0)

async def update_weights_in_background(weights_dict):
    # MongoDB 업데이트 함수 호출
    mongoDB.update_weights(weights_dict)

async def train_model(df_actions):
    # ALS 모델 설정
    als = ALS(maxIter=5, regParam=0.01, userCol="userId", itemCol="commercialCode", ratingCol="weight", coldStartStrategy="drop")
    # 데이터를 이용하여 모델 훈련
    model = als.fit(df_actions)
    return model

async def load_or_train_model(df_actions):
    model_path = "model"
    try:
        if os.path.exists(model_path):
            print(f"Loading existing model from {model_path}...")
            model = ALSModel.load(model_path)
            print("Model loaded successfully.")
        else:
            print("No existing model found. Training new model.")
            model = await train_model(df_actions)
            model.save(model_path)
            print(f"Model saved at: {model_path}")
    except Exception as e:
        print(f"Failed to load or train model: {e}")
        print("Training new model.")
        model = await train_model(df_actions)
        model.write().overwrite().save(model_path)
        print(f"Model saved at: {model_path}")
    
    return model


async def recommend_commercials(spark, userId, background_tasks: BackgroundTasks):
    print("추천 메서드 안!")

    # 데이터 가져오기
    mongo_data = await mongoDB.get_mongodb_data()

    # 데이터프레임으로 변환
    df = pd.DataFrame(mongo_data)

    if df.empty:
        print("유저 데이터 없음")
        return

    # 데이터 확인
    print(df)
    # 필요한 열만 선택 (예: userId, action, commercialCode)
    df_actions = df[['userId', 'commercialCode', 'action']]
    print(df_actions)

    # 판다스 데이터프레임을 스파크 데이터프레임으로 변환
    sdf = spark.createDataFrame(df_actions)

    # UDF를 사용하여 가중치 컬럼 추가
    sdf = sdf.withColumn("weight", udf(action_weight, IntegerType())(col("action")))

    # HDFS에서 모델 불러오기 + 학습 + 저장
    model = await load_or_train_model(sdf)

    commercial_data_path = "data/commercial_data.csv"

    # commercial_data = spark.read.csv(commercial_data_path, header=True, inferSchema=True)
    commercial_data = spark.read.csv("hdfs://master1:9000/data/commercial_data.csv", header=True, inferSchema=True)
    commercial_columns = ["commercialCode", "totalTrafficFoot", "totalSales", "openedRate", "closedRate", "totalConsumption"]
    df_commercials = commercial_data.select(*commercial_columns)

    # 사용자별 상권 추천 - 추천 상권 개수는 추후 조정
    user_recommendations = model.recommendForAllUsers(20)
    #user_recommendations.show(truncate=False)

    # # 'recommendations' 배열의 구조를 분해하여 'commercialCode'와 'rating'을 별도의 컬럼으로 생성
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
    
    if df_integrated_with_recommendations.count() == 0:
        print("해당 유저의 정보 없음")
        empty_res = {}
        return empty_res
    
    # mongoDB에서 userId에 맞는 레코드 가져오기
    user_weights = await mongoDB.find_weights(userId)

    # 문서를 데이터프레임으로 변환하기 전에 리스트로 묶기
    user_weights_df = pd.DataFrame([user_weights])  # 리스트로 묶어서 전달

    # 판다스 데이터프레임을 스파크 데이터프레임으로 변환
    user_weights = spark.createDataFrame(user_weights_df)


    # df_integrated_with_recommendations와 user_weights를 userId 컬럼을 기준으로 조인합니다.
    joined_df = df_integrated_with_recommendations.join(user_weights, on='userId', how='inner')

    joined_df = joined_df.fillna(0)

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

    #print(res)

    background_tasks.add_task(a, final_recommendations_sorted, spark, userId, user_weights, background_tasks)

    return res  
   
async def a(final_recommendations_sorted, spark, userId, user_weights, background_tasks: BackgroundTasks):
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

    updated_weights = user_weights.withColumn(
        "totalTrafficFootValue", 
        (col("totalTrafficFootValue") * (1 - update_ratio)) + (lit(new_weights["totalTrafficFootValue"]) * update_ratio)
    ).withColumn(
        "totalSalesValue", 
        (col("totalSalesValue") * (1 - update_ratio)) + (lit(new_weights["totalSalesValue"]) * update_ratio)
    ).withColumn(
        "openedRateValue", 
        (col("openedRateValue") * (1 - update_ratio)) + (lit(new_weights["openedRateValue"]) * update_ratio)
    ).withColumn(
        "closedRateValue", 
        (col("closedRateValue") * (1 - update_ratio)) + (lit(new_weights["closedRateValue"]) * update_ratio)
    ).withColumn(
        "totalConsumptionValue", 
        (col("totalConsumptionValue") * (1 - update_ratio)) + (lit(new_weights["totalConsumptionValue"]) * update_ratio)
    )
    
    print(updated_weights.show())

    # Spark DataFrame에서 데이터를 추출하고 Python 딕셔너리로 변환
    weights_row = updated_weights.first().asDict()

    # 모든 값들을 Python 기본 데이터 타입으로 변환 (예를 들어, float 변환 등)
    weights_dict = {key: float(value) for key, value in weights_row.items()}

    await mongoDB.update_weights(weights_dict)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)