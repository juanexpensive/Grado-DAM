package com.school.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Alumnado")
public class Alumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Se añade @Column(name = "idAlumnado") para asegurar que Hibernate utilice
    // exactamente este nombre
    // físico en la tabla SQL, evitando errores de 'Unknown column' en algunas
    // configuraciones.
    @Column(name = "idAlumnado")
    private int idAlumnado;

    @Column(name = "Nombre", length = 45)
    private String nombre;

    @Column(name = "Apellidos", length = 45)
    private String apellidos;

    @Temporal(TemporalType.DATE)
    @Column(name = "FechaNacimiento")
    private Date fechaNacimiento;

    @OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Matricula> matriculas;

    public Alumno() {
    }

    public Alumno(String nombre, String apellidos, Date fechaNacimiento) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
    }

    // Getters and Setters
    public int getIdAlumnado() {
        return idAlumnado;
    }

    public void setIdAlumnado(int idAlumnado) {
        this.idAlumnado = idAlumnado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public List<Matricula> getMatriculas() {
        return matriculas;
    }

    public void setMatriculas(List<Matricula> matriculas) {
        this.matriculas = matriculas;
    }

    @Override
    public String toString() {
        return String.format("ID: %d | %s %s | Fecha Nac: %s",
                idAlumnado, nombre, apellidos, fechaNacimiento);
    }
}
