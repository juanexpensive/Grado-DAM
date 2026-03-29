package com.example.hostalgravity.ui.screens.bookings

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import java.text.SimpleDateFormat
import java.util.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BookingsScreen(
    viewModel: BookingsViewModel,
    userId: Long,
    onBack: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    
    LaunchedEffect(userId) {
        viewModel.loadBookings(userId)
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Mis Reservas") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Volver")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer
                )
            )
        }
    ) { paddingValues ->
        if (uiState.isLoading) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator()
            }
        } else if (uiState.bookings.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "No tienes reservas",
                    style = MaterialTheme.typography.bodyLarge
                )
            }
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(uiState.bookings) { bookingWithRoom ->
                    BookingCard(
                        bookingWithRoom = bookingWithRoom,
                        onCancel = { viewModel.cancelBooking(bookingWithRoom.booking.id) }
                    )
                }
            }
        }
    }
}

@Composable
private fun BookingCard(
    bookingWithRoom: BookingWithRoom,
    onCancel: () -> Unit
) {
    val booking = bookingWithRoom.booking
    val room = bookingWithRoom.room
    val dateFormat = remember { SimpleDateFormat("dd/MM/yyyy", Locale.getDefault()) }
    
    var showCancelDialog by remember { mutableStateOf(false) }
    
    val statusColor = when {
        booking.isCancelled -> MaterialTheme.colorScheme.error
        booking.isCompleted -> MaterialTheme.colorScheme.outline
        else -> MaterialTheme.colorScheme.primary
    }
    
    val statusText = when {
        booking.isCancelled -> "Cancelada"
        booking.isCompleted -> "Finalizada"
        else -> "Activa"
    }
    
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Habitación ${room?.roomNumber ?: "?"}",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                AssistChip(
                    onClick = { },
                    label = { Text(statusText) },
                    colors = AssistChipDefaults.assistChipColors(
                        containerColor = statusColor.copy(alpha = 0.1f),
                        labelColor = statusColor
                    )
                )
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Column {
                    Text(
                        text = "Entrada",
                        style = MaterialTheme.typography.labelSmall
                    )
                    Text(
                        text = dateFormat.format(Date(booking.checkInDate)),
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
                Column(horizontalAlignment = Alignment.End) {
                    Text(
                        text = "Salida",
                        style = MaterialTheme.typography.labelSmall
                    )
                    Text(
                        text = dateFormat.format(Date(booking.checkOutDate)),
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
            
            // Only show cancel button for active bookings
            if (!booking.isCancelled && !booking.isCompleted) {
                Spacer(modifier = Modifier.height(12.dp))
                
                OutlinedButton(
                    onClick = { showCancelDialog = true },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.outlinedButtonColors(
                        contentColor = MaterialTheme.colorScheme.error
                    )
                ) {
                    Text("Cancelar Reserva")
                }
            }
        }
    }
    
    if (showCancelDialog) {
        AlertDialog(
            onDismissRequest = { showCancelDialog = false },
            title = { Text("Cancelar Reserva") },
            text = { Text("¿Estás seguro de que quieres cancelar esta reserva? Esta acción no se puede deshacer.") },
            confirmButton = {
                TextButton(
                    onClick = {
                        onCancel()
                        showCancelDialog = false
                    }
                ) {
                    Text("Sí, cancelar", color = MaterialTheme.colorScheme.error)
                }
            },
            dismissButton = {
                TextButton(onClick = { showCancelDialog = false }) {
                    Text("No")
                }
            }
        )
    }
}
