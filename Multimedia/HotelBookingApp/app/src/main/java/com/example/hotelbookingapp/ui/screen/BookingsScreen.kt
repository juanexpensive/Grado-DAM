package com.example.hotelbookingapp.ui.screen

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Cancel
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.hotelbookingapp.data.entity.BookingStatus
import com.example.hotelbookingapp.data.entity.BookingWithDetails
import com.example.hotelbookingapp.ui.viewmodel.BookingViewModel
import com.example.hotelbookingapp.ui.viewmodel.UserViewModel
import java.text.SimpleDateFormat
import java.util.*

/**
 * Pantalla que muestra todas las reservas del usuario
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BookingsScreen(
    navController: NavController,
    userViewModel: UserViewModel,
    bookingViewModel: BookingViewModel
) {
    val currentUser by userViewModel.currentUser.collectAsState()
    val userBookings by bookingViewModel.userBookings.collectAsState()
    val successMessage by bookingViewModel.successMessage.collectAsState()
    val errorMessage by bookingViewModel.errorMessage.collectAsState()
    
    val snackbarHostState = remember { SnackbarHostState() }
    
    // Cargar reservas del usuario
    LaunchedEffect(currentUser) {
        currentUser?.let {
            bookingViewModel.loadUserBookings(it.id)
        }
    }
    
    // Manejar mensajes
    LaunchedEffect(successMessage) {
        successMessage?.let {
            snackbarHostState.showSnackbar(it)
            bookingViewModel.clearMessages()
        }
    }
    
    LaunchedEffect(errorMessage) {
        errorMessage?.let {
            snackbarHostState.showSnackbar(it)
            bookingViewModel.clearMessages()
        }
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Mis Reservas") },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Volver")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                    titleContentColor = MaterialTheme.colorScheme.primary
                )
            )
        },
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) { paddingValues ->
        if (userBookings.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "No tienes reservas",
                        style = MaterialTheme.typography.titleLarge,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    TextButton(onClick = { navController.popBackStack() }) {
                        Text("Explorar habitaciones")
                    }
                }
            }
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(userBookings) { bookingWithDetails ->
                    BookingCard(
                        bookingWithDetails = bookingWithDetails,
                        onCancelClick = {
                            bookingViewModel.cancelBooking(
                                bookingId = bookingWithDetails.booking.id,
                                checkInDate = bookingWithDetails.booking.checkInDate
                            )
                        },
                        canCancel = bookingViewModel.canCancelBooking(bookingWithDetails.booking)
                    )
                }
            }
        }
    }
}

@Composable
fun BookingCard(
    bookingWithDetails: BookingWithDetails,
    onCancelClick: () -> Unit,
    canCancel: Boolean
) {
    val dateFormatter = remember { SimpleDateFormat("dd/MM/yyyy", Locale.getDefault()) }
    val booking = bookingWithDetails.booking
    val room = bookingWithDetails.room
    
    val statusColor = when (booking.status) {
        BookingStatus.ACTIVE -> MaterialTheme.colorScheme.primary
        BookingStatus.CANCELLED -> MaterialTheme.colorScheme.error
        BookingStatus.COMPLETED -> MaterialTheme.colorScheme.tertiary
    }
    
    val statusText = when (booking.status) {
        BookingStatus.ACTIVE -> "Activa"
        BookingStatus.CANCELLED -> "Cancelada"
        BookingStatus.COMPLETED -> "Completada"
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
                Column {
                    Text(
                        text = "Habitación ${room.roomNumber}",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold
                    )
                    
                    Text(
                        text = room.type,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                
                Surface(
                    color = statusColor.copy(alpha = 0.15f),
                    shape = MaterialTheme.shapes.small
                ) {
                    Text(
                        text = statusText,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                        style = MaterialTheme.typography.labelMedium,
                        color = statusColor
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Divider()
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Column {
                    Text(
                        text = "Check-in",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Text(
                        text = dateFormatter.format(Date(booking.checkInDate)),
                        style = MaterialTheme.typography.bodyMedium,
                        fontWeight = FontWeight.Medium
                    )
                }
                
                Column(horizontalAlignment = Alignment.End) {
                    Text(
                        text = "Check-out",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Text(
                        text = dateFormatter.format(Date(booking.checkOutDate)),
                        style = MaterialTheme.typography.bodyMedium,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Precio Total",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Text(
                        text = "$${booking.totalPrice}",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
                
                if (canCancel) {
                    OutlinedButton(
                        onClick = onCancelClick,
                        colors = ButtonDefaults.outlinedButtonColors(
                            contentColor = MaterialTheme.colorScheme.error
                        )
                    ) {
                        Icon(
                            imageVector = Icons.Default.Cancel,
                            contentDescription = null,
                            modifier = Modifier
                                .size(18.dp)
                                .padding(end = 4.dp)
                        )
                        Text("Cancelar")
                    }
                }
            }
        }
    }
}
