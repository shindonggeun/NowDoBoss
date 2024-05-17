
from pydantic import BaseModel
import spark_reco
from fastapi import FastAPI, Request, HTTPException, BackgroundTasks
from pyspark.sql import SparkSession
from pyspark.sql.functions import lit
import json
from pymongo import MongoClient
import scheduler

app = FastAPI()

# # Spark 세션 초기화
# spark = SparkSession.builder \
#     .appName("FastAPI-Spark Integration") \
#     .getOrCreate()

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


@app.get("/test")
def test():
    print("테스트중!")


@app.get("/hdfs-test")
async def hdfs_test():
    try:
        # Spark 세션 시작
        spark = start_spark_session()

        # HDFS 연결 테스트
        hdfs_path = "hdfs://master1:9000/"
        fs = spark._jvm.org.apache.hadoop.fs.FileSystem.get(spark._jsc.hadoopConfiguration())
        path = spark._jvm.org.apache.hadoop.fs.Path(hdfs_path)

        if fs.exists(path):
            files = [f.getPath().toString() for f in fs.listStatus(path)]
            return {"message": "HDFS 연결 성공", "files": files}
        else:
            return {"message": "HDFS 경로가 존재하지 않음"}
    except Exception as e:
        # 에러 로그
        print(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/recommend-test")
async def recommend_commercial_areas(commercial_code: int):
    try:
        # Spark 세션 시작
        spark = start_spark_session()

        # HDFS에서 데이터 읽기
        df = spark.read.csv("hdfs://master1:9000/data/localfile.csv", header=True)

        # user_id로 필터링
        result = df.filter(df["commercialCode"] == commercial_code).collect()

        # 결과 반환
        if result:
            return {"commercialCode": result[0]["commercial"], "id": result[0]["commercialCode"]}
        else:
            return {"message": "Commercial not found"}
    except Exception as e:
        # 에러 로그
        print(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def start_spark_session():
    spark = SparkSession.builder \
        .appName("FastAPI-Spark Integration") \
        .getOrCreate()
    return spark

def start_recommend_spark():
    # SparkSession 생성
    spark = SparkSession.builder \
        .appName("FastAPI-Spark Integration") \
        .getOrCreate()
    return spark

def start_update_spark():
    # Spark 세션 생성
    spark = SparkSession.builder \
        .appName("Data Processing") \
        .getOrCreate()
    return spark

# def stop_spark(spark):
#     spark.stop()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)