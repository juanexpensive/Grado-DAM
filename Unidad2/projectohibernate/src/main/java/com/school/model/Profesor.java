package com.school.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Profesores")
public class Profesor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Mapeo explícito del ID para garantizar la integridad entre el modelo Java y
    // la tabla de MySQL.
    @Column(name = "idProfesor")
    private int idProfesor;

    @Column(name = "Nombre", length = 45)
    private String nombre;

    @Column(name = "Apellidos", length = 45)
    private String apellidos;

    @Temporal(TemporalType.DATE)
    @Column(name = "FechaNacimiento")
    private Date fechaNacimiento;

    @Column(name = "Antiguedad")
    private int antiguedad;

    @OneToMany(mappedBy = "profesor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Matricula> matriculas;

    public Profesor() {
    }

    public Profesor(String nombre, String apellidos, Date fechaNacimiento, int antiguedad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
        this.antiguedad = antiguedad;
    }

    // Getters and Setters
    public int getIdProfesor() {
        return idProfesor;
    }

    public void setIdProfesor(int idProfesor) {
        this.idProfesor = idProfesor;
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

    public int getAntiguedad() {
        return antiguedad;
    }

    public void setAntiguedad(int antiguedad) {
        this.antiguedad = antiguedad;
    }

    public List<Matricula> getMatriculas() {
        return matriculas;
    }

    public void setMatriculas(List<Matricula> matriculas) {
        this.matriculas = matriculas;
    }

    @Override
    public String toString() {
        return String.format("ID: %d | %s %s | Fecha Nac: %s | Antigüedad: %d",
                idProfesor, nombre, apellidos, fechaNacimiento, antiguedad);
    }
}
