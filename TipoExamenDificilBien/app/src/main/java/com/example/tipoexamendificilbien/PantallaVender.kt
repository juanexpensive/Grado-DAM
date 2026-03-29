package com.example.tipoexamendificilbien

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

@Composable
fun PantallaVender(navController: NavController, viewModel: TiendaViewModel) {
    val creditos by viewModel.creditos.collectAsState()
    val inventario by viewModel.inventario.collectAsState()

    val preciosVenta = remember(inventario) {
        inventario.associateWith { viewModel.calcularPrecioVenta(it) }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Text(
                    text = "Mi Inventario",
                    style = MaterialTheme.typography.headlineSmall,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
                Text(
                    text = "Saldo actual: $creditos créditos",
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }

        if (inventario.isEmpty()) {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 16.dp)
            ) {
                Text(
                    text = "No tienes productos en tu inventario",
                    modifier = Modifier.padding(24.dp),
                    style = MaterialTheme.typography.bodyLarge
                )
            }
        } else {
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                inventario.forEach { productoInv ->
                    val precioVenta = preciosVenta[productoInv] ?: 0
                    Card(
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = productoInv.producto.nombre,
                                    style = MaterialTheme.typography.titleMedium
                                )
                                Text(
                                    text = "Precio de venta: $precioVenta créditos",
                                    style = MaterialTheme.typography.bodyMedium,
                                    color = MaterialTheme.colorScheme.secondary
                                )
                                Text(
                                    text = "Comprado por: ${productoInv.precioCompra} créditos",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.outline
                                )
                            }
                            Button(
                                onClick = {
                                    viewModel.venderProducto(productoInv, precioVenta)
                                    viewModel.limpiarSeleccion()
                                    navController.navigate("Elegir") {
                                        popUpTo("Elegir") { inclusive = true }
                                    }
                                }
                            ) {
                                Text("Vender")
                            }
                        }
                    }
                }
            }
        }

        OutlinedButton(
            onClick = {
                viewModel.limpiarSeleccion()
                navController.navigate("Elegir") {
                    popUpTo("Elegir") { inclusive = true }
                }
            },
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 16.dp)
        ) {
            Text("Volver")
        }
    }
}