package com.example.hostalgravity.ui.screens.roomdetail

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.hostalgravity.data.database.entities.RoomEntity
import com.example.hostalgravity.data.repository.HostalRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class RoomDetailUiState(
    val room: RoomEntity? = null,
    val checkInDate: Long = System.currentTimeMillis(),
    val checkOutDate: Long = System.currentTimeMillis() + 86400000L, // +1 day
    val isLoading: Boolean = true,
    val error: String? = null,
    val bookingSuccess: Boolean = false
)

class RoomDetailViewModel(
    private val repository: HostalRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(RoomDetailUiState())
    val uiState: StateFlow<RoomDetailUiState> = _uiState.asStateFlow()
    
    fun loadRoom(roomId: Long) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            val room = repository.getRoomById(roomId)
            _uiState.value = _uiState.value.copy(
                room = room,
                isLoading = false
            )
        }
    }
    
    fun updateCheckInDate(date: Long) {
        _uiState.value = _uiState.value.copy(checkInDate = date, error = null)
    }
    
    fun updateCheckOutDate(date: Long) {
        _uiState.value = _uiState.value.copy(checkOutDate = date, error = null)
    }
    
    fun createBooking(userId: Long) {
        val currentState = _uiState.value
        val room = currentState.room ?: return
        
        if (currentState.checkOutDate <= currentState.checkInDate) {
            _uiState.value = currentState.copy(error = "La fecha de salida debe ser posterior a la de entrada")
            return
        }
        
        viewModelScope.launch {
            _uiState.value = currentState.copy(isLoading = true, error = null)
            
            try {
                repository.createBooking(
                    userId = userId,
                    roomId = room.id,
                    checkInDate = currentState.checkInDate,
                    checkOutDate = currentState.checkOutDate
                )
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    bookingSuccess = true
                )
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = "Error al crear la reserva"
                )
            }
        }
    }
}
