package com.example.boletin1

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import com.example.boletin1.ui.theme.Boletin1Theme

class boletin1_5 : ComponentActivity() {
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
fun CartaPresentacion() {
    var visible by remember { mutableStateOf(false) }
    Card {
        painterResource(id = R.drawable.oreocat)
        AnimatedVisibility(
            visible = visible,
        ) {
            Text("Nomber: Oreo")
            Text("Ocupacion: Ser bonito")
        }

        Button(onClick = {
            visible = !visible
        }) {
            if (visible) {
                Text("Ver menos")
            } else {
                Text("Ver mas")
            }
        }
    }
}
