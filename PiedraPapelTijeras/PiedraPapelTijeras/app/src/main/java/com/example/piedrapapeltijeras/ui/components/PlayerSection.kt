package com.example.piedrapapeltijeras.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.piedrapapeltijeras.models.Choice

@Composable
fun PlayerSection(
    playerName: String,
    score: Int,
    selectedChoice: Choice?,
    backgroundColor: Color,
    isTopSection: Boolean,
    onPlayRound: ((Choice?) -> Unit)? = null,
    showResult: Boolean = false
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(backgroundColor)
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            text = playerName,
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White
        )

        Row(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Choice.values().forEach { choice ->
                ChoiceButton(
                    choice = choice,
                    isSelected = selectedChoice == choice,
                    onClick = if (!isTopSection && onPlayRound != null) {
                        { onPlayRound(choice) }
                    } else null,
                    enabled = !showResult
                )
            }

            if (!isTopSection && onPlayRound != null) {
                Box(
                    modifier = Modifier
                        .size(80.dp)
                        .background(Color(0xFFFBBF24), androidx.compose.foundation.shape.RoundedCornerShape(12.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    ChoiceButton(
                        choice = null,
                        onClick = { onPlayRound(null) },
                        enabled = !showResult
                    )
                }
            }
        }

        Text(
            text = "Puntuación: $score",
            fontSize = 20.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color.White
        )
    }
}