package com.example.piedrapapeltijerasroom2.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.piedrapapeltijerasroom2.model.GameEntity
import com.example.piedrapapeltijerasroom2.viewmodel.GameViewModel
import java.text.SimpleDateFormat
import java.util.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HistoryScreen(
    viewModel: GameViewModel,
    onBack: () -> Unit
) {
    val historyList by viewModel.historyList.collectAsState()

    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = {
                    Text(
                        "📜 Historial de Partidas",
                        fontWeight = FontWeight.Bold
                    )
                },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Volver")
                    }
                }
            )
        }
    ) { paddingValues ->

        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colorScheme.secondaryContainer)
                .padding(paddingValues)
        ) {

            if (historyList.isEmpty()) {
                Column(
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text("😴 Aún no hay partidas")
                    Text("¡Juega una para verla aquí!")
                }
            } else {
                LazyColumn(
                    contentPadding = PaddingValues(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(historyList) { game ->
                        GameHistoryItem(game)
                    }
                }
            }
        }
    }
}

@Composable
fun GameHistoryItem(game: GameEntity) {

    val dateFormat = SimpleDateFormat("dd/MM/yyyy • HH:mm", Locale.getDefault())
    val dateString = dateFormat.format(Date(game.timestamp))

    val resultColor = when {
        game.playerScore > game.aiScore -> Color(0xFF4CAF50)
        game.aiScore > game.playerScore -> Color(0xFFE57373)
        else -> Color(0xFFFFB74D)
    }

    Card(
        shape = RoundedCornerShape(20.dp),
        elevation = CardDefaults.cardElevation(6.dp)
    ) {
        Column(
            modifier = Modifier
                .padding(18.dp)
                .fillMaxWidth()
        ) {

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    game.playerName,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )

                Text(
                    dateString,
                    style = MaterialTheme.typography.bodySmall,
                    color = Color.Gray
                )
            }

            Spacer(Modifier.height(8.dp))
            Divider()

            Spacer(Modifier.height(8.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {

                Text(
                    "Jugador ${game.playerScore}  •  IA ${game.aiScore}",
                    fontWeight = FontWeight.Medium
                )

                AssistChip(
                    onClick = {},
                    label = {
                        Text(
                            game.resultMessage,
                            fontWeight = FontWeight.Bold
                        )
                    },
                    colors = AssistChipDefaults.assistChipColors(
                        containerColor = resultColor.copy(alpha = 0.2f),
                        labelColor = resultColor
                    )
                )
            }
        }
    }
}
