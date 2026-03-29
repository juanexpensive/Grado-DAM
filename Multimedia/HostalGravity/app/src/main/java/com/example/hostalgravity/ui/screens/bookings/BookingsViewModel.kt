package com.example.hostalgravity.ui.screens.bookings

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.hostalgravity.data.database.entities.BookingEntity
import com.example.hostalgravity.data.database.entities.RoomEntity
import com.example.hostalgravity.data.repository.HostalRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class BookingWithRoom(
    val booking: BookingEntity,
    val room: RoomEntity?
)

data class BookingsUiState(
    val bookings: List<BookingWithRoom> = emptyList(),
    val isLoading: Boolean = true
)

class BookingsViewModel(
    private val repository: HostalRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(BookingsUiState())
    val uiState: StateFlow<BookingsUiState> = _uiState.asStateFlow()
    
    fun loadBookings(userId: Long) {
        viewModelScope.launch {
            repository.getBookingsByUserId(userId).collect { bookings ->
                val bookingsWithRooms = bookings.map { booking ->
                    val room = repository.getRoomById(booking.roomId)
                    BookingWithRoom(booking, room)
                }
                _uiState.value = BookingsUiState(
                    bookings = bookingsWithRooms,
                    isLoading = false
                )
            }
        }
    }
    
    fun cancelBooking(bookingId: Long) {
        viewModelScope.launch {
            repository.cancelBooking(bookingId)
        }
    }
}
