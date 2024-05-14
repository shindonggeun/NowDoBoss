# from apscheduler.schedulers.background import BackgroundScheduler
# import time
# import json, datetime
# from pyspark.sql import SparkSession
# from pyspark.sql.functions import col, udf, to_timestamp
# from pyspark.sql.types import IntegerType
# import mongoDB
# import pandas as pd
# import spark_reco
# import server

# model_path = "model"
# filename = 'model_update_time.json'



# # 가중치 계산을 위한 UDF 정의
# def action_weight(action):
#     weights = {"click": 2, "search": 4, "simulation": 7, "save": 10}
#     return weights.get(action, 0)



# def update_model():
#     spark = server.start_update_spark()
#     # UDF 등록
#     spark.udf.register("action_weight_udsf", action_weight, IntegerType())
    
#     # 여기에 Spark 모델을 업데이트하는 코드 추가
#     # 예: Spark 세션 생성, 데이터 로드, 모델 학습, 모델 저장 등
#     # 이전 업데이트 시간 불러오기
#     # last_update_time = load_last_update_time(filename)
#     # print("Previous update time:", last_update_time)

#     # 데이터 가져오기
#     mongo_data = mongoDB.get_mongodb_data()

#     # 데이터프레임으로 변환
#     df = pd.DataFrame(mongo_data)

#     # 데이터 확인
#     print(df)
#     # 필요한 열만 선택 (예: userId, action, commercialCode)
#     df_actions = df[['userId', 'commercialCode', 'action']]
#     print(df_actions)

#     # 판다스 데이터프레임을 스파크 데이터프레임으로 변환
#     sdf = spark.createDataFrame(df_actions)

#     # UDF를 사용하여 가중치 컬럼 추가
#     sdf = sdf.withColumn("weight", udf(action_weight, IntegerType())(col("action")))

#     # HDFS에서 모델 불러오기 + 학습 + 저장
#     model = spark_reco.load_or_train_model(sdf)

#     server.stop_spark(spark)

# # 스케줄러 생성
# scheduler = BackgroundScheduler()

# # 매일 자정에 'update_model' 함수 실행 스케줄링
# scheduler.add_job(update_model, 'cron', hour=0, minute=0)

# # 스케줄러 시작
# scheduler.start()

# # 메인 프로그램이 종료되지 않도록 대기
# try:
#     while True:
#         time.sleep(2)
# except (KeyboardInterrupt, SystemExit):
#     # 스케줄러 종료
#     scheduler.shutdown()
#     print("Scheduler shutdown successfully.")



