package com.example.tipoexamencompras

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
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.tipoexamencompras.ui.theme.TipoExamenComprasTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            TipoExamenComprasTheme {
                val navController = rememberNavController()
                NavHost(navController, startDestination = Routes.ELEGIR) {
                    composable(Routes.ELEGIR) {
                        PantallaElegir(navController, viewModel())
                    }
                    composable(Routes.COMPRAR) {
                        PantallaComprar(navController, viewModel())
                    }
                    composable(Routes.VENDER) {
                        PantallaVender(navController, viewModel())
                    }
                }
                }
            }
        }
    }

