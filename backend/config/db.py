from dotenv import load_dotenv
import os

load_dotenv()

db_uri=os.getenv("MONGODB_URI")

