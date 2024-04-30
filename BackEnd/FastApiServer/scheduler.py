from apscheduler.schedulers.background import BackgroundScheduler
import time
from recommendation import load_last_update_time,load_model, action_weight
import json, datetime
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, udf
from pyspark.sql.types import IntegerType

model_path = "hdfs://namenode:8020/user/hadoop/model/als_model"
filename = 'model_update_time.json'

# Spark 세션 초기화 - 추후 설정에 맞게 변경
spark = SparkSession.builder \
    .appName("DailyUpdate") \
    .config("spark.hadoop.fs.defaultFS", "hdfs://namenode:8020") \
    .getOrCreate()

def update_spark_model():
    print("Updating Spark model...")
    # 여기에 Spark 모델을 업데이트하는 코드 추가
    # 예: Spark 세션 생성, 데이터 로드, 모델 학습, 모델 저장 등
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

    spark.stop()

# 스케줄러 생성
scheduler = BackgroundScheduler()

# 매일 자정에 'update_spark_model' 함수 실행
scheduler.add_job(update_spark_model, 'cron', hour=0, minute=0)

# 스케줄러 시작
scheduler.start()

# 메인 프로그램이 종료되지 않도록 대기
try:
    while True:
        time.sleep(2)
except (KeyboardInterrupt, SystemExit):
    # 스케줄러 종료
    scheduler.shutdown()
