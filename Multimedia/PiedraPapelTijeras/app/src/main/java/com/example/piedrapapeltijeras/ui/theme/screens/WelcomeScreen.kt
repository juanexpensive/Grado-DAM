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
import com.example.piedrapapeltijeras.models.GameState

@Composable
fun WelcomeScreen(
    gameState: GameState,
    onNameChange: (String) -> Unit,
    onRoundsChange: (Int) -> Unit,
    onStartGame: () -> Unit,
    onGoToHistory: () -> Unit
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
            ),
        contentAlignment = Alignment.Center
    ) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White)
        ) {
            Column(
                modifier = Modifier.padding(32.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(24.dp)
            ) {
                Text(
                    text = "🎮",
                    fontSize = 80.sp
                )

                Text(
                    text = "Piedra, Papel o Tijeras",
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF1F2937)
                )

                Text(
                    text = "¡Prepárate para la batalla!",
                    fontSize = 16.sp,
                    color = Color(0xFF6B7280)
                )

                Spacer(modifier = Modifier.height(8.dp))

                Column(
                    modifier = Modifier.fillMaxWidth(),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Text(
                        text = "Tu nombre",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Medium,
                        color = Color(0xFF374151)
                    )

                    OutlinedTextField(
                        value = gameState.playerName,
                        onValueChange = onNameChange,
                        modifier = Modifier.fillMaxWidth(),
                        placeholder = { Text("Introduce tu nombre") },
                        singleLine = true,
                        shape = RoundedCornerShape(12.dp)
                    )
                }

                Column(
                    modifier = Modifier.fillMaxWidth(),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Text(
                        text = "Número de rondas",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Medium,
                        color = Color(0xFF374151)
                    )

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        Button(
                            onClick = { onRoundsChange(3) },
                            modifier = Modifier.weight(1f),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (gameState.totalRounds == 3)
                                    Color(0xFF9333EA) else Color(0xFFE5E7EB)
                            ),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Text(
                                text = "3 rondas",
                                color = if (gameState.totalRounds == 3)
                                    Color.White else Color(0xFF374151),
                                modifier = Modifier.padding(8.dp)
                            )
                        }

                        Button(
                            onClick = { onRoundsChange(5) },
                            modifier = Modifier.weight(1f),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (gameState.totalRounds == 5)
                                    Color(0xFF9333EA) else Color(0xFFE5E7EB)
                            ),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Text(
                                text = "5 rondas",
                                color = if (gameState.totalRounds == 5)
                                    Color.White else Color(0xFF374151),
                                modifier = Modifier.padding(8.dp)
                            )
                        }
                    }
                }

                Button(
                    onClick = onStartGame,
                    modifier = Modifier.fillMaxWidth(),
                    enabled = gameState.playerName.isNotBlank(),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFF9333EA),
                        disabledContainerColor = Color(0xFFE5E7EB)
                    ),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text(
                        text = "¡Comenzar Juego!",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(12.dp)
                    )
                }

                OutlinedButton(
                    onClick = onGoToHistory,
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.outlinedButtonColors(
                        contentColor = Color(0xFF9333EA)
                    )
                ) {
                    Text(
                        text = "📊 Ver Historial de Partidas",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.SemiBold,
                        modifier = Modifier.padding(8.dp)
                    )
                }
            }
        }
    }
}