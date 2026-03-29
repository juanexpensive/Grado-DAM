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

@Composable
fun WelcomeScreen(
    onStart: (String, Int) -> Unit,
    onHistoryClick: () -> Unit
) {
    var name by remember { mutableStateOf("") }
    var rounds by remember { mutableStateOf(5) }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.primaryContainer)
    ) {
        Card(
            modifier = Modifier
                .padding(24.dp)
                .align(Alignment.Center),
            shape = RoundedCornerShape(20.dp),
            elevation = CardDefaults.cardElevation(8.dp)
        ) {
            Column(
                modifier = Modifier
                    .padding(24.dp)
                    .fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {

                Text(
                    text = "🎮 Piedra, Papel, Tijeras",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold
                )

                Spacer(Modifier.height(24.dp))

                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("Nombre del jugador") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(Modifier.height(20.dp))

                Text(
                    text = "Selecciona rondas",
                    style = MaterialTheme.typography.titleMedium
                )

                Spacer(Modifier.height(12.dp))

                Row(
                    horizontalArrangement = Arrangement.SpaceEvenly,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    listOf(3, 5).forEach { r ->
                        AssistChip(
                            onClick = { rounds = r },
                            label = { Text("$r rondas") },
                            colors = AssistChipDefaults.assistChipColors(
                                containerColor = if (rounds == r)
                                    MaterialTheme.colorScheme.primary
                                else
                                    Color.LightGray,
                                labelColor = Color.Black
                            )
                        )
                    }
                }

                Spacer(Modifier.height(32.dp))

                Button(
                    onClick = { onStart(name, rounds) },
                    enabled = name.isNotBlank(),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("COMENZAR JUEGO")
                }

                Spacer(Modifier.height(12.dp))

                OutlinedButton(
                    onClick = onHistoryClick,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("📜 Ver Historial")
                }
            }
        }
    }
}
