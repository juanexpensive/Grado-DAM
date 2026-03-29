package com.example.piedrapapeltijeras.ui.theme.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.piedrapapeltijeras.models.*
import com.example.piedrapapeltijeras.ui.components.PlayerSection
import com.example.piedrapapeltijeras.ui.components.ResultDisplay

@Composable
fun GameScreen(
    gameState: GameState,
    onPlayRound: (Choice?) -> Unit,
    onNextRound: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.linearGradient(
                    colors = listOf(
                        Color(0xFF9333EA),
                        Color(0xFF2563EB),
                        Color(0xFF06B6D4)
                    )
                )
            )
    ) {
        Column(
            modifier = Modifier.fillMaxSize()
        ) {
            // AI Section
            PlayerSection(
                playerName = GameConstants.AI_NAME,
                score = gameState.aiScore,
                selectedChoice = gameState.aiChoice,
                backgroundColor = Color(0xFFEF4444),
                isTopSection = true
            )

            // Central Game Area
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxWidth()
                    .padding(16.dp),
                contentAlignment = Alignment.Center
            ) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White)
                ) {
                    Column(
                        modifier = Modifier.padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        Text(
                            text = "Ronda ${gameState.currentRound} de ${gameState.totalRounds}",
                            fontSize = 24.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF1F2937)
                        )

                        Row(
                            horizontalArrangement = Arrangement.spacedBy(32.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "${gameState.playerName}: ${gameState.playerScore}",
                                fontSize = 18.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = Color(0xFF2563EB)
                            )
                            Text(
                                text = "-",
                                fontSize = 18.sp,
                                color = Color(0xFF9CA3AF)
                            )
                            Text(
                                text = "${GameConstants.AI_NAME}: ${gameState.aiScore}",
                                fontSize = 18.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = Color(0xFFEF4444)
                            )
                        }

                        if (gameState.showResult) {
                            ResultDisplay(
                                playerChoice = gameState.playerChoice!!,
                                aiChoice = gameState.aiChoice!!,
                                result = gameState.roundResult!!,
                                playerName = gameState.playerName,
                                aiName = GameConstants.AI_NAME,
                                currentRound = gameState.currentRound,
                                totalRounds = gameState.totalRounds,
                                onNextRound = onNextRound
                            )
                        } else {
                            Text(
                                text = "¡Elige tu jugada!",
                                fontSize = 20.sp,
                                color = Color(0xFF6B7280),
                                modifier = Modifier.padding(vertical = 48.dp)
                            )
                        }
                    }
                }
            }

            // Player Section
            PlayerSection(
                playerName = gameState.playerName,
                score = gameState.playerScore,
                selectedChoice = gameState.playerChoice,
                backgroundColor = Color(0xFF3B82F6),
                isTopSection = false,
                onPlayRound = onPlayRound,
                showResult = gameState.showResult
            )
        }
    }
}
