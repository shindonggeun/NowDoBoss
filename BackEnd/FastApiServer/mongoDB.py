from pymongo import MongoClient

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

    # # 클라이언트 연결 종료
    # client.close()