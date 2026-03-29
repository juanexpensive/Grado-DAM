package com.example.tipoexamencompras

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController

@Composable
fun PantallaElegir(
    nav: NavHostController,
    vm: AppViewModel = viewModel()   // ← FALTABA ESTO
) {
    Column(Modifier.fillMaxSize().padding(16.dp)) {

        Text(text = "Créditos: ${vm.credits}")
        Spacer(Modifier.height(16.dp))

        LazyColumn(Modifier.weight(1f)) {
            items(vm.getProducts()) { product ->
                Column(
                    Modifier
                        .fillMaxWidth()
                        .clickable {
                            vm.selectProduct(product)
                        }
                        .padding(12.dp)
                ) {
                    Text(product.name)
                }
            }
        }

        vm.selectedProduct?.let { product ->
            Spacer(Modifier.height(16.dp))
            Card(Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp)) {
                    Text("Seleccionado: ${product.name}")
                    Spacer(Modifier.height(8.dp))

                    Button(onClick = {
                        vm.generarPrecioMercado()
                        nav.navigate(Routes.COMPRAR)
                    }) {
                        Text("Comprar")
                    }
                }
            }
        }
    }
}