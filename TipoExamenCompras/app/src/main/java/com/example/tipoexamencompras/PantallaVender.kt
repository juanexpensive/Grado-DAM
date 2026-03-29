package com.example.tipoexamencompras

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController

@Composable
fun PantallaVender(
    nav: NavHostController,
    vm: AppViewModel = viewModel()
) {

    Column(Modifier.fillMaxSize().padding(16.dp)) {

        Text("Inventario:")
        Spacer(Modifier.height(16.dp))

        Column(Modifier.weight(1f)) {
            vm.inventory.forEach { item ->
                Row(
                    Modifier
                        .fillMaxWidth()
                        .padding(8.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(item.name)
                    Text("Venta: ${item.sellPrice}")

                    Button(onClick = {
                        vm.venderProducto(item) {
                            nav.navigate(Routes.ELEGIR) {
                                popUpTo(Routes.ELEGIR) { inclusive = false }
                            }
                        }
                    }) {
                        Text("Vender")
                    }
                }
            }
        }

        Button(onClick = {
            nav.navigate(Routes.ELEGIR) {
                popUpTo(Routes.ELEGIR) { inclusive = false }
            }
        }) {
            Text("Volver")
        }
    }
}