package com.example.mi_app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/alumnos")
public class AlumnoController {

    @Autowired
    private AlumnoRepository repo;

    @GetMapping
    public List<Alumno> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alumno> buscarPorId(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Alumno crear(@Valid @RequestBody AlumnoDTO alumnoDTO) {
        Alumno alumno = new Alumno(alumnoDTO.getNombre(), alumnoDTO.getEmail());
        return repo.save(alumno);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alumno> actualizar(@PathVariable Long id, @Valid @RequestBody AlumnoDTO alumnoDTO) {
        return repo.findById(id)
                .map(alumno -> {
                    alumno.setNombre(alumnoDTO.getNombre());
                    alumno.setEmail(alumnoDTO.getEmail());
                    return ResponseEntity.ok(repo.save(alumno));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
