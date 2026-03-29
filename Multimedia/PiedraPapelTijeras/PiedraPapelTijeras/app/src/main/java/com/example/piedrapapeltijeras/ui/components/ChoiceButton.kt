package com.example.piedrapapeltijeras.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.piedrapapeltijeras.models.Choice
import java.util.Locale

@Composable
fun ChoiceButton(
    choice: Choice?,
    isSelected: Boolean = false,
    onClick: (() -> Unit)? = null,
    enabled: Boolean = true
) {
    val backgroundColor = Color.White.copy(alpha = 0.2f)
    val borderColor = if (isSelected) Color(0xFFFCD34D) else Color.Transparent

    Box(
        modifier = Modifier
            .size(80.dp)
            .background(backgroundColor, RoundedCornerShape(12.dp))
            .border(
                width = if (isSelected) 4.dp else 0.dp,
                color = borderColor,
                shape = RoundedCornerShape(12.dp)
            )
            .then(
                if (onClick != null && enabled) {
                    Modifier.clickable { onClick() }
                } else Modifier
            ),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = choice?.getEmoji() ?: "🎲",
                fontSize = 40.sp,
                textAlign = TextAlign.Center
            )
            if (choice != null) {
                Text(
                    text = choice.name.lowercase().replaceFirstChar { if (it.isLowerCase()) it.titlecase(Locale.getDefault()) else it.toString() },
                    fontSize = 12.sp,
                    color = Color.White,
                    fontWeight = FontWeight.Medium,
                    modifier = Modifier.padding(top = 4.dp)
                )
            } else {
                Text(
                    text = "Random",
                    fontSize = 12.sp,
                    color = Color.White,
                    fontWeight = FontWeight.Medium,
                    modifier = Modifier.padding(top = 4.dp)
                )
            }
        }
    }
}