from flask import Flask, request
from flask_cors import CORS
from utils.task import create_tasks, get_tasks
from config.db import connect_db

app = Flask(__name__)
CORS(app, origins=["*"])

connect_db()

@app.route("/")
def base():
    return "Hello World"


@app.post("/tasks")
def create_task_handler():
    try:
        task = request.get_json()
        print(task)
        task_id = create_tasks(task)
        return {"success": True, "message": "Task Created Successfully...", "task_id": task_id}
    except Exception as e:
        print("error",e)
        return {"success": False, 'error': str(e)}
    
@app.get('/tasks')
def get_tasks_handler():
    try:
        tasks = get_tasks()
        for task in tasks:
            task['_id'] = str(task['_id'])
        return {"success": True, "tasks": tasks}
    except Exception as e:
        print(e)
        return { 'success': False, 'error': str(e)}