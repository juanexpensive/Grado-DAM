package com.example.mi_app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SaludoController {

    @GetMapping("/hola/{nombre}")
    public String hola(@PathVariable String nombre) {
        return "¡Hola "+nombre +" desde spring!";
    }
}
