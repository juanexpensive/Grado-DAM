package com.example.mi_app;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AlumnoDTO {

    private String nombre;

    @NotNull(message = "Email requerido")
    @NotBlank(message = "Email no vacío")
    @Email(message = "Formato inválido")
    private String email;

    public AlumnoDTO() {
    }

    public AlumnoDTO(String nombre, String email) {
        this.nombre = nombre;
        this.email = email;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
