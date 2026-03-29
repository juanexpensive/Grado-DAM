package com.example.tipoexamenimc

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController

@Composable
fun NombrePesoSexo(navController: NavController, viewModel: FlujoDatosViewModel) {
    var peso by remember { mutableStateOf("") }
    var nombre by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .padding(24.dp)
            .fillMaxWidth(),
    ) {
        Text(
            text = "Calculadora IMC",
            modifier = Modifier.padding(bottom = 16.dp),
            style = MaterialTheme.typography.headlineMedium
        )

        OutlinedTextField(
            value = nombre,
            onValueChange = { nombre = it },
            label = { Text("Nombre") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp)
        )

        OutlinedTextField(
            value = peso,
            onValueChange = { peso = it },
            label = { Text("Peso en kg") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 32.dp)
        )

        Text(text = "Selecciona tu sexo:", modifier = Modifier.padding(bottom = 12.dp))

        Button(
            onClick = {
                viewModel.setNombre(nombre)
                viewModel.setPeso(peso)
                viewModel.setSexo("Hombre")
                navController.navigate("AlturaLista")
            },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp)
        ) {
            Text("Hombre")
        }

        Button(
            onClick = {
                viewModel.setNombre(nombre)
                viewModel.setPeso(peso)
                viewModel.setSexo("Mujer")
                navController.navigate("AlturaLista")
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Mujer")
        }
    }
}
