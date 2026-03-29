package com.example.tipoexamendificilbien

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

@Composable
fun PantallaComprar(navController: NavController, viewModel: TiendaViewModel) {
    val productoSeleccionado by viewModel.productoSeleccionado.collectAsState()
    val precioMercado by viewModel.precioMercado.collectAsState()
    val creditos by viewModel.creditos.collectAsState()
    val mensajeError by viewModel.mensajeError.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 24.dp)
        ) {
            Column(
                modifier = Modifier.padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "Confirmar Compra",
                    style = MaterialTheme.typography.headlineMedium,
                    modifier = Modifier.padding(bottom = 16.dp)
                )

                HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))

                Text(
                    text = "Producto:",
                    style = MaterialTheme.typography.labelMedium
                )
                Text(
                    text = productoSeleccionado?.nombre ?: "",
                    style = MaterialTheme.typography.titleLarge,
                    modifier = Modifier.padding(bottom = 16.dp)
                )

                Text(
                    text = "Precio de mercado:",
                    style = MaterialTheme.typography.labelMedium
                )
                Text(
                    text = "$precioMercado créditos",
                    style = MaterialTheme.typography.headlineSmall,
                    color = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.padding(bottom = 16.dp)
                )

                Text(
                    text = "Créditos disponibles: $creditos",
                    style = MaterialTheme.typography.bodyLarge,
                    color = if (creditos >= precioMercado)
                        MaterialTheme.colorScheme.secondary
                    else
                        MaterialTheme.colorScheme.error
                )
            }
        }

        if (mensajeError.isNotEmpty()) {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.errorContainer
                )
            ) {
                Text(
                    text = mensajeError,
                    modifier = Modifier.padding(16.dp),
                    color = MaterialTheme.colorScheme.onErrorContainer,
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        }

        Button(
            onClick = {
                if (viewModel.comprarProducto()) {
                    navController.navigate("Vender") {
                        popUpTo("Elegir") { inclusive = false }
                    }
                }
            },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 8.dp)
        ) {
            Text("Confirmar")
        }

        OutlinedButton(
            onClick = {
                viewModel.limpiarError()
                navController.popBackStack()
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Cancelar")
        }
    }
}