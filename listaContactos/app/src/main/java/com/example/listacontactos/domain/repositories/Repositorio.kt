package com.example.listacontactos.domain.repositories

import com.example.listacontactos.domain.entities.Contacto

object Repositorio {
    val lista = listOf(
        Contacto(1, "Juan García", "611123456", genre = "M"),
        Contacto(2, "María López", "678456123", genre = "F"),
        Contacto(3, "Raúl Cimas", "644789456", genre = "M"),
        Contacto(4, "Ana Morantes", "693882147", genre = "F"),
        Contacto(id = 5, name = "Jose Maya", phoneNumber = "611123456", genre = "M"),
        Contacto(id = 6, name = "Juan Caro", phoneNumber = "308947503", "M"),
        Contacto(id = 7, name = "Antonio Lopez", phoneNumber = "908458345", genre = "M"),
        Contacto(id = 8, name = "Raul Macias", phoneNumber = "345039487", genre = "M"),
        Contacto(id = 9, name = "Pepe Viyuela", phoneNumber = "123456789", genre = "M"),
        Contacto(id = 10, name = "Elizabeth Olsen", phoneNumber = "987654321", genre = "F")

    )

    fun getAllContacts(): List<Contacto> {
        return lista
    }
    fun String.getInitials(): String {
        return this
            .split(' ')
            .filter { it.isNotBlank() }
            .joinToString(separator = "") {
                it.firstOrNull()?.uppercase() ?: ""
            }
    }
}





