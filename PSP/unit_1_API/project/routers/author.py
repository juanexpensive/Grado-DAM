# unit_1_API/routers/author.py

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional, List

# Router con prefijo plural
# Cambiado a /authors
router = APIRouter(prefix="/authors", tags=["authors"])

# --- MODELO Y DATOS ---
class Author(BaseModel):
    id: Optional[int] = None
    dni: str
    name: str 
    surname: str 

authors_list: List[Author] = [
    Author(id=1, dni="12345678A", name="Pedro", surname="Almodóvar"),
    Author(id=2, dni="P9876543Z", name="Chloé", surname="Zhao"),
    Author(id=3, dni="G4567890B", name="Greta", surname="Gerwig"),
    Author(id=4, dni="L1122334F", name="Lana", surname="Wachowski"),
    Author(id=5, dni="K6789012R", name="Kiyoshi", surname="Kurosawa"),
]

# --- FUNCIONES AUXILIARES (Necesarias para CRUD) ---

def next_id() -> int:
    return max(a.id for a in authors_list if a.id is not None) + 1 if authors_list and any(a.id is not None for a in authors_list) else 1

def search_author(id: int):
    authors = [author for author in authors_list if author.id == id]

    if len(authors) != 0:
        return authors[0]
    else:
        return {"error" : "No author found"}

# --- ENDPOINTS ---

# 1. READ ALL (GET)
@router.get("/")
def get_authors():
    return authors_list

# 2. READ ONE (GET by ID)
@router.get("/{id}")
def get_author (id:int):
    # Se elimina la duplicidad del path '/directors'
    authors = [author for author in authors_list if author.id == id]

    if len(authors) != 0:
        return authors[0]
    raise HTTPException(status_code=404,detail="Author not found")

# 3. CREATE (POST)
@router.post ("/",status_code=201,response_model=Author)
def add_author (author: Author):
    author.id = next_id()
    authors_list.append(author)
    return author

# 4. UPDATE (PUT)
@router.put("/{id}",response_model=Author)
def modify_author (id: int, author: Author):
    for index, saved_author in enumerate (authors_list):
        if saved_author.id == id:
            author.id = id
            authors_list[index] = author
            return author
        raise HTTPException(status_code=404, detail="Author not found")
    
# 5. DELETE (DELETE)
@router.delete("/{id}")
def delete_author (id:int):
    for saved_author in authors_list:
        if saved_author.id == id:
            authors_list.remove(saved_author)
            return {}
        raise HTTPException(status_code=404, detail="Author not found")