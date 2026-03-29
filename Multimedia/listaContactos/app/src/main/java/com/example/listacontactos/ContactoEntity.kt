package com.example.listacontactos

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "contacto_entity")
data class ContactoEntity(
    @PrimaryKey(autoGenerate = true)
    var id:Int = 0,
    var name: String = "",
    var phoneNumber: String = "",
    var genre: String = "",
)