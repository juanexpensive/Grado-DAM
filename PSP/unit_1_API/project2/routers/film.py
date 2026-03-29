
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from routers.directors import search_director_exists, directors_list

# Router con prefijo plural
router = APIRouter(prefix="/films", tags=["films"])

# --- MODELO Y DATOS ---
class Film(BaseModel):
    id: Optional[int] = None
    title: str
    duration: int
    idDirector: int 

films_list = [
    Film(id=10, title="El Padrino", duration=175, idDirector=5),
    Film(id=25, title="Cadena Perpetua", duration=142, idDirector=1),
    Film(id=40, title="Pulp Fiction", duration=154, idDirector=12),
    Film(id=55, title="Interestelar", duration=169, idDirector=2),
    Film(id=70, title="Parásitos", duration=132, idDirector=8),
    Film(id=99, title="Matrix", duration=136, idDirector=100)
]

def next_id() -> int:
    """Calcula el siguiente ID disponible para una nueva película."""
    return max(films_list, key=lambda film: film.id).id + 1 if films_list else 1
    
# 1. READ ALL (GET)
@router.get("/")
def get_films():
    return films_list

# 2. READ ONE (GET by ID)
@router.get("/{id}", response_model=Film)
def get_film(id: int):
    films = [film for film in films_list if film.id == id]
    if films:
        return films[0]
    raise HTTPException(status_code=404, detail="Film not found")

# 3. CREATE (POST)
@router.post("/", status_code=201, response_model=Film)
def add_film(film: Film):
    if not search_director_exists(film.idDirector, directors_list):
        raise HTTPException(
            status_code=400,
            detail=f"Director con ID {film.idDirector} no encontrado. No se puede añadir la película."
        )

    film.id = next_id()
    films_list.append(film)
    return film

# 4. UPDATE (PUT)
@router.put("/{id}", response_model=Film)
def modify_film(id: int, film: Film):
    if not search_director_exists(film.idDirector, directors_list):
        raise HTTPException(
            status_code=400,
            detail=f"Director con ID {film.idDirector} no encontrado. No se puede modificar la película."
        )

    for index, saved_film in enumerate(films_list):
        if saved_film.id == id:
            film.id = id
            films_list[index] = film
            return film
            
    raise HTTPException(status_code=404, detail="Film not found")
    
# 5. DELETE (DELETE)
@router.delete("/{id}", status_code=200)
def delete_film(id: int):
    for saved_film in films_list:
        if saved_film.id == id:
            films_list.remove(saved_film)
            return {}
    raise HTTPException(status_code=404, detail="Film not found")