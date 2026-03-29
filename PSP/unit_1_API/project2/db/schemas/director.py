def director_schema(director) -> dict:
    # El id en base de datos es _id
    return {"id": str(director["_id"]),
            "dni": director["dni"],
            "name": director["name"],
            "surname": director["surname"],
            "nationality": director["nationality"]}

def directors_schema(directors) -> list:
    return [director_schema(director) for  director in directors]