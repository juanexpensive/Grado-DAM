# unit_1_API/main.py

from fastapi import FastAPI
from .routers import users, book, author, auth_users, users_db
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

# Inicializamos la aplicación
app = FastAPI()

# Incluimos los routers
app.include_router(users.router)
app.include_router(book.router)
app.include_router(auth_users.router)
app.include_router(users_db.router)
app.include_router(author.router)


app.mount("/static", StaticFiles(directory="static"),name="static")

# Ruta raíz de bienvenida
@app.get("/")
def read_root():
    return {"hello": "world"}