package com.example.hotelbookingapp.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.hotelbookingapp.data.entity.Booking
import com.example.hotelbookingapp.data.entity.BookingStatus
import com.example.hotelbookingapp.data.entity.BookingWithDetails
import com.example.hotelbookingapp.data.repository.BookingRepository
import com.example.hotelbookingapp.data.repository.RoomRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.util.concurrent.TimeUnit

/**
 * ViewModel para gestionar las reservas
 */
class BookingViewModel(
    private val bookingRepository: BookingRepository,
    private val roomRepository: RoomRepository
) : ViewModel() {
    
    // Lista de reservas del usuario con detalles
    private val _userBookings = MutableStateFlow<List<BookingWithDetails>>(emptyList())
    val userBookings: StateFlow<List<BookingWithDetails>> = _userBookings.asStateFlow()
    
    // Estado de carga
    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()
    
    // Mensaje de éxito
    private val _successMessage = MutableStateFlow<String?>(null)
    val successMessage: StateFlow<String?> = _successMessage.asStateFlow()
    
    // Mensaje de error
    private val _errorMessage = MutableStateFlow<String?>(null)
    val errorMessage: StateFlow<String?> = _errorMessage.asStateFlow()
    
    /**
     * Carga las reservas de un usuario
     */
    fun loadUserBookings(userId: Long) {
        viewModelScope.launch {
            bookingRepository.getBookingsWithDetailsByUser(userId).collect { bookings ->
                // Actualizar estados de reservas según fechas
                bookings.forEach { bookingWithDetails ->
                    val currentTime = System.currentTimeMillis()
                    if (bookingWithDetails.booking.status == BookingStatus.ACTIVE &&
                        bookingWithDetails.booking.checkOutDate < currentTime) {
                        bookingRepository.completeBooking(bookingWithDetails.booking.id)
                    }
                }
                _userBookings.value = bookings
            }
        }
    }
    
    /**
     * Crea una nueva reserva
     */
    fun createBooking(
        userId: Long,
        roomId: Long,
        checkInDate: Long,
        checkOutDate: Long,
        onSuccess: () -> Unit
    ) {
        viewModelScope.launch {
            _isLoading.value = true
            _errorMessage.value = null
            
            try {
                // Validaciones
                if (checkInDate >= checkOutDate) {
                    _errorMessage.value = "La fecha de salida debe ser posterior a la de entrada"
                    return@launch
                }
                
                val currentTime = System.currentTimeMillis()
                if (checkInDate < currentTime) {
                    _errorMessage.value = "No puedes reservar fechas pasadas"
                    return@launch
                }
                
                // Verificar disponibilidad
                val isAvailable = bookingRepository.isRoomAvailable(roomId, checkInDate, checkOutDate)
                if (!isAvailable) {
                    _errorMessage.value = "La habitación no está disponible en esas fechas"
                    return@launch
                }
                
                // Obtener habitación para calcular precio
                val room = roomRepository.getRoomById(roomId)
                if (room == null) {
                    _errorMessage.value = "Habitación no encontrada"
                    return@launch
                }
                
                // Calcular número de noches y precio total
                val nights = TimeUnit.MILLISECONDS.toDays(checkOutDate - checkInDate)
                val totalPrice = nights * room.pricePerNight
                
                // Crear reserva
                val booking = Booking(
                    userId = userId,
                    roomId = roomId,
                    checkInDate = checkInDate,
                    checkOutDate = checkOutDate,
                    totalPrice = totalPrice,
                    status = BookingStatus.ACTIVE
                )
                
                bookingRepository.createBooking(booking)
                _successMessage.value = "Reserva creada exitosamente"
                onSuccess()
                
            } catch (e: Exception) {
                _errorMessage.value = "Error al crear reserva: ${e.message}"
            } finally {
                _isLoading.value = false
            }
        }
    }
    
    /**
     * Cancela una reserva
     */
    fun cancelBooking(bookingId: Long, checkInDate: Long) {
        viewModelScope.launch {
            _isLoading.value = true
            _errorMessage.value = null
            
            try {
                // Verificar que la reserva no haya comenzado
                val currentTime = System.currentTimeMillis()
                if (checkInDate < currentTime) {
                    _errorMessage.value = "No puedes cancelar una reserva que ya comenzó o finalizó"
                    return@launch
                }
                
                bookingRepository.cancelBooking(bookingId)
                _successMessage.value = "Reserva cancelada exitosamente"
                
            } catch (e: Exception) {
                _errorMessage.value = "Error al cancelar reserva: ${e.message}"
            } finally {
                _isLoading.value = false
            }
        }
    }
    
    /**
     * Limpia los mensajes de éxito y error
     */
    fun clearMessages() {
        _successMessage.value = null
        _errorMessage.value = null
    }
    
    /**
     * Verifica si una reserva puede ser cancelada
     */
    fun canCancelBooking(booking: Booking): Boolean {
        val currentTime = System.currentTimeMillis()
        return booking.status == BookingStatus.ACTIVE && booking.checkInDate > currentTime
    }
    
    /**
     * Obtiene el número de noches de una reserva
     */
    fun getNumberOfNights(checkInDate: Long, checkOutDate: Long): Long {
        return TimeUnit.MILLISECONDS.toDays(checkOutDate - checkInDate)
    }
}
