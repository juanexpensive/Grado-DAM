package com.school.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Matricula")
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Se añade @Column con el nombre físico para mayor claridad y robustez en la
    // generación del esquema.
    @Column(name = "idMatricula")
    private int idMatricula;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProfesorado")
    private Profesor profesor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idAlumnado")
    private Alumno alumno;

    @Column(name = "Asignatura", length = 45)
    private String asignatura;

    @Column(name = "Curso")
    private int curso;

    public Matricula() {
    }

    public Matricula(Profesor profesor, Alumno alumno, String asignatura, int curso) {
        this.profesor = profesor;
        this.alumno = alumno;
        this.asignatura = asignatura;
        this.curso = curso;
    }

    // Getters and Setters
    public int getIdMatricula() {
        return idMatricula;
    }

    public void setIdMatricula(int idMatricula) {
        this.idMatricula = idMatricula;
    }

    public Profesor getProfesor() {
        return profesor;
    }

    public void setProfesor(Profesor profesor) {
        this.profesor = profesor;
    }

    public Alumno getAlumno() {
        return alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    public String getAsignatura() {
        return asignatura;
    }

    public void setAsignatura(String asignatura) {
        this.asignatura = asignatura;
    }

    public int getCurso() {
        return curso;
    }

    public void setCurso(int curso) {
        this.curso = curso;
    }

    @Override
    public String toString() {
        return String.format("ID Matrícula: %d | Profesor: %s %s | Alumno: %s %s | Asignatura: %s | Curso: %d",
                idMatricula,
                profesor.getNombre(), profesor.getApellidos(),
                alumno.getNombre(), alumno.getApellidos(),
                asignatura, curso);
    }
}
