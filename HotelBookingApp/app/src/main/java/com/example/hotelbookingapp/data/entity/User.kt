package com.example.hotelbookingapp.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * Entidad que representa un usuario en la base de datos
 */
@Entity(tableName = "users")
data class User(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val email: String,
    val password: String, // En producción debería estar hasheado
    val createdAt: Long = System.currentTimeMillis()
)
