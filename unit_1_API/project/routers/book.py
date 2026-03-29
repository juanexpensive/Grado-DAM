# unit_1_API/routers/book.py

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional, List

from .author import authors_list 

# Router con prefijo plural
router = APIRouter(prefix="/books", tags=["books"])

# --- MODELO Y DATOS ---
class Book(BaseModel):
    id: Optional[int] = None
    isbn: str
    title: str
    num_pages: int 
    # Clave foránea referenciando el ID del autor
    id_author: int 

books_list: List[Book] = [
    Book(id=1, isbn="978-84-339-2536-1", title="Cien años de soledad", num_pages=496, id_author=2),
    Book(id=2, isbn="978-07-432-7356-5", title="El Gran Gatsby", num_pages=208, id_author=4),
    Book(id=3, isbn="978-84-9838-868-4", title="Rayuela", num_pages=624, id_author=1),
    Book(id=4, isbn="978-84-376-0494-7", title="Don Quijote de la Mancha", num_pages=1344, id_author=5),
]

# --- FUNCIONES AUXILIARES ---

def next_id() -> int:
    """Calcula el siguiente ID disponible (necesario para el POST)."""
    return max(b.id for b in books_list if b.id is not None) + 1 if books_list and any(b.id is not None for b in books_list) else 1

def validate_author_exists(author_id: int) -> bool:
    """Verifica si el IdAutor existe en la lista de autores."""
    return any(author.id == author_id for author in authors_list)

# --- ENDPOINTS ---

# 1. READ ALL (GET)
@router.get("/")
def get_books():
    return books_list

# 2. READ ONE (GET by ID)
@router.get("/{id}")
def get_book(id: int):
    for book in books_list:
        if book.id == id:
            return book
    
    raise HTTPException(status_code=404, detail="Book not found")

# 3. CREATE (POST)
@router.post ("/", status_code=201, response_model=Book)
def add_book(book: Book):
    # Validar la clave foránea (IdAutor)
    if not validate_author_exists(book.id_author):
        raise HTTPException(
            status_code=400, 
            detail=f"Author ID {book.id_author} does not exist. Cannot create book."
        )

    book.id = next_id()
    books_list.append(book)
    return book

# 4. UPDATE (PUT)
@router.put("/{id}", response_model=Book)
def modify_book(id: int, book: Book):
    # Validar la clave foránea (IdAutor)
    if not validate_author_exists(book.id_author):
        raise HTTPException(
            status_code=400, 
            detail=f"Author ID {book.id_author} does not exist. Cannot update book."
        )

    for index, saved_book in enumerate(books_list):
        if saved_book.id == id:
            book.id = id
            books_list[index] = book
            return book
        
        raise HTTPException(status_code=404, detail="Book not found")
    
# 5. DELETE (DELETE)
@router.delete("/{id}")
def delete_book(id: int):
    for saved_book in books_list:
        if saved_book.id == id:
            books_list.remove(saved_book)
            return {}
            
        raise HTTPException(status_code=404, detail="Book not found")