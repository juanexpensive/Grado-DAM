package com.example.tipoexamencompras

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController

@Composable
fun PantallaComprar(
    nav: NavHostController,
    vm: AppViewModel = viewModel()
) {
    Column(Modifier.fillMaxSize().padding(16.dp)) {

        Text("Producto: ${vm.selectedProduct?.name}")
        Text("Precio de mercado: ${vm.marketPrice}")
        Spacer(Modifier.height(20.dp))

        if (vm.errorMessage.isNotEmpty()) {
            Text(vm.errorMessage, color = MaterialTheme.colorScheme.error)
            Spacer(Modifier.height(12.dp))
        }

        Row(
            Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            Button(onClick = {
                vm.confirmarCompra {
                    nav.navigate(Routes.VENDER)
                }
            }) {
                Text("Confirmar")
            }

            Button(onClick = { nav.popBackStack() }) {
                Text("Cancelar")
            }
        }
    }
}