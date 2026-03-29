def alumno_schema(alumno) -> dict:
    # El id en base de datos es _id
    return {"id": str(alumno["_id"]),
            "nombre": alumno["nombre"],
            "fecha_nacimiento": alumno["fecha_nacimiento"],
            "curso": alumno["curso"],
            "repetidor": alumno["repetidor"],
            "id_colegio": alumno["id_colegio"]}


def alumnos_schema(alumnos) -> list:
    return [alumno_schema(alumno) for alumno in alumnos]