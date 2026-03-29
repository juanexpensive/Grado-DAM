from typing import Optional
from pydantic import BaseModel


class Director(BaseModel):
    id: Optional[str] = None
    dni: str
    name: str 
    surname: str 
    nationality: str