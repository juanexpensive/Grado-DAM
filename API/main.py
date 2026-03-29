from fastapi import FastAPI
from routers import  auth_users , users
from routers import alumnos
from routers import colegios
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Routers
app.include_router(auth_users.router)
app.include_router(users.router)
app.include_router(alumnos.router)
app.include_router(colegios.router)
#app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def root():
    return {"Hello": "World"}


