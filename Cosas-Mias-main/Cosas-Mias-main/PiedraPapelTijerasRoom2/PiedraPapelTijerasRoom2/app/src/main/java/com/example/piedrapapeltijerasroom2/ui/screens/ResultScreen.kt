package com.example.piedrapapeltijerasroom2.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.piedrapapeltijerasroom2.viewmodel.GameViewModel

@Composable
fun ResultScreen(
    viewModel: GameViewModel,
    onReplay: () -> Unit,
    onExit: () -> Unit
) {
    val state by viewModel.uiState.collectAsState()

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.secondaryContainer)
    ) {
        Card(
            modifier = Modifier
                .padding(24.dp)
                .align(Alignment.Center),
            shape = RoundedCornerShape(24.dp),
            elevation = CardDefaults.cardElevation(10.dp)
        ) {
            Column(
                modifier = Modifier
                    .padding(28.dp)
                    .fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {

                Text(
                    text = "🏁 Fin del Juego",
                    style = MaterialTheme.typography.headlineMedium,
                    fontWeight = FontWeight.Bold
                )

                Spacer(Modifier.height(24.dp))

                Text(
                    text = state.finalMessage,
                    style = MaterialTheme.typography.titleLarge
                )

                Spacer(Modifier.height(20.dp))

                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.primaryContainer
                    )
                ) {
                    Text(
                        text = "${state.playerName}: ${state.playerScore}  vs  IA: ${state.aiScore}",
                        style = MaterialTheme.typography.titleMedium,
                        modifier = Modifier.padding(16.dp)
                    )
                }

                Spacer(Modifier.height(36.dp))

                Button(
                    onClick = {
                        viewModel.resetGame()
                        onReplay()
                    },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("🔄 Jugar de nuevo")
                }

                Spacer(Modifier.height(12.dp))

                OutlinedButton(
                    onClick = {
                        viewModel.exitGame()
                        onExit()
                    },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("🚪 Salir")
                }
            }
        }
    }
}
