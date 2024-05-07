from apscheduler.schedulers.background import BackgroundScheduler
import time
from recommendation import load_last_update_time, load_model, action_weight, stop_spark
import json, datetime
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, udf, to_timestamp
from pyspark.sql.types import IntegerType

hdfs_path = 'hdfs://172.17.0.2:9000'
model_path = hdfs_path + "/user/hadoop/model"
filename = 'model_update_time.json'

def update_spark_model():
    print("Updating Spark model...")

    # Spark 세션 초기화 - 추후 설정에 맞게 변경
    spark = SparkSession.builder \
        .appName("DailyModelUpdate") \
        .config("spark.hadoop.fs.defaultFS", hdfs_path) \
        .getOrCreate()
    
    # 여기에 Spark 모델을 업데이트하는 코드 추가
    # 예: Spark 세션 생성, 데이터 로드, 모델 학습, 모델 저장 등
    # 이전 업데이트 시간 불러오기
    last_update_time = load_last_update_time(filename)
    print("Previous update time:", last_update_time)

    # HDFS에서 유저 행동 데이터 로드 - 추후 위치 변경
    df_actions = spark.read.csv(hdfs_path + "/user/hadoop/data/action_data.csv", header=True, inferSchema=True)
 
    # 문자열 타입의 timestamp를 datetime으로 변환
    df_actions = df_actions.withColumn("timestamp", to_timestamp(col("timestamp")))

    # 마지막 업데이트 시간 이후의 데이터만 필터링
    df_actions = df_actions.filter(col("timestamp") > last_update_time)

    # 가장 최근 업데이트 timestamp 파일 시스템으로 가져오기 => 해당 timestamp 이후의 사용자 행동 데이터만 가져오기 위해
    last_update_time = datetime.datetime.now().isoformat()
    with open('model_update_time.json', 'w') as f:
        json.dump({'last_update_time': last_update_time}, f)

    action_columns = ["userId", "action", "commercialCode"]
    df_actions = df_actions.select(*action_columns)

    # UDF 등록 및 가중치 열 추가
    action_weight_udf = udf(action_weight, IntegerType())
    df_actions = df_actions.withColumn("weight", action_weight_udf(col("action")))

    # HDFS에서 모델 불러오기 + 학습 + 저장
    model = load_model(model_path, df_actions)

    spark.stop(spark)

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
