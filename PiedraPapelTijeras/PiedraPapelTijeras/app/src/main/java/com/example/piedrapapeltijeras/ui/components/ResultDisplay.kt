package com.example.piedrapapeltijeras.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.piedrapapeltijeras.models.Choice
import com.example.piedrapapeltijeras.models.RoundResult

@Composable
fun ResultDisplay(
    playerChoice: Choice,
    aiChoice: Choice,
    result: RoundResult,
    playerName: String,
    aiName: String,
    currentRound: Int,
    totalRounds: Int,
    onNextRound: () -> Unit
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(48.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = playerName,
                    fontSize = 14.sp,
                    color = Color(0xFF6B7280),
                    modifier = Modifier.padding(bottom = 8.dp)
                )
                Text(
                    text = playerChoice.getEmoji(),
                    fontSize = 64.sp
                )
            }

            Text(
                text = "VS",
                fontSize = 32.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF9CA3AF)
            )

            Column(
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = aiName,
                    fontSize = 14.sp,
                    color = Color(0xFF6B7280),
                    modifier = Modifier.padding(bottom = 8.dp)
                )
                Text(
                    text = aiChoice.getEmoji(),
                    fontSize = 64.sp
                )
            }
        }

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    color = when (result) {
                        RoundResult.GANA -> Color(0xFFD1FAE5)
                        RoundResult.PIERDE -> Color(0xFFFEE2E2)
                        RoundResult.EMPATE -> Color(0xFFFEF3C7)
                    },
                    shape = RoundedCornerShape(12.dp)
                )
                .padding(16.dp),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = when (result) {
                    RoundResult.GANA -> "¡Ganaste esta ronda!"
                    RoundResult.PIERDE -> "¡Perdiste esta ronda!"
                    RoundResult.EMPATE -> "¡Empate!"
                },
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                color = when (result) {
                    RoundResult.GANA -> Color(0xFF047857)
                    RoundResult.PIERDE -> Color(0xFFDC2626)
                    RoundResult.EMPATE -> Color(0xFFD97706)
                }
            )
        }

        if (currentRound < totalRounds) {
            Button(
                onClick = onNextRound,
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0xFF9333EA)
                ),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text(
                    text = "Siguiente Ronda",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
                )
            }
        }
    }
}