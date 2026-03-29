package com.example.tipoexamenimc

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.tipoexamenimc.ui.theme.TipoExamenIMCTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            TipoExamenIMCTheme {
                val navController = rememberNavController()
                val viewModel: FlujoDatosViewModel = viewModel()
                NavHost(
                    navController = navController,
                    startDestination = "NombrePesoSexo"
                ) {
                    composable("NombrePesoSexo") {
                        NombrePesoSexo(navController = navController, viewModel = viewModel)
                    }

                    composable ("AlturaLista") {
                        AlturaLista(navController = navController, viewModel = viewModel)
                    }
                    composable ("Division") {
                        Division(navController = navController, viewModel = viewModel)
                    }

                }
            }
        }
    }
}
