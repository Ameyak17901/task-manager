from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["*"])

@app.route("/")
def base():
    return "Hello World"


@app.post("/tasks")
def create_task():
    try:
        task = request.get_json()
        
        return {"success": True, "data": []}
    except Exception as e:
        print("error",e)
        return {"success": False, 'error': str(e)}