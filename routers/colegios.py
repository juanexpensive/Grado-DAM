from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from .auth_users import auth_user
from db.models.colegio import Colegio
from db.models.alumno import Alumno
from db.client import db_client
from db.schemas.colegio import colegio_schema, colegios_schema
from db.schemas.alumno import alumno_schema, alumnos_schema

from bson import ObjectId

router = APIRouter(prefix="/colegios", tags=["colegios"])



colegios_list = []

@router.get("/", response_model=list[Colegio])
async def colegios():
    return colegios_schema(db_client.test.colegios.find())

# Método get tipo query. Sólo busca por id
@router.get("/{id}", response_model=Colegio)
async def colegio(id: str):
    try:
        return search_colegio_id(id)
    except:
        raise HTTPException(status_code=404, detail="Colegio not found")

@router.get("{id_colegio}/alumnos")
async def colegio(id: str):
    try:
        colegio = search_colegio_id(id)
        if type(colegio) == Colegio:
            alumnos = db_client.test.alumnos.find({"id_colegio": id})
            return alumnos_schema(alumnos)
        else:
            raise HTTPException(status_code=404, detail="Colegio not found")
    except:
        raise HTTPException(status_code=404, detail="Colegio not found")




@router.post("/", response_model=Colegio, status_code=201)
async def add_colegio(colegio: Colegio):
    if type(search_colegio(colegio.nombre)) == Colegio:
        raise HTTPException(status_code=409, detail="Colegio already exists")
    

    #no se por que no funciona
                     #if type(search_colegio(colegio.tipo)) != "publico" or "concertado" or "privado":
                     #   raise HTTPException(status_code=400, detail="Colegio debe ser publico, privado o concertado")

    colegio_dict = colegio.model_dump()
    del colegio_dict["id"]

        
    id= db_client.test.colegios.insert_one(colegio_dict).inserted_id


    colegio_dict["id"] = str(id)


    return Colegio(**colegio_dict)

    
@router.put("/{id}", response_model=Colegio)
async def modify_colegio(id: str, new_colegio: Colegio):
    # Convertimos el usuario a un diccionario
    colegio_dict = new_colegio.model_dump()
    # Eliminamos el id en caso de que venga porque no puede cambiar
    del colegio_dict["id"]   
    try:

        db_client.test.colegios.find_one_and_replace({"_id":ObjectId(id)}, colegio_dict)
        return search_colegio_id(id)    
    except:
        raise HTTPException(status_code=404, detail="Colegio not found")
    

@router.delete("/{id}", response_model=Colegio)
async def delete_colegio(id:str):
    found = db_client.test.colegios.find_one_and_delete({"_id":ObjectId(id)})

    if not found:
        raise HTTPException(status_code=404, detail="Colegio not found")
    return Colegio(**colegio_schema(found))
   
# El id de la base de datos es un string, ya no es un entero
def search_colegio_id(id: str):    

    try:

        colegio = colegio_schema(db_client.test.colegios.find_one({"_id":(id)})) 

        return Colegio(**colegio)
    except:
        return {"error": "Colegio not found"}



def search_colegio(nombre: str):

    try:

        colegio = colegio_schema(db_client.test.colegios.find_one({"nombre":nombre}))
        return Colegio(**colegio)
    except:
        return {"error": "Colegio not found"}


def next_id():

    return (max(colegio.id for colegio in colegios_list))+1


def estadisticas_distritos():
    pipeline = [
        {
            "$lookup": {
                "from": "alumnos",
                "localField": "_id",
                "foreignField": "id_colegio",
                "as": "alumnos_info"
            }
        },
        {
            "$group": {
                "_id": "$distrito",
                "colegios": {"$sum": 1},
                "alumnos": {"$sum": {"$size": "$alumnos_info"}}
            }
        },
        {
            "$project": {
                "_id": 0,
                "distrito": "$_id",
                "colegios": 1,
                "alumnos": 1
            }
        }
    ]

    resultados = list(db_client.test.colegios.aggregate(pipeline))
    return resultados
