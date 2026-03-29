package com.example.hotelbookingapp.ui.screen

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.hotelbookingapp.data.entity.Room
import com.example.hotelbookingapp.ui.navigation.Screen
import com.example.hotelbookingapp.ui.viewmodel.BookingViewModel
import com.example.hotelbookingapp.ui.viewmodel.RoomViewModel
import com.example.hotelbookingapp.ui.viewmodel.UserViewModel
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.TimeUnit

/**
 * Pantalla de detalle de habitación con opción de reserva
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RoomDetailScreen(
    roomId: Long,
    navController: NavController,
    userViewModel: UserViewModel,
    roomViewModel: RoomViewModel,
    bookingViewModel: BookingViewModel
) {
    var room by remember { mutableStateOf<Room?>(null) }
    val currentUser by userViewModel.currentUser.collectAsState()
    val isLoading by bookingViewModel.isLoading.collectAsState()
    val successMessage by bookingViewModel.successMessage.collectAsState()
    val errorMessage by bookingViewModel.errorMessage.collectAsState()
    
    val snackbarHostState = remember { SnackbarHostState() }
    
    // Cargar la habitación
    LaunchedEffect(roomId) {
        roomViewModel.getRoomById(roomId) { loadedRoom ->
            room = loadedRoom
        }
    }
    
    // Manejar mensajes
    LaunchedEffect(successMessage) {
        successMessage?.let {
            snackbarHostState.showSnackbar(it)
            bookingViewModel.clearMessages()
            navController.navigate(Screen.Bookings.route)
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
                title = { Text("Detalle de Habitación") },
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
        if (room == null) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator()
            }
        } else {
            RoomDetailContent(
                room = room!!,
                currentUser = currentUser,
                isLoading = isLoading,
                onBookClick = { checkIn, checkOut ->
                    if (currentUser != null) {
                        bookingViewModel.createBooking(
                            userId = currentUser!!.id,
                            roomId = room!!.id,
                            checkInDate = checkIn,
                            checkOutDate = checkOut
                        ) {
                            // Éxito manejado en LaunchedEffect
                        }
                    } else {
                        navController.navigate(Screen.Login.route)
                    }
                },
                modifier = Modifier.padding(paddingValues)
            )
        }
    }
}

@Composable
fun RoomDetailContent(
    room: Room,
    currentUser: com.example.hotelbookingapp.data.entity.User?,
    isLoading: Boolean,
    onBookClick: (checkIn: Long, checkOut: Long) -> Unit,
    modifier: Modifier = Modifier
) {
    var checkInDate by remember { mutableStateOf<Long?>(null) }
    var checkOutDate by remember { mutableStateOf<Long?>(null) }
    var showDatePicker by remember { mutableStateOf(false) }
    var isSelectingCheckIn by remember { mutableStateOf(true) }
    
    val dateFormatter = remember { SimpleDateFormat("dd/MM/yyyy", Locale.getDefault()) }
    
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Card(
            modifier = Modifier.fillMaxWidth(),
            elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Habitación ${room.roomNumber}",
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.Bold
                    )
                    
                    Surface(
                        color = MaterialTheme.colorScheme.primaryContainer,
                        shape = MaterialTheme.shapes.medium
                    ) {
                        Text(
                            text = room.type,
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                            style = MaterialTheme.typography.titleSmall
                        )
                    }
                }
                
                Spacer(modifier = Modifier.height(16.dp))
                
                Text(
                    text = "Descripción",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                Text(
                    text = room.description,
                    style = MaterialTheme.typography.bodyMedium
                )
                
                Spacer(modifier = Modifier.height(16.dp))
                
                Divider()
                
                Spacer(modifier = Modifier.height(16.dp))
                
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column {
                        Text(
                            text = "Capacidad",
                            style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Text(
                            text = "${room.capacity} persona${if (room.capacity > 1) "s" else ""}",
                            style = MaterialTheme.typography.titleMedium
                        )
                    }
                    
                    Column(horizontalAlignment = Alignment.End) {
                        Text(
                            text = "Precio por noche",
                            style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Text(
                            text = "$${room.pricePerNight}",
                            style = MaterialTheme.typography.titleMedium,
                            color = MaterialTheme.colorScheme.primary,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
                
                Spacer(modifier = Modifier.height(16.dp))
                
                Text(
                    text = "Comodidades",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                Text(
                    text = room.amenities,
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        }
        
        Spacer(modifier = Modifier.height(24.dp))
        
        Card(
            modifier = Modifier.fillMaxWidth(),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Seleccionar Fechas",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                
                Spacer(modifier = Modifier.height(16.dp))
                
                // Check-in
                OutlinedButton(
                    onClick = {
                        isSelectingCheckIn = true
                        showDatePicker = true
                    },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Icon(
                        imageVector = Icons.Default.DateRange,
                        contentDescription = null,
                        modifier = Modifier.padding(end = 8.dp)
                    )
                    Text(
                        text = checkInDate?.let { "Check-in: ${dateFormatter.format(Date(it))}" }
                            ?: "Seleccionar Check-in"
                    )
                }
                
                Spacer(modifier = Modifier.height(8.dp))
                
                // Check-out
                OutlinedButton(
                    onClick = {
                        isSelectingCheckIn = false
                        showDatePicker = true
                    },
                    modifier = Modifier.fillMaxWidth(),
                    enabled = checkInDate != null
                ) {
                    Icon(
                        imageVector = Icons.Default.DateRange,
                        contentDescription = null,
                        modifier = Modifier.padding(end = 8.dp)
                    )
                    Text(
                        text = checkOutDate?.let { "Check-out: ${dateFormatter.format(Date(it))}" }
                            ?: "Seleccionar Check-out"
                    )
                }
                
                if (checkInDate != null && checkOutDate != null) {
                    val nights = TimeUnit.MILLISECONDS.toDays(checkOutDate!! - checkInDate!!)
                    val totalPrice = nights * room.pricePerNight
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    Divider()
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = "$nights noche${if (nights > 1) "s" else ""}",
                            style = MaterialTheme.typography.bodyLarge
                        )
                        
                        Text(
                            text = "Total: $$totalPrice",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.primary
                        )
                    }
                }
            }
        }
        
        Spacer(modifier = Modifier.weight(1f))
        
        // Botón de Reserva
        Button(
            onClick = {
                if (checkInDate != null && checkOutDate != null) {
                    onBookClick(checkInDate!!, checkOutDate!!)
                }
            },
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp),
            enabled = !isLoading && checkInDate != null && checkOutDate != null
        ) {
            if (isLoading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(24.dp),
                    color = MaterialTheme.colorScheme.onPrimary
                )
            } else {
                Text(
                    text = if (currentUser != null) "Confirmar Reserva" else "Iniciar sesión para reservar",
                    style = MaterialTheme.typography.titleMedium
                )
            }
        }
    }
    
    // Date Picker Dialog (simulado con botones por simplicidad)
    if (showDatePicker) {
        DatePickerDialog(
            onDismiss = { showDatePicker = false },
            onDateSelected = { selectedDate ->
                if (isSelectingCheckIn) {
                    checkInDate = selectedDate
                    checkOutDate = null // Reset checkout cuando cambia check-in
                } else {
                    if (selectedDate > checkInDate!!) {
                        checkOutDate = selectedDate
                    }
                }
                showDatePicker = false
            },
            minDate = checkInDate ?: System.currentTimeMillis()
        )
    }
}

@Composable
fun DatePickerDialog(
    onDismiss: () -> Unit,
    onDateSelected: (Long) -> Unit,
    minDate: Long
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Seleccionar Fecha") },
        text = {
            Column {
                Text("Selecciona una fecha (simulación)")
                Spacer(modifier = Modifier.height(16.dp))
                
                // Opciones de fecha simuladas (en producción usar DatePicker real)
                val calendar = Calendar.getInstance()
                calendar.timeInMillis = minDate
                
                repeat(7) { index ->
                    val date = calendar.timeInMillis
                    TextButton(
                        onClick = { onDateSelected(date) },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(SimpleDateFormat("dd/MM/yyyy", Locale.getDefault()).format(Date(date)))
                    }
                    calendar.add(Calendar.DAY_OF_MONTH, 1)
                }
            }
        },
        confirmButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancelar")
            }
        }
    )
}
