package com.example.tipoexamendificilbien

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.tipoexamendificilbien.ui.theme.TipoExamenDificilBienTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            TipoExamenDificilBienTheme {
                val navController = rememberNavController()
                val viewModel: TiendaViewModel = viewModel()

                NavHost(
                    navController = navController,
                    startDestination = "Elegir"
                ) {
                    composable("Elegir") {
                        PantallaElegir(navController = navController, viewModel = viewModel)
                    }

                    composable("Comprar") {
                        PantallaComprar(navController = navController, viewModel = viewModel)
                    }

                    composable("Vender") {
                        PantallaVender(navController = navController, viewModel = viewModel)
                    }
                }
            }
        }
    }
}