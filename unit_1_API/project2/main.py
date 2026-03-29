from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

# --- CORRECCIÓN CRÍTICA DE IMPORTACIÓN ---
# Usamos "." para indicar que 'routers' está dentro del paquete actual (unit_1_API).
from routers import auth_user,directors,directors_db,film
# ----------------------------------------

# Inicializamos la aplicación
app = FastAPI()

# Incluimos los routers
app.include_router(directors.router)
app.include_router(film.router)
app.include_router(auth_user.router)
app.include_router(directors_db.router)

# Montamos los archivos estáticos
#app.mount("/static", StaticFiles(directory="static"), name="static")

# Ruta raíz de bienvenida
@app.get("/")
def read_root():
    return {"hello": "world"}