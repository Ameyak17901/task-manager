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

def update_tasks(task_id, task):
    try:
        # check if exists
        existing_task = tasks_collection.find_one({ "_id": ObjectId(task_id)})

        if existing_task is None:
            return None

        data: dict[str, str] = {
            "entityName": task["entityName"],
            "date": task["date"],
            "taskType": task["taskType"],
            "time": task["time"],
            "contactPerson": task["contactPerson"],
            "notes": task["notes"],
            "status": task["status"],
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


def change_task_status(task_id):
    try:
        existing_task = tasks_collection.find_one({ "_id": ObjectId(task_id)})
        if existing_task is None:
            return None
        
        updated_status = "Open" if existing_task['status'] == "Closed" else "Closed"

        # update status
        updated_task = tasks_collection.find_one_and_update( {"_id": ObjectId(task_id)}, { "$set": { "status": updated_status}})
        print(updated_task)
        return "updated successfully"
    except Exception as e:
        print(f"Error changing task status: {e}")

def delete_task(task_id):
    try:
        task = tasks_collection.find_one({ "_id": ObjectId(task_id)})
        # check task exists
        if task is None:
            return None
        
        # delete task
        result = tasks_collection.delete_one({ "_id": ObjectId(task_id)})
        if result.deleted_count == 0:
            return None
        return "deleted successfully"
    except Exception as exe:
        print(f"Error deleting task: {exe}")