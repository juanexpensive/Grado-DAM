package com.example.tipoexamengastos

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.text.input.KeyboardType
import androidx.navigation.NavHostController

class VNumeroYPersona {

}

@Composable
fun NumeroYPersona(navController: NavHostController, viewModel: FlujoDatosViewModel) {
    Column {
        Text("Numero de personas")
        var textPersona by remember { mutableStateOf("") }

        OutlinedTextField(
            value = textPersona,
            onValueChange = { textPersona = it },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            label = { Text("Personas") }
        )

        Text("Total a pagar")
        var textDinero by remember { mutableStateOf("") }

        OutlinedTextField(
            value = textDinero,
            onValueChange = { textDinero = it },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            label = { Text("Dinero") }
        )
        Button(onClick = {
            viewModel.setDinero(textDinero)
            viewModel.setPersonas(textPersona)
            navController.navigate("NombrePersona")
        }
        ){
            Text("Continuar")
        }
    }
}