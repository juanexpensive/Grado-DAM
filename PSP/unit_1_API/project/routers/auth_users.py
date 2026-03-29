from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, APIRouter

import jwt

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash



router= APIRouter(prefix="/usersdb",tags=["usersdb"])
oauth2 = OAuth2PasswordBearer(tokenUrl="login")

#Definimos el algoritmo de encriptacion
ALGOTIHM = "HS256"

#Duracion del token
ACCESS_TOKEN_EXPIRE_MINUTES = 1

#Clave que se utilizara como semilla para generar el token
#openssl rand -hex 32 

SECRET_KEY = "f21d90bab26a85de30ff95b2ad9c946b36530dec062cfad0aee4cd852b15ed5e"

#Objeto que se utilizara para el calculo del hash y
#la verificacion de las contraseñas

password_hash = PasswordHash.recommended()

class User(BaseModel):
    username : str
    fullname : str
    email : str
    disable : bool


class UserDB (User):
    password: str


users_db = {
    "juanclassy" : {
        "username" : "juanclassy",
        "fullname" : "Juan Caro",
        "email" : "carovaquerojuan@gmail.com",
        "disable" : False,
        "password" : "mayapayo",
     },
    "mayica" : {
        "username" : "mayica",
        "fullname" : "Maya Mayez",
        "email" : "maphergame@game.es",
        "disable" : False,
        "password" : "juanpayo",
    }
}

@router.post("/register",status_code=201 )
def register(user: UserDB):
    if user.username not in users_db:
        hashed_password = password_hash.hash(user.password)
        user.password = hashed_password
        users_db[user.username] = user
    else:
        raise HTTPException (status_code = 409, detail = "User already exists")
    