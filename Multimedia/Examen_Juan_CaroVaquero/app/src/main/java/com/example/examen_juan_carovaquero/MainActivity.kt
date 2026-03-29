package com.example.examen_juan_carovaquero

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.rememberNavController
import com.example.examen_juan_carovaquero.ui.theme.Examen_Juan_CaroVaqueroTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            Examen_Juan_CaroVaqueroTheme {
                val navController = rememberNavController()
                val viewModel: FlujoDatosViewModel = viewModel()
                NavHost(
                    navController = navController,
                    startDestination = "NumeroYPersona"
                ) {
                    composable("NumeroYPersona") {
                        NumeroYPersona(navController=navController, viewModel = viewModel)
                    }
                }
            }
        }
    }
}
