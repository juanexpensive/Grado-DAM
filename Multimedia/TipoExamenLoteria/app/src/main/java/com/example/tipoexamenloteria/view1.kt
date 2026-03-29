package com.example.tipoexamenloteria

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.tipoexamenloteria.ui.theme.TipoExamenLoteriaTheme

class view1 : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            TipoExamenLoteriaTheme {
                listaNumeros()
            }
        }
    }
}
@Composable
fun listaNumeros() {
    // 1. Variable de estado para guardar el número seleccionado
    var numeroGuardado by remember { mutableStateOf(0) }

    // Lista de los números a mostrar
    val numeros = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9)

    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.padding(16.dp)
    ) {

        // Iteración para crear los botones
        numeros.forEach { num ->
            Button(
                onClick = {
                    numeroGuardado = num
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
            ) {
                Text(text = num.toString())
            }
        }
    }
}