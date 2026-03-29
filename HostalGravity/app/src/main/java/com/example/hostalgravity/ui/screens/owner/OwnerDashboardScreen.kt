package com.example.hostalgravity.ui.screens.owner

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
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
fun OwnerDashboardScreen(
    viewModel: OwnerViewModel,
    onBack: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Panel de Administración") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Logout")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer
                )
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = { viewModel.showAddRoomDialog() }
            ) {
                Icon(Icons.Default.Add, contentDescription = "Añadir habitación")
            }
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
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                item {
                    Text(
                        text = "Estado de Habitaciones",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                }
                
                items(uiState.rooms) { roomInfo ->
                    RoomStatusCard(
                        roomInfo = roomInfo,
                        onFreeRoom = { viewModel.freeRoom(roomInfo.room.id) }
                    )
                }
                
                item {
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(
                        text = "Historial de Reservas (${uiState.allBookings.size})",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                }
                
                items(uiState.allBookings.take(10)) { booking ->
                    BookingHistoryItem(booking = booking)
                }
            }
        }
        
        // Add room dialog
        if (uiState.showAddRoomDialog) {
            AddRoomDialog(
                uiState = uiState,
                viewModel = viewModel,
                onDismiss = { viewModel.hideAddRoomDialog() }
            )
        }
    }
}

@Composable
private fun RoomStatusCard(
    roomInfo: RoomWithBookingInfo,
    onFreeRoom: () -> Unit
) {
    val room = roomInfo.room
    var showConfirmDialog by remember { mutableStateOf(false) }
    
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = if (room.isAvailable) 
                MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.3f)
            else 
                MaterialTheme.colorScheme.errorContainer.copy(alpha = 0.3f)
        )
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Habitación ${room.roomNumber}",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = room.roomType,
                        style = MaterialTheme.typography.bodySmall
                    )
                }
                
                AssistChip(
                    onClick = { },
                    label = { 
                        Text(if (room.isAvailable) "Disponible" else "Ocupada") 
                    },
                    colors = AssistChipDefaults.assistChipColors(
                        containerColor = if (room.isAvailable)
                            MaterialTheme.colorScheme.primary.copy(alpha = 0.2f)
                        else
                            MaterialTheme.colorScheme.error.copy(alpha = 0.2f)
                    )
                )
            }
            
            if (!room.isAvailable && roomInfo.guestName != null) {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "Huésped: ${roomInfo.guestName}",
                    style = MaterialTheme.typography.bodyMedium
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                Button(
                    onClick = { showConfirmDialog = true },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Liberar Habitación")
                }
            }
        }
    }
    
    if (showConfirmDialog) {
        AlertDialog(
            onDismissRequest = { showConfirmDialog = false },
            title = { Text("Liberar Habitación") },
            text = { Text("¿Confirmas que el huésped ha abandonado la habitación ${room.roomNumber}?") },
            confirmButton = {
                TextButton(
                    onClick = {
                        onFreeRoom()
                        showConfirmDialog = false
                    }
                ) {
                    Text("Sí, liberar")
                }
            },
            dismissButton = {
                TextButton(onClick = { showConfirmDialog = false }) {
                    Text("Cancelar")
                }
            }
        )
    }
}

@Composable
private fun BookingHistoryItem(booking: com.example.hostalgravity.data.database.entities.BookingEntity) {
    val dateFormat = remember { SimpleDateFormat("dd/MM/yyyy", Locale.getDefault()) }
    
    val status = when {
        booking.isCancelled -> "Cancelada"
        booking.isCompleted -> "Finalizada"
        else -> "Activa"
    }
    
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Reserva #${booking.id}",
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "${dateFormat.format(Date(booking.checkInDate))} - ${dateFormat.format(Date(booking.checkOutDate))}",
                    style = MaterialTheme.typography.bodySmall
                )
            }
            Text(
                text = status,
                style = MaterialTheme.typography.labelMedium,
                color = when {
                    booking.isCancelled -> MaterialTheme.colorScheme.error
                    booking.isCompleted -> MaterialTheme.colorScheme.outline
                    else -> MaterialTheme.colorScheme.primary
                }
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun AddRoomDialog(
    uiState: OwnerUiState,
    viewModel: OwnerViewModel,
    onDismiss: () -> Unit
) {
    val roomTypes = listOf("Individual", "Doble", "Suite")
    var expanded by remember { mutableStateOf(false) }
    
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Añadir Habitación") },
        text = {
            Column(
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                OutlinedTextField(
                    value = uiState.newRoomNumber,
                    onValueChange = { viewModel.updateNewRoomNumber(it) },
                    label = { Text("Número") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )
                
                ExposedDropdownMenuBox(
                    expanded = expanded,
                    onExpandedChange = { expanded = !expanded }
                ) {
                    OutlinedTextField(
                        value = uiState.newRoomType,
                        onValueChange = { },
                        readOnly = true,
                        label = { Text("Tipo") },
                        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
                        modifier = Modifier
                            .fillMaxWidth()
                            .menuAnchor()
                    )
                    
                    ExposedDropdownMenu(
                        expanded = expanded,
                        onDismissRequest = { expanded = false }
                    ) {
                        roomTypes.forEach { type ->
                            DropdownMenuItem(
                                text = { Text(type) },
                                onClick = {
                                    viewModel.updateNewRoomType(type)
                                    expanded = false
                                }
                            )
                        }
                    }
                }
                
                OutlinedTextField(
                    value = uiState.newRoomPrice,
                    onValueChange = { viewModel.updateNewRoomPrice(it) },
                    label = { Text("Precio/noche (€)") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )
                
                OutlinedTextField(
                    value = uiState.newRoomCapacity,
                    onValueChange = { viewModel.updateNewRoomCapacity(it) },
                    label = { Text("Capacidad") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )
                
                OutlinedTextField(
                    value = uiState.newRoomDescription,
                    onValueChange = { viewModel.updateNewRoomDescription(it) },
                    label = { Text("Descripción") },
                    modifier = Modifier.fillMaxWidth(),
                    minLines = 2
                )
            }
        },
        confirmButton = {
            TextButton(onClick = { viewModel.addRoom() }) {
                Text("Añadir")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancelar")
            }
        }
    )
}
