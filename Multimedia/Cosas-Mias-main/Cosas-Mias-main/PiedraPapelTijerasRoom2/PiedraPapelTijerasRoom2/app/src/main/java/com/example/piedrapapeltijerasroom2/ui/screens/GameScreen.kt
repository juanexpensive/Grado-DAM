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
import androidx.compose.ui.unit.sp
import com.example.piedrapapeltijerasroom2.model.GameChoice
import com.example.piedrapapeltijerasroom2.viewmodel.GameViewModel

@Composable
fun GameScreen(
    viewModel: GameViewModel,
    onGameOver: () -> Unit
) {
    val state by viewModel.uiState.collectAsState()

    if (state.isGameOver) {
        LaunchedEffect(Unit) { onGameOver() }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.surfaceVariant)
    ) {

        /* ---------- IA ---------- */
        Card(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .padding(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = Color(0xFFFFEBEE)
            )
        ) {
            Column(
                Modifier.fillMaxSize(),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text("🤖 C3PO", fontWeight = FontWeight.Bold)
                Text(state.aiChoice.icon, fontSize = 56.sp)
                Text("Puntos: ${state.aiScore}")
            }
        }

        /* ---------- TABLERO ---------- */
        Card(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .padding(horizontal = 12.dp),
            shape = RoundedCornerShape(20.dp)
        ) {
            Column(
                Modifier.fillMaxSize(),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {

                Text(
                    "Ronda ${state.currentRound}/${state.maxRounds}",
                    fontWeight = FontWeight.Bold
                )

                Spacer(Modifier.height(12.dp))

                Text(
                    state.roundMessage,
                    style = MaterialTheme.typography.titleLarge,
                    color = MaterialTheme.colorScheme.primary
                )

                Spacer(Modifier.height(16.dp))

                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(state.aiChoice.icon, fontSize = 34.sp)
                    Text("  VS  ")
                    Text(state.playerChoice.icon, fontSize = 34.sp)
                }
            }
        }

        /* ---------- JUGADOR ---------- */
        Card(
            modifier = Modifier
                .weight(1.5f)
                .fillMaxWidth()
                .padding(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = Color(0xFFE8F5E9)
            )
        ) {
            Column(
                Modifier.fillMaxSize(),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {

                Text(
                    state.playerName,
                    fontWeight = FontWeight.Bold
                )

                Text("Puntos: ${state.playerScore}")

                Spacer(Modifier.height(16.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly
                ) {
                    GameOptionBtn(GameChoice.ROCK) {
                        viewModel.playTurn(GameChoice.ROCK)
                    }
                    GameOptionBtn(GameChoice.PAPER) {
                        viewModel.playTurn(GameChoice.PAPER)
                    }
                    GameOptionBtn(GameChoice.SCISSORS) {
                        viewModel.playTurn(GameChoice.SCISSORS)
                    }
                }

                Spacer(Modifier.height(16.dp))

                Button(
                    onClick = { viewModel.playRandom() },
                    modifier = Modifier.fillMaxWidth(0.6f)
                ) {
                    Text("🎲 Random")
                }
            }
        }
    }
}

@Composable
private fun GameOptionBtn(
    choice: GameChoice,
    onClick: () -> Unit
) {
    FilledTonalButton(
        onClick = onClick,
        shape = RoundedCornerShape(50),
        modifier = Modifier.size(70.dp),
        contentPadding = PaddingValues(0.dp)
    ) {
        Text(choice.icon, fontSize = 28.sp)
    }
}
