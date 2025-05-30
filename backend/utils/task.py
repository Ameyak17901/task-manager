from config.db import client
from bson import ObjectId

database = client['task-list']
tasks_collection = database["tasks"]

def create_tasks(task):
    try:
        data: dict[str, str] = {
            "entityName": task["entityName"],
            "date": task["date"],
            "taskType": task["taskType"],
            "time": task["time"],
            "contactPerson": task["contactPerson"],
            "notes": task["notes"],
            "status": task["status"],
        }

        task_id = tasks_collection.insert_one(data).inserted_id

        return str(task_id)


    except Exception as e:
        print(f"Error creating task: {e}")    

def update_tasks(task_id, new_task):
    try:
        # check if exists
        task = tasks_collection.find_one({ "_id": ObjectId(task_id)})

        if task is None:
            return None

        data: dict[str, str] = {
            "entityName": new_task["entityName"],
            "date": new_task["date"],
            "taskType": new_task["taskType"],
            "time": new_task["time"],
            "contactPerson": new_task["contactPerson"],
            "notes": new_task["notes"],
            "status": new_task["status"],
        }

        result = tasks_collection.update_one({ "_id": ObjectId(task_id)}, { "$set": data})

        return result
    except Exception as e:
        print(f"Error updating tasks: ", e)    

def get_tasks():
    try:
        tasks = tasks_collection.find({})
        tasks_list = tasks.to_list()
        return tasks_list
    except Exception as e:
        print(f'Error getting tasks: ', e)