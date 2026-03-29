package com.example.hostalgravity.ui.screens.roomlist

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.hostalgravity.data.database.entities.RoomEntity
import com.example.hostalgravity.data.database.entities.UserEntity

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RoomListScreen(
    viewModel: RoomListViewModel,
    currentUser: UserEntity?,
    onRoomClick: (Long) -> Unit,
    onLoginClick: () -> Unit,
    onBookingsClick: () -> Unit,
    onOwnerDashboardClick: () -> Unit,
    onLogout: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("JetPack Stay Rooms") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer
                )
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // User header
            UserHeader(
                currentUser = currentUser,
                onLoginClick = onLoginClick,
                onBookingsClick = onBookingsClick,
                onOwnerDashboardClick = onOwnerDashboardClick,
                onLogout = onLogout
            )
            
            Divider()
            
            // Room list
            if (uiState.isLoading) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator()
                }
            } else if (uiState.rooms.isEmpty()) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "NO VACANCY",
                        style = MaterialTheme.typography.headlineLarge,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.error
                    )
                }
            } else {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(uiState.rooms) { room ->
                        RoomCard(
                            room = room,
                            onClick = { onRoomClick(room.id) }
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun UserHeader(
    currentUser: UserEntity?,
    onLoginClick: () -> Unit,
    onBookingsClick: () -> Unit,
    onOwnerDashboardClick: () -> Unit,
    onLogout: () -> Unit
) {
    Surface(
        modifier = Modifier.fillMaxWidth(),
        color = MaterialTheme.colorScheme.surfaceVariant
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            if (currentUser != null) {
                Text(
                    text = "Hola, ${currentUser.username}",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    if (currentUser.isOwner) {
                        Button(onClick = onOwnerDashboardClick) {
                            Text("Panel Admin")
                        }
                    } else {
                        OutlinedButton(onClick = onBookingsClick) {
                            Text("Reservas")
                        }
                    }
                    TextButton(onClick = onLogout) {
                        Text("Logout")
                    }
                }
            } else {
                Text(
                    text = "Bienvenido",
                    style = MaterialTheme.typography.titleMedium
                )
                Button(onClick = onLoginClick) {
                    Text("Login / Registro")
                }
            }
        }
    }
}

@Composable
private fun RoomCard(
    room: RoomEntity,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() },
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "Habitación ${room.roomNumber}",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
                AssistChip(
                    onClick = { },
                    label = { Text(room.roomType) }
                )
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Text(
                text = room.description,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "Capacidad: ${room.capacity} persona(s)",
                    style = MaterialTheme.typography.bodySmall
                )
                Text(
                    text = "${room.pricePerNight}€/noche",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }
    }
}
