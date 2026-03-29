from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
app = FastAPI()

class User(BaseModel):
    id : Optional [str] = None
    name : str
    surname : str
    age : int

users_list = [
    User(1,"juan","caro",22),
]

@app.get("/")
def root ():
    return {"Hello": "World"}

def get_user (id: int):
    return search_user(id)

@app.post ("/users", status_code=201, response_model = User)
def add_user(user: User):
    #calculamos el siguiente id y se lo 
    #machacamos al usuario recibido por paramentro
    user.id = next_id()

    #añadimos el usuario a la lista
    users_list.append(user)

    #devolvemos el usuario añadido
    return user

@app.put ("/users/{id}",response_model=User)
def modify_user (id : int, user : User):
    for index, saved_user in enumerate (users_list):
        if saved_user.id == id:
            user.id = id
            users_list[index] = user
            return user    
    raise HTTPException (status_code = 404, detail ="User not found")

@app.delete("/users/{id}")
def delete_user(id:int):
    for saved_user in users_list:
        if saved_user.id == id:
            users_list.remove(saved_user)
            return {}
    raise HTTPException (status_code = 404, detail = "User not found")

if not users:
    raise HTTPException(status_code)

def next_id():
    return (max(users_list, key=id ).id+1)
