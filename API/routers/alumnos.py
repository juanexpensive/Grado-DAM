from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from .auth_users import auth_user
from db.models.alumno import Alumno
from db.client import db_client
from db.schemas.alumno import alumno_schema, alumnos_schema

from bson import ObjectId

router = APIRouter(prefix="/alumnos", tags=["alumnos"])



# la siguiente lista pretende simular una base de datos para probar nuestra API
alumnos_list = []

@router.get("/", response_model=list[Alumno])
async def alumnos():
    return alumnos_schema(db_client.test.alumnos.find())


# Método get tipo query. Sólo busca por id
@router.get("", response_model=Alumno)
async def alumno(id: str):
    return search_alumno_id(id)


# Método get por id
@router.get("/{id}", response_model=Alumno)
async def alumno(id: str):
    return search_alumno_id(id)



@router.post("/", response_model=Alumno, status_code=201)
async def add_alumno(alumno: Alumno):
    #print("dentro de post")
    if type(search_alumno(alumno.nombre, alumno.apellidos)) == Alumno:
        raise HTTPException(status_code=409, detail="Alumno already exists")
    
    alumno_dict = alumno.model_dump()
    del alumno_dict["id"]

    id= db_client.test.alumno.insert_one(alumno_dict).inserted_id


    alumno_dict["id"] = str(id)


    return Alumno(**alumno_dict)
    
@router.put("/{id}", response_model=Alumno)
async def modify_alumno(id: str, new_alumno: Alumno):
    # Convertimos el usuario a un diccionario
    alumno_dict = new_alumno.model_dump()
    # Eliminamos el id en caso de que venga porque no puede cambiar
    del alumno_dict["id"]   
    try:

        db_client.test.alumnos.find_one_and_replace({"_id":ObjectId(id)}, alumno_dict)

        return search_alumno_id(id)    
    except:
        raise HTTPException(status_code=404, detail="Alumno not found")
    

@router.delete("/{id}", response_model=Alumno)
async def delete_alumno(id:str):
    found = db_client.test.alumnos.find_one_and_delete({"_id":ObjectId(id)})

    if not found:
        raise HTTPException(status_code=404, detail="Alumno not found")
    return Alumno(**alumno_schema(found))
   


# El id de la base de datos es un string, ya no es un entero
def search_alumno_id(id: str):    

    try:
   
        alumno = alumno_schema(db_client.test.alumnos.find_one({"_id":ObjectId(id)}))
        # Necesitamos convertirlo a un objeto User. 
        return Alumno(**alumno)
    except:
        return {"error": "User not found"}



def search_alumno(nombre: str, apellidos: str):

    try:

        alumno = alumno_schema(db_client.test.alumnos.find_one({"nombre":nombre, "apellidos":apellidos}))
        return Alumno(**alumno)
    except:
        return {"error": "Alumno not found"}


def next_id():
    # Calculamos el usuario con el id más alto 
    # y le sumamos 1 a su id
    return (max(alumno.id for alumno in alumnos_list))+1