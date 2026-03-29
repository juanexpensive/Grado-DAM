package com.example.boletin1

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.boletin1.ui.theme.Boletin1Theme

class boletin1_3 : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            Boletin1Theme {
                Ejercicio3()
                }
            }
        }
    }


@Composable
fun Ejercicio3() {
    val frases = listOf(
        "Sigue adelante",
        "Nunca te rindas",
        "El código es poesía",
        "Aprende algo nuevo hoy"
    )
    var texto by remember { mutableStateOf("") }
    Column {
        Text(text = texto)
        Button(onClick = {
            texto = frases.random()
        }) {
            Text("Pulsame")
        }
    }
}

