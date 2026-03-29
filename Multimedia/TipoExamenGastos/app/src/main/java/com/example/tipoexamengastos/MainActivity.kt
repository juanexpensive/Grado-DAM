package com.example.tipoexamengastos

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.tipoexamengastos.ui.theme.TipoExamenGastosTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            TipoExamenGastosTheme {
                val navController = rememberNavController()
                val viewModel: FlujoDatosViewModel = viewModel()
                NavHost(
                    navController = navController,
                    startDestination = "NumeroYPersona"
                ) {
                    composable("NumeroYPersona") {
                        NumeroYPersona(navController=navController, viewModel = viewModel)
                    }
                    composable(route = "testNombrePersona") {
                        testNombrePersona(navController=navController, viewModel = viewModel)
                    }
                    composable (route = "NombrePersona") {
                        NombrePersona(navController = navController, viewModel = viewModel)
                    }
                }

                }
            }
        }
    }

