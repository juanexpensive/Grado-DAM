package com.example.tipoexamengastos

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController

@Composable
fun NombrePersona(navController: NavHostController, viewModel: FlujoDatosViewModel) {
    val numeropersonas by viewModel.personas.collectAsState()
    val cantidad = numeropersonas.toIntOrNull() ?: 0
    var nombres by remember { mutableStateOf(List(cantidad) { "" }) }

    LazyColumn(modifier = Modifier.padding(16.dp)) {
        items(cantidad) { index ->
            TextField(
                value = nombres[index],
                onValueChange = {
                    nombres = nombres.toMutableList().apply { this[index] = it }
                },
                label = { Text("Persona ${index + 1}") },
                modifier = Modifier.fillMaxWidth().padding(8.dp)
            )
        }

        item {
            Button(
                onClick = {
                    viewModel.setNombres(nombres.joinToString(","))
                    navController.navigate("Division")
                },
                modifier = Modifier.fillMaxWidth().padding(8.dp)
            ) {
                Text("Continuar")
            }
        }
    }
}