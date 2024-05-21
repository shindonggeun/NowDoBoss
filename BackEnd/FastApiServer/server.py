
from pydantic import BaseModel
import spark_reco
from fastapi import FastAPI, Request, HTTPException, BackgroundTasks
from pyspark.sql import SparkSession
from pyspark.sql.functions import lit
import json

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
        response = await spark_reco.recommend_commercials(spark, request.userId, background_tasks)
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)