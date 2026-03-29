package com.example.hostalgravity.ui.screens.owner

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.hostalgravity.data.database.entities.BookingEntity
import com.example.hostalgravity.data.database.entities.RoomEntity
import com.example.hostalgravity.data.database.entities.UserEntity
import com.example.hostalgravity.data.repository.HostalRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.launch

data class RoomWithBookingInfo(
    val room: RoomEntity,
    val activeBooking: BookingEntity?,
    val guestName: String?
)

data class OwnerUiState(
    val rooms: List<RoomWithBookingInfo> = emptyList(),
    val allBookings: List<BookingEntity> = emptyList(),
    val isLoading: Boolean = true,
    val showAddRoomDialog: Boolean = false,
    val newRoomNumber: String = "",
    val newRoomType: String = "Individual",
    val newRoomPrice: String = "",
    val newRoomDescription: String = "",
    val newRoomCapacity: String = "1"
)

class OwnerViewModel(
    private val repository: HostalRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(OwnerUiState())
    val uiState: StateFlow<OwnerUiState> = _uiState.asStateFlow()
    
    init {
        loadData()
    }
    
    private fun loadData() {
        viewModelScope.launch {
            combine(
                repository.getAllRooms(),
                repository.getAllBookings()
            ) { rooms, bookings ->
                Pair(rooms, bookings)
            }.collect { (rooms, bookings) ->
                val roomsWithInfo = rooms.map { room ->
                    val activeBooking = bookings.find { 
                        it.roomId == room.id && !it.isCancelled && !it.isCompleted 
                    }
                    val guestName = activeBooking?.let { booking ->
                        repository.getUserById(booking.userId)?.username
                    }
                    RoomWithBookingInfo(room, activeBooking, guestName)
                }
                
                _uiState.value = _uiState.value.copy(
                    rooms = roomsWithInfo,
                    allBookings = bookings,
                    isLoading = false
                )
            }
        }
    }
    
    fun freeRoom(roomId: Long) {
        viewModelScope.launch {
            val booking = repository.getActiveBookingForRoom(roomId)
            booking?.let {
                repository.completeBooking(it.id)
            }
        }
    }
    
    fun showAddRoomDialog() {
        _uiState.value = _uiState.value.copy(showAddRoomDialog = true)
    }
    
    fun hideAddRoomDialog() {
        _uiState.value = _uiState.value.copy(
            showAddRoomDialog = false,
            newRoomNumber = "",
            newRoomType = "Individual",
            newRoomPrice = "",
            newRoomDescription = "",
            newRoomCapacity = "1"
        )
    }
    
    fun updateNewRoomNumber(value: String) {
        _uiState.value = _uiState.value.copy(newRoomNumber = value)
    }
    
    fun updateNewRoomType(value: String) {
        _uiState.value = _uiState.value.copy(newRoomType = value)
    }
    
    fun updateNewRoomPrice(value: String) {
        _uiState.value = _uiState.value.copy(newRoomPrice = value)
    }
    
    fun updateNewRoomDescription(value: String) {
        _uiState.value = _uiState.value.copy(newRoomDescription = value)
    }
    
    fun updateNewRoomCapacity(value: String) {
        _uiState.value = _uiState.value.copy(newRoomCapacity = value)
    }
    
    fun addRoom() {
        val state = _uiState.value
        val price = state.newRoomPrice.toDoubleOrNull() ?: return
        val capacity = state.newRoomCapacity.toIntOrNull() ?: return
        
        if (state.newRoomNumber.isBlank() || state.newRoomDescription.isBlank()) return
        
        viewModelScope.launch {
            repository.addRoom(
                RoomEntity(
                    roomNumber = state.newRoomNumber,
                    roomType = state.newRoomType,
                    pricePerNight = price,
                    description = state.newRoomDescription,
                    capacity = capacity,
                    isAvailable = true
                )
            )
            hideAddRoomDialog()
        }
    }
}
