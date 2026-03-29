package com.example.listacontactos.presentation.screens

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.Checkbox
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun contactoForm() {
    var nameState by remember { mutableStateOf("") }
    var phoneNumberState by remember { mutableStateOf("") }
    var genreState by remember { mutableStateOf("") }


    Card(modifier = Modifier.padding(vertical = 50.dp, horizontal = 50.dp).fillMaxWidth()) {

        TextField(
            value = nameState,
            onValueChange = { nameState = it },
            label = { Text("Nombre") }
            
        )
        TextField(
            value = phoneNumberState,
            onValueChange = { phoneNumberState = it },
            label = { Text("Numero de telefono") }
        )
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(16.dp)) {
            Text(text = "Masculino")
            Checkbox(checked = genreState == "M", onCheckedChange = { genreState = "M" })
            Text(text = "Femenino")
            Checkbox(checked = genreState == "F", onCheckedChange = { genreState = "F" })
        }
        Button(onClick = {  }) {
            Text(text = "Guardar")
        }

    }
}

