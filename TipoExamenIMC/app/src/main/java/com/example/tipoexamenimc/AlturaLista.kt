package com.example.tipoexamenimc

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController

@Composable
fun AlturaLista(navController: NavController, viewModel: FlujoDatosViewModel) {
    val alturas = (150..220).toList()

    Column(
        modifier = Modifier
            .padding(24.dp)
            .fillMaxWidth()
    ) {
        Text(
            text = "Selecciona tu altura",
            style = MaterialTheme.typography.headlineSmall,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        LazyColumn {
            items(alturas) { altura ->
                androidx.compose.material3.Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 6.dp)
                        .clickable {
                            viewModel.setAltura(altura.toString())
                            navController.navigate("Division")
                        }
                ) {
                    Text(
                        text = "$altura cm",
                        modifier = Modifier
                            .padding(20.dp)
                            .fillMaxWidth(),
                        style = MaterialTheme.typography.bodyLarge
                    )
                }
            }
        }
    }
}
