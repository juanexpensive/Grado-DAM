package com.example.tipoexamenimc

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

@Composable
fun Division(navController: NavController, viewModel: FlujoDatosViewModel) {
    val peso by viewModel.peso.collectAsState()
    val altura by viewModel.altura.collectAsState()
    val sexo by viewModel.sexo.collectAsState()
    val nombre by viewModel.nombre.collectAsState()

    val pesoNum = peso.toFloatOrNull() ?: 0f
    val alturaM = (altura.toFloatOrNull() ?: 0f) / 100f
    val coef = if (sexo == "Hombre") 1f else 0.95f
    val imc = if (alturaM > 0) pesoNum / (alturaM * alturaM) * coef else 0f

    val categoria = when {
        imc < 18.5 -> "Bajo peso"
        imc < 24.9 -> "Peso normal"
        imc < 29.9 -> "Sobrepeso"
        else -> "Obesidad"
    }

    Column(
        modifier = Modifier
            .padding(24.dp)
            .fillMaxWidth()
    ) {

        Text(
            text = "Resultado IMC",
            style = MaterialTheme.typography.headlineMedium,
            modifier = Modifier.padding(bottom = 24.dp)
        )

        androidx.compose.material3.Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 24.dp)
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text("Nombre: $nombre")
                Text("Peso: $peso kg")
                Text("Altura: $altura cm")
                Text("Sexo: $sexo")
                Text("IMC: ${"%.2f".format(imc)}", modifier = Modifier.padding(top = 12.dp))
                Text("Resultado: $categoria", style = MaterialTheme.typography.titleMedium)
            }
        }
    }
}
