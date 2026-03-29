from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
# Mantenemos auth_users si se refiere a autenticación de usuarios en general
from .auth_user import auth_users 
# Renombramos la importación del modelo de la DB
from db.models.director import Director
from db.client import db_client
# Renombramos los esquemas
from db.schemas.director import  director_schema, directors_schema 

from bson import ObjectId

# Cambiamos el prefijo del router y el tag
router = APIRouter(prefix="/directorsdb", tags=["directorsdb"]) 


# la siguiente lista pretende simular una base de datos para probar nuestra API
directors_list = [] # Cambiamos el nombre de la lista

@router.get("/", response_model=list[Director])
async def directors(): # Cambiamos el nombre de la función
    # El método find() sin parámetros devuelve todos los registros
    # de la base de datos
    # Usamos directors_schema y la colección 'directors'
    return directors_schema(db_client.test.directors.find()) 

# Método get tipo query. Sólo busca por id
@router.get("", response_model=Director)
async def director_query(id: str): # Cambiamos el nombre de la función
    return search_director_id(id) # Usamos la función de búsqueda de director


# Método get por id
@router.get("/{id}", response_model=Director)
async def director(id: str): # Cambiamos el nombre de la función
    return search_director_id(id) # Usamos la función de búsqueda de director


@router.post("/", response_model=Director, status_code=201)
async def add_director(director: Director): # Cambiamos el nombre de la función y el parámetro
    #print("dentro de post")
    # Buscamos si el Director ya existe
    if type(search_director(director.name, director.surname)) == Director:
        raise HTTPException(status_code=409, detail="Director already exists") # Mensaje de error modificado
    
    director_dict = director.model_dump() # Cambiamos el nombre del diccionario
    del director_dict["id"]
    # Añadimos el director a nuestra base de datos
    # Usamos la colección 'directors'
    id= db_client.test.directors.insert_one(director_dict).inserted_id

    # Añadimos el campo id a nuestro diccionario.
    director_dict["id"] = str(id)

    # Creamos un objeto de tipo Director a partir del diccionario director_dict
    return Director(**director_dict)
    
@router.put("/{id}", response_model=Director)
async def modify_director(id: str, new_director: Director): # Cambiamos el nombre de la función y el parámetro
    # Convertimos el director a un diccionario
    director_dict = new_director.model_dump() # Cambiamos el nombre del diccionario
    # Eliminamos el id en caso de que venga porque no puede cambiar
    del director_dict["id"]  
    try:
        # Buscamos el id en la base de datos y le pasamos los datos a modificar
        # Usamos la colección 'directors'
        db_client.test.directors.find_one_and_replace({"_id":ObjectId(id)}, director_dict)
        # Buscamos el objeto modificado y lo retornamos
        return search_director_id(id)    # Usamos la función de búsqueda de director
    except:
        raise HTTPException(status_code=404, detail="Director not found") # Mensaje de error modificado
    

@router.delete("/{id}", response_model=Director)
async def delete_director(id:str): # Cambiamos el nombre de la función
    # Usamos la colección 'directors'
    found = db_client.test.directors.find_one_and_delete({"_id":ObjectId(id)})

    if not found:
        raise HTTPException(status_code=404, detail="Director not found") # Mensaje de error modificado
    # Usamos director_schema y creamos un objeto Director
    return Director(**director_schema(found)) 
    
# El id de la base de datos es un string, ya no es un entero
def search_director_id(id: str): # Cambiamos el nombre de la función
    # Controlamos excepciones
    try:
        # Usamos director_schema y la colección 'directors'
        director = director_schema(db_client.test.directors.find_one({"_id":ObjectId(id)}))
        # Necesitamos convertirlo a un objeto Director. 
        return Director(**director)
    except:
        return {"error": "Director not found"} # Mensaje de error modificado


def search_director(name: str, surname: str): # Cambiamos el nombre de la función
    # Necesitamos convertirlo a un objeto Director. 
    try:
        # Controlamos excepciones
        # Usamos director_schema y la colección 'directors'
        director = director_schema(db_client.test.directors.find_one({"name":name, "surname":surname}))
        return Director(**director)
    except:
        return {"error": "Director not found"} # Mensaje de error modificado


def next_id(): # Se mantiene, asumo que es para la lista simulada
    # Usamos directors_list
    return (max(director.id for director in directors_list))+1