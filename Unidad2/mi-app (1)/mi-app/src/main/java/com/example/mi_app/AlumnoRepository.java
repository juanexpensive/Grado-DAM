package com.example.mi_app;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
    // Métodos CRUD heredados
    // Query methods personalizados
    List<Alumno> findByNombre(String nombre);
}
