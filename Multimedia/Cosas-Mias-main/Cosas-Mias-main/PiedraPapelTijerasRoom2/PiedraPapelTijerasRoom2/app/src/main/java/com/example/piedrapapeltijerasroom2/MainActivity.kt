package com.example.piedrapapeltijerasroom2

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.piedrapapeltijerasroom2.ui.screens.ResultScreen
import com.example.piedrapapeltijerasroom2.data.GameDatabase
import com.example.piedrapapeltijerasroom2.repository.GameRepository
import com.example.piedrapapeltijerasroom2.ui.screens.GameScreen
import com.example.piedrapapeltijerasroom2.ui.screens.HistoryScreen
import com.example.piedrapapeltijerasroom2.ui.screens.WelcomeScreen
import com.example.piedrapapeltijerasroom2.viewmodel.GameViewModel
import com.example.piedrapapeltijerasroom2.viewmodel.GameViewModelFactory

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val database = GameDatabase.getDatabase(applicationContext)
        val repository = GameRepository(database.gameDao())
        val viewModelFactory = GameViewModelFactory(repository)

        setContent {
            Surface(
                modifier = Modifier.fillMaxSize(),
                color = MaterialTheme.colorScheme.background
            ) {
                val navController = rememberNavController()
                val gameViewModel: GameViewModel = viewModel(factory = viewModelFactory)

                NavHost(navController = navController, startDestination = "welcome") {

                    // PANTALLA BIENVENIDA
                    composable("welcome") {
                        WelcomeScreen(
                            onStart = { name, rounds ->
                                gameViewModel.startGame(name, rounds)
                                navController.navigate("game")
                            },
                            onHistoryClick = {
                                navController.navigate("history")
                            }
                        )
                    }

                    // PANTALLA JUEGO
                    composable("game") {
                        GameScreen(viewModel = gameViewModel, onGameOver = {
                            navController.navigate("result")
                        })
                    }

                    // PANTALLA RESULTADO
                    composable("result") {
                        ResultScreen(
                            viewModel = gameViewModel,
                            onReplay = {
                                navController.popBackStack("game", inclusive = false)
                            },
                            onExit = {
                                navController.navigate("welcome") {
                                    popUpTo("welcome") { inclusive = true }
                                }
                            }
                        )
                    }

                    // PANTALLA HISTORIAL
                    composable("history") {
                        HistoryScreen(
                            viewModel = gameViewModel,
                            onBack = {
                                navController.popBackStack()
                            }
                        )
                    }
                }
            }
        }
    }
}