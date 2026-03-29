package com.example.listacontactos

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update

@Dao
interface ContactoDao {
    @Query("SELECT * FROM contacto_entity")
    suspend fun getAllContactos(): List <ContactoEntity>

    @Insert
    suspend fun addContacto(contactoEntity: ContactoEntity): Long

    @Query ("SELECT * FROM contacto_entity where id like :id")
    suspend fun getContactoById(id:Long): ContactoEntity

    @Update
    suspend fun updateContacto(contacto: ContactoEntity): Int

    @Delete
    suspend fun deleteContacto(contacto: ContactoEntity): Int
}


