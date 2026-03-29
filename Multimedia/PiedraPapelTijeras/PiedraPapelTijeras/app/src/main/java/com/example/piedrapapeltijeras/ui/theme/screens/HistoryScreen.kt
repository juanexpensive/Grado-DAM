package com.example.piedrapapeltijeras.ui.theme.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.piedrapapeltijeras.database.GameMatch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HistoryScreen(
    matches: List<GameMatch>,
    onDeleteMatch: (GameMatch) -> Unit,
    onDeleteAll: () -> Unit,
    onBack: () -> Unit
) {
    var showDeleteAllDialog by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        "Historial de Partidas",
                        fontWeight = FontWeight.Bold
                    )
                },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, "Volver")
                    }
                },
                actions = {
                    if (matches.isNotEmpty()) {
                        IconButton(onClick = { showDeleteAllDialog = true }) {
                            Icon(Icons.Default.Delete, "Borrar todo")
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color(0xFF9333EA),
                    titleContentColor = Color.White,
                    navigationIconContentColor = Color.White,
                    actionIconContentColor = Color.White
                )
            )
        }
    ) { padding ->
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
                .padding(padding)
        ) {
            if (matches.isEmpty()) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(32.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Text(
                        text = "📭",
                        fontSize = 80.sp
                    )
                    Text(
                        text = "No hay partidas guardadas",
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White,
                        modifier = Modifier.padding(top = 16.dp)
                    )
                    Text(
                        text = "¡Juega tu primera partida!",
                        fontSize = 16.sp,
                        color = Color.White.copy(alpha = 0.8f),
                        modifier = Modifier.padding(top = 8.dp)
                    )
                }
            } else {
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    item {
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            colors = CardDefaults.cardColors(
                                containerColor = Color.White.copy(alpha = 0.95f)
                            ),
                            shape = RoundedCornerShape(16.dp)
                        ) {
                            Column(
                                modifier = Modifier.padding(16.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Text(
                                    text = "Total de partidas: ${matches.size}",
                                    fontSize = 18.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color(0xFF1F2937)
                                )
                                Text(
                                    text = "Ordenadas por victorias",
                                    fontSize = 14.sp,
                                    color = Color(0xFF6B7280)
                                )
                            }
                        }
                    }

                    items(matches) { match ->
                        MatchItem(
                            match = match,
                            onDelete = { onDeleteMatch(match) }
                        )
                    }

                    item {
                        Spacer(modifier = Modifier.height(16.dp))
                    }
                }
            }
        }
    }

    if (showDeleteAllDialog) {
        AlertDialog(
            onDismissRequest = { showDeleteAllDialog = false },
            title = { Text("Borrar todas las partidas") },
            text = { Text("¿Estás seguro de que quieres eliminar todas las partidas? Esta acción no se puede deshacer.") },
            confirmButton = {
                Button(
                    onClick = {
                        onDeleteAll()
                        showDeleteAllDialog = false
                    },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFFEF4444)
                    )
                ) {
                    Text("Borrar todo")
                }
            },
            dismissButton = {
                TextButton(onClick = { showDeleteAllDialog = false }) {
                    Text("Cancelar")
                }
            }
        )
    }
}

@Composable
fun MatchItem(
    match: GameMatch,
    onDelete: () -> Unit
) {
    var showDeleteDialog by remember { mutableStateOf(false) }

    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        shape = RoundedCornerShape(16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = if (match.isVictory) "🏆" else if (match.playerScore == match.aiScore) "🤝" else "😔",
                        fontSize = 32.sp
                    )

                    Column {
                        Text(
                            text = match.playerName,
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF1F2937)
                        )
                        Text(
                            text = match.getResultText(),
                            fontSize = 16.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = when {
                                match.playerScore > match.aiScore -> Color(0xFF10B981)
                                match.playerScore < match.aiScore -> Color(0xFFEF4444)
                                else -> Color(0xFFF59E0B)
                            }
                        )
                    }
                }

                Row(
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Text(
                        text = "Puntuación: ${match.playerScore} - ${match.aiScore}",
                        fontSize = 14.sp,
                        color = Color(0xFF6B7280)
                    )
                    Text(
                        text = "•",
                        fontSize = 14.sp,
                        color = Color(0xFF6B7280)
                    )
                    Text(
                        text = "${match.totalRounds} rondas",
                        fontSize = 14.sp,
                        color = Color(0xFF6B7280)
                    )
                }

                Text(
                    text = match.getFormattedDate(),
                    fontSize = 12.sp,
                    color = Color(0xFF9CA3AF)
                )
            }

            IconButton(
                onClick = { showDeleteDialog = true },
                colors = IconButtonDefaults.iconButtonColors(
                    contentColor = Color(0xFFEF4444)
                )
            ) {
                Icon(
                    Icons.Default.Delete,
                    contentDescription = "Eliminar partida"
                )
            }
        }
    }

    if (showDeleteDialog) {
        AlertDialog(
            onDismissRequest = { showDeleteDialog = false },
            title = { Text("Eliminar partida") },
            text = { Text("¿Estás seguro de que quieres eliminar esta partida?") },
            confirmButton = {
                Button(
                    onClick = {
                        onDelete()
                        showDeleteDialog = false
                    },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFFEF4444)
                    )
                ) {
                    Text("Eliminar")
                }
            },
            dismissButton = {
                TextButton(onClick = { showDeleteDialog = false }) {
                    Text("Cancelar")
                }
            }
        )
    }
}
