package com.example.boletin1

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import com.example.boletin1.ui.theme.Boletin1Theme

class boletin1_6 : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            Boletin1Theme {

            }
        }
    }
}

@Composable
fun ejercicio6() {
    Column {
        var numero by remember { mutableStateOf(0) }
        Text(text = numero.toString())
        if (numero == 10)
            Text(text = "Maximo alcanzado!")
        Button(onClick = {
            if (numero == 10)
                numero = 10
            else
                numero++
        }) {
            Text("+")
        }
        Button(onClick = {
            if (numero == 0)
                numero = 0
            else
                numero--
        }) {
            Text("-")
        }
        Button(onClick = {
            numero = 0
        }) {
            Text("Reset")
        }

    }
}
