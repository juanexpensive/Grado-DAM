package com.example.hostal.database

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

@Dao
interface UsuarioDao {
    @Insert
    suspend fun insertarUsuario(usuario: Usuario)

    @Query("""
        SELECT * FROM usuarios
        WHERE nombre = :nombre AND password = :password
        LIMIT 1    
    """)
    suspend fun login(nombre: String, password: String): Usuario?

    @Query("""
        SELECT * FROM usuarios 
        WHERE nombre = :nombre
        LIMIT 1
    """)
    suspend fun existeUsuario(nombre: String): Usuario?
}