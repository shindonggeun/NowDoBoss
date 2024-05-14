

# def startup_db_client():
#     app.mongodb_client = AsyncIOMotorClient("mongodb://localhost:27017")
#     app.mongodb = app.mongodb_client['mydatabase']  # 'mydatabase'는 사용할 데이터베이스 이름입니다.


# def shutdown_db_client():
#     app.mongodb_client.close()

# def read_items():
#     items = []
#     async for item in app.mongodb.my_collection.find():
#         items.append(item)
#     return items