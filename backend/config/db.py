from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import os


load_dotenv()

mongodb_uri=os.getenv("MONGODB_URI")
client: MongoClient = MongoClient(mongodb_uri,server_api=ServerApi(version='1', strict=True, deprecation_errors=True))

def connect_db():
    try:
        client._connect()
    except Exception as e:
        print("Error connecting to database: ", e)       

