# import pandas as pd
# from sklearn.ensemble import RandomForestRegressor
# import json
# import datetime
# import os

# # 데이터 파일 경로
# action_data_path = "data/action_data.csv"
# commercial_data_path = "data/commercial_data.csv"
# model_path = "models/rf_model.pkl"

# def load_last_update_time():
#     try:
#         with open('model_update_time.json', 'r') as file:
#             data = json.load(file)
#         return data['last_update_time']
#     except FileNotFoundError:
#         return None

# def update_last_update_time():
#     with open('model_update_time.json', 'w') as file:
#         json.dump({'last_update_time': datetime.datetime.now().isoformat()}, file)

# def load_data():
#     actions = pd.read_csv(action_data_path)
#     commercials = pd.read_csv(commercial_data_path)
#     actions['weight'] = actions['action'].map(lambda action: {"click": 2, "search": 4, "simulation": 7, "save": 10}[action])
#     return actions, commercials

# def train_model(actions):
#     X = actions[['userId', 'commercialCode']]
#     y = actions['weight']
#     model = RandomForestRegressor(n_estimators=100, random_state=42)
#     model.fit(X, y)
#     pd.to_pickle(model, model_path)

# def load_model():
#     try:
#         return pd.read_pickle(model_path)
#     except FileNotFoundError:
#         return None

# def recommend_commercials(userId):
#     model = load_model()
#     if model is None:
#         print("Model not found, training a new one.")
#         actions, _ = load_data()
#         train_model(actions)
#         model = load_model()
    
#     _, commercials = load_data()
#     test_data = pd.DataFrame({'userId': [userId] * len(commercials), 'commercialCode': commercials['commercialCode']})
#     test_data['prediction'] = model.predict(test_data[['userId', 'commercialCode']])
#     return test_data.nlargest(10, 'prediction', 'prediction')

# def main():
#     last_update_time = load_last_update_time()
#     print(f"Last model update time: {last_update_time}")

#     recommendations = recommend_commercials(1)  # Example for userId 1
#     print(recommendations)

# if __name__ == "__main__":
#     main()
