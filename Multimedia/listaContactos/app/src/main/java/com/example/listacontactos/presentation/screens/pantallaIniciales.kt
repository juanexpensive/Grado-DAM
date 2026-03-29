package com.example.listacontactos.presentation.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.listacontactos.R
import com.example.listacontactos.domain.entities.Contacto
import com.example.listacontactos.domain.repositories.Repositorio
import com.example.listacontactos.domain.repositories.Repositorio.getInitials

@Composable
fun InitialsRow(contacto: Contacto) {
    var visible by remember { mutableStateOf(false) }
    val iconGenre = if (contacto.genre == "M") {
        painterResource(id = R.drawable.male_icon)
    } else {
        painterResource(id = R.drawable.female_icon)
    }
    Card(modifier = Modifier.fillMaxWidth()) {
        if (visible==false) {
        Row {
            Image(
                painter = iconGenre,
                contentDescription = "Foto contacto",
                Modifier.height(100.dp)
                    .clickable { visible = !visible }
            )

            Spacer(modifier = Modifier.padding(4.dp))
            Column {
                Text(
                    text = contacto.name.getInitials(),
                    fontSize = 48.sp,
                    modifier = Modifier.padding(vertical = 25.dp, horizontal = 8.dp)

                )
            }
        }
        }
        else {
            Row {
                Image(
                    painter = iconGenre,
                    contentDescription = "Foto contacto",
                    Modifier.height(100.dp)
                        .clickable { visible = !visible }
                )
                Spacer(modifier = Modifier.padding(4.dp))
                Column {
                    Text(
                        text = contacto.name,
                        fontSize = 24.sp,
                        modifier = Modifier.padding(8.dp)
                    )
                    Text(
                        text = contacto.phoneNumber,
                        fontSize = 24.sp,
                        modifier = Modifier.padding(8.dp)
                    )
                }
            }
        }
    }
}


@Composable
fun ContactInitialsScreen() {
    val lista = Repositorio.getAllContacts()

    Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
        LazyColumn(modifier = Modifier.padding(innerPadding)) {
            items(lista) { itemContacto ->
                InitialsRow(contacto = itemContacto)
            }
        }
    }
}


