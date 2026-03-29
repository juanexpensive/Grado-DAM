package com.example.hostalgravity.ui.screens.roomlist

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.hostalgravity.data.database.entities.RoomEntity
import com.example.hostalgravity.data.repository.HostalRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class RoomListUiState(
    val rooms: List<RoomEntity> = emptyList(),
    val isLoading: Boolean = true
)

class RoomListViewModel(
    private val repository: HostalRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(RoomListUiState())
    val uiState: StateFlow<RoomListUiState> = _uiState.asStateFlow()
    
    init {
        loadRooms()
    }
    
    private fun loadRooms() {
        viewModelScope.launch {
            repository.getAvailableRooms().collect { rooms ->
                _uiState.value = RoomListUiState(
                    rooms = rooms,
                    isLoading = false
                )
            }
        }
    }
}
