from pymongo import MongoClient
import pandas as pd
from pyspark.sql import Row
def get_mongodb_data():
    # MongoDB 서버에 연결
    client = MongoClient("mongodb://localhost:27017/")

    # 데이터베이스 선택
    db = client['nowdoboss']

    # 컬렉션 선택
    collection = db['data']

    # 데이터 조회
    documents = collection.find()

    # # 모든 문서 출력
    # for document in documents:
    #     print(document)

    # 문서를 파이썬 리스트로 변환
    documents_list = list(documents)

    # 클라이언트 연결 종료
    client.close()

    return documents_list

def find_weights(userId):
    # MongoDB 서버에 연결
    client = MongoClient("mongodb://localhost:27017/")
    
    # 데이터베이스 선택
    db = client['nowdoboss']
    
    # 컬렉션 선택
    collection = db['weights']
    
    # 주어진 ID로 문서 조회
    document = collection.find_one({"userId": userId})
    
    # 문서가 없을 경우 새로운 문서 생성
    if not document:
        # 새 문서 생성 (userId 제외 모든 필드를 0으로 설정)
        # 문서 구성
        document = {
            "userId": userId,
            "totalTrafficFootValue": 0.0,
            "totalSalesValue": 0.0,
            "openedRateValue": 0.0,
            "closedRateValue": 0.0,
            "totalConsumptionValue": 0.0,
            "finalRating": 0.0
        }
        # 새 문서를 컬렉션에 저장
        collection.insert_one(document)
        print(f"New document created for userId {userId} with default values.")
    else:
        # _id 필드 제거
        document.pop('_id', None)
        print(f"Document found for userId {userId}.")
    
    # 클라이언트 연결 종료
    client.close()
    
    return document

def update_weights(new_record):
    # MongoDB 서버에 연결
    client = MongoClient("mongodb://localhost:27017/")
    
    # 데이터베이스 선택
    db = client['nowdoboss']
    
    # 컬렉션 선택
    collection = db['weights']

    # # new_record가 DataFrame의 row 객체라면 Python 딕셔너리로 변환
    # if isinstance(new_record, Row):
    #     new_record = new_record.asDict()
    
    # userId를 기반으로 문서 업데이트
    result = collection.update_one(
        {"userId": new_record['userId']}, 
        {"$set": new_record}
    )
    
    # 결과 출력
    if result.matched_count == 0:
        print(f"No document found with userId {new_record['userId']} to update.")
    else:
        print(f"Document with userId {new_record['userId']} updated successfully.")

    # 클라이언트 연결 종료
    client.close()
