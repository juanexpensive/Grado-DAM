package com.example.hotelbookingapp.ui.screen

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ExitToApp
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.hotelbookingapp.data.entity.Room
import com.example.hotelbookingapp.ui.navigation.Screen
import com.example.hotelbookingapp.ui.viewmodel.RoomViewModel
import com.example.hotelbookingapp.ui.viewmodel.UserViewModel

/**
 * Pantalla principal que muestra la lista de habitaciones disponibles
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    navController: NavController,
    userViewModel: UserViewModel,
    roomViewModel: RoomViewModel
) {
    val currentUser by userViewModel.currentUser.collectAsState()
    val availableRooms by roomViewModel.availableRooms.collectAsState()
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Hotel Booking") },
                actions = {
                    if (currentUser != null) {
                        // Usuario logueado: mostrar nombre, botón Reservas y Logout
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(end = 8.dp)
                        ) {
                            Text(
                                text = currentUser!!.name,
                                style = MaterialTheme.typography.bodyMedium,
                                modifier = Modifier.padding(end = 8.dp)
                            )
                            
                            TextButton(
                                onClick = { navController.navigate(Screen.Bookings.route) }
                            ) {
                                Text("Reservas")
                            }
                            
                            IconButton(onClick = {
                                userViewModel.logout()
                            }) {
                                Icon(
                                    imageVector = Icons.Default.ExitToApp,
                                    contentDescription = "Logout"
                                )
                            }
                        }
                    } else {
                        // Usuario no logueado: mostrar botón Login/Registro
                        TextButton(
                            onClick = { navController.navigate(Screen.Login.route) }
                        ) {
                            Icon(
                                imageVector = Icons.Default.Person,
                                contentDescription = "Login",
                                modifier = Modifier.padding(end = 4.dp)
                            )
                            Text("Login / Registro")
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                    titleContentColor = MaterialTheme.colorScheme.primary
                )
            )
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            if (availableRooms.isEmpty()) {
                // No hay habitaciones disponibles
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
                // Lista de habitaciones disponibles
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(availableRooms) { room ->
                        RoomCard(
                            room = room,
                            onClick = {
                                navController.navigate(Screen.RoomDetail.createRoute(room.id))
                            }
                        )
                    }
                }
            }
        }
    }
}

/**
 * Card que muestra la información de una habitación
 */
@Composable
fun RoomCard(
    room: Room,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
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
                    text = "Habitación ${room.roomNumber}",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
                
                Surface(
                    color = MaterialTheme.colorScheme.primaryContainer,
                    shape = MaterialTheme.shapes.small
                ) {
                    Text(
                        text = room.type,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                        style = MaterialTheme.typography.labelMedium
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Text(
                text = room.description,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "Capacidad: ${room.capacity} persona${if (room.capacity > 1) "s" else ""}",
                    style = MaterialTheme.typography.bodySmall
                )
                
                Text(
                    text = "$${room.pricePerNight}/noche",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }
    }
}
