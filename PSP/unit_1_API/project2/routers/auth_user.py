from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, FastAPI, Depends, HTTPException
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

# Librería JWT
import jwt

# Para trabajar las excepciones de los tokens
from jwt.exceptions import InvalidTokenError, PyJWTError

# Librería para aplicar un hash a la contraseña
from pwdlib import PasswordHash

# Definimos el algoritmo de encriptación
ALGORITHM = "HS256"

# Duración del token
ACCESS_TOKEN_EXPIRE_MINUTES = 1

# Clave que se utilizará como semilla para generar el token
# openssl rand -hex 32
SECRET_KEY = "87ab51098990feb4a2f78da9c911187a71290ebd9e98e56d8b24090815f2ce6f"

# Objeto que se utilizará para el cálculo del hash y 
# la verificación de las contraseñas
password_hash = PasswordHash.recommended()

router = APIRouter()
oauth2 = OAuth2PasswordBearer(tokenUrl="login")

# Clase Director (el objeto que se autentica)
class Director(BaseModel):
    username: str
    fullname:str
    email:str
    disabled: bool | None = False

# Clase DirectorDB (para almacenar la contraseña hasheada)
class DirectorDB(Director):
    hashed_password: str


# Base de datos simulada de Directores
fake_directors_db = {
    "johndoe": {
        "username": "johndoe",
        "fullname": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$argon2id$v=19$m=65536,t=3,p=4$wagCPXjifgvUFBzq4hqe3w$CYaIb8sB+wtD+Vu/P4uod1+Qof8h+1g7bbDlBID48Rc",
        "disabled": False
    }
}

# Función para buscar Director en la DB simulada
def search_director_db(username: str) -> DirectorDB | None:
    if username in fake_directors_db:
        return DirectorDB(**fake_directors_db[username])
    return None

# Función de dependencia de autenticación (nombre solicitado: auth_user)
async def auth_user(token:str = Depends(oauth2)) -> Director: 
    # Nos creamos un objeto para almacenar la excepción que vamos a lanzar en varias ocasiones
    exception = HTTPException(status_code=401, 
                                 detail="Credenciales de autenticación inválidas", 
                                 headers={"WWW-Authenticate" : "Bearer"})
    
    try:        
        # Desencriptamos el token para obtener el username
        username = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM).get("sub")
        if username is None:
            raise exception      
    except PyJWTError:
        # Si falla la decodificación o no encuentra la clave "sub"
        raise exception
        
    # Buscamos en la base de datos de Directores
    director_data = fake_directors_db.get(username)
    if director_data is None:
        raise HTTPException(status_code=401, 
                                 detail="Director no encontrado o inválido", 
                                 headers={"WWW-Authenticate" : "Bearer"})

    director = Director(**director_data)

    if director.disabled:
        # Si el director está deshabilitado lanzamos excepción
        raise HTTPException(status_code=400, 
                                 detail="Director inactivo")   

    # Retornamos un director correcto y habilitado
    return director


@router.post("/register", status_code=201)
async def register_director(director: DirectorDB): # Registra un Director
    print("entro en el registro")
    # Hasheamos la contraseña
    new_password = password_hash.hash(director.hashed_password)
    director.hashed_password = new_password
    # Usamos fake_directors_db
    fake_directors_db[director.username] = director.model_dump()
    return director


@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):    

    # Miramos si el director existe en la Base de Datos
    director_data = fake_directors_db.get(form.username) 
    if not director_data:
        raise HTTPException(status_code = 400, detail="Director no encontrado") # Mensaje modificado
    
    director = DirectorDB(**director_data)

    # Comprobamos la contraseña
    if not password_hash.verify(form.password, director.hashed_password):
        raise HTTPException(status_code=400, detail="La contraseña no es correcta")   

    # Generamos el token de acceso
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = {"sub" : director.username, "exp":expire}
    token = jwt.encode(access_token, SECRET_KEY, algorithm=ALGORITHM)
    
    return {"access_token" : token, "token_type": "bearer"}

@router.get("/auth/me", response_model=Director) 
async def me(director: Director = Depends(auth_user)): # Usa la dependencia auth_user y devuelve un Director
    return director