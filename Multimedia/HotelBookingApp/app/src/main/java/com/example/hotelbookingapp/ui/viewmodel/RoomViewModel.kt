package com.example.hotelbookingapp.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.hotelbookingapp.data.entity.Room
import com.example.hotelbookingapp.data.repository.RoomRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * ViewModel para gestionar las habitaciones
 */
class RoomViewModel(private val repository: RoomRepository) : ViewModel() {
    
    // Lista de habitaciones disponibles
    private val _availableRooms = MutableStateFlow<List<Room>>(emptyList())
    val availableRooms: StateFlow<List<Room>> = _availableRooms.asStateFlow()
    
    // Habitación seleccionada
    private val _selectedRoom = MutableStateFlow<Room?>(null)
    val selectedRoom: StateFlow<Room?> = _selectedRoom.asStateFlow()
    
    // Estado de carga
    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()
    
    init {
        loadAvailableRooms()
        initializeSampleData()
    }
    
    /**
     * Carga las habitaciones disponibles
     */
    private fun loadAvailableRooms() {
        viewModelScope.launch {
            repository.getAvailableRooms().collect { rooms ->
                _availableRooms.value = rooms
            }
        }
    }
    
    /**
     * Selecciona una habitación para ver detalles
     */
    fun selectRoom(room: Room) {
        _selectedRoom.value = room
    }
    
    /**
     * Limpia la selección de habitación
     */
    fun clearSelectedRoom() {
        _selectedRoom.value = null
    }
    
    /**
     * Obtiene una habitación por su ID
     */
    fun getRoomById(roomId: Long, onResult: (Room?) -> Unit) {
        viewModelScope.launch {
            val room = repository.getRoomById(roomId)
            onResult(room)
        }
    }
    
    /**
     * Actualiza la disponibilidad de una habitación
     */
    fun updateRoomAvailability(roomId: Long, isAvailable: Boolean) {
        viewModelScope.launch {
            repository.updateRoomAvailability(roomId, isAvailable)
        }
    }
    
    /**
     * Inicializa datos de ejemplo (solo para desarrollo/testing)
     */
    private fun initializeSampleData() {
        viewModelScope.launch {
            val count = repository.getAvailableRoomsCount()
            if (count == 0) {
                val sampleRooms = listOf(
                    Room(
                        roomNumber = "101",
                        type = "Individual",
                        description = "Habitación individual con cama queen size, baño privado y vista a la ciudad.",
                        pricePerNight = 75.0,
                        capacity = 1,
                        amenities = "WiFi, TV, Aire Acondicionado, Minibar",
                        isAvailable = true
                    ),
                    Room(
                        roomNumber = "201",
                        type = "Doble",
                        description = "Habitación doble con dos camas matrimoniales, baño privado y balcón.",
                        pricePerNight = 120.0,
                        capacity = 2,
                        amenities = "WiFi, TV, Aire Acondicionado, Minibar, Balcón",
                        isAvailable = true
                    ),
                    Room(
                        roomNumber = "301",
                        type = "Suite",
                        description = "Suite de lujo con sala de estar, dormitorio separado, jacuzzi y vista panorámica.",
                        pricePerNight = 250.0,
                        capacity = 3,
                        amenities = "WiFi, TV 4K, Aire Acondicionado, Minibar, Jacuzzi, Vista Panorámica",
                        isAvailable = true
                    ),
                    Room(
                        roomNumber = "102",
                        type = "Individual",
                        description = "Habitación individual estándar con todas las comodidades básicas.",
                        pricePerNight = 65.0,
                        capacity = 1,
                        amenities = "WiFi, TV, Aire Acondicionado",
                        isAvailable = true
                    ),
                    Room(
                        roomNumber = "202",
                        type = "Doble Deluxe",
                        description = "Habitación doble deluxe con cama king size y baño de mármol.",
                        pricePerNight = 150.0,
                        capacity = 2,
                        amenities = "WiFi, TV, Aire Acondicionado, Minibar, Bañera de Hidromasaje",
                        isAvailable = true
                    )
                )
                repository.insertRooms(sampleRooms)
            }
        }
    }
}
