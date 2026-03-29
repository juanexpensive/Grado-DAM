package com.example.tipoexamengastos

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController

class VNombrePersona {
}

@Composable
fun testNombrePersona(navController: NavHostController, viewModel: FlujoDatosViewModel) {

    val personas by viewModel.personas.collectAsState()
    val dinero by viewModel.dinero.collectAsState()

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "dinero : $dinero",
            fontSize = 32.sp,
            fontWeight = FontWeight.Bold
        )
        Text(
            text = "Nombre de la persona: $personas",
            fontSize = 24.sp,
            fontWeight = FontWeight.SemiBold
        )
    }
}