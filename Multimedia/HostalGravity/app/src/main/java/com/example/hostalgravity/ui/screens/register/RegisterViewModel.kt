package com.example.hostalgravity.ui.screens.register

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.hostalgravity.data.repository.HostalRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class RegisterUiState(
    val username: String = "",
    val password: String = "",
    val confirmPassword: String = "",
    val isLoading: Boolean = false,
    val error: String? = null,
    val registerSuccess: Boolean = false
)

class RegisterViewModel(
    private val repository: HostalRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(RegisterUiState())
    val uiState: StateFlow<RegisterUiState> = _uiState.asStateFlow()
    
    fun updateUsername(username: String) {
        _uiState.value = _uiState.value.copy(username = username, error = null)
    }
    
    fun updatePassword(password: String) {
        _uiState.value = _uiState.value.copy(password = password, error = null)
    }
    
    fun updateConfirmPassword(confirmPassword: String) {
        _uiState.value = _uiState.value.copy(confirmPassword = confirmPassword, error = null)
    }
    
    fun register() {
        val currentState = _uiState.value
        
        if (currentState.username.isBlank() || currentState.password.isBlank()) {
            _uiState.value = currentState.copy(error = "Todos los campos son obligatorios")
            return
        }
        
        if (currentState.password != currentState.confirmPassword) {
            _uiState.value = currentState.copy(error = "Las contraseñas no coinciden")
            return
        }
        
        if (currentState.password.length < 4) {
            _uiState.value = currentState.copy(error = "La contraseña debe tener al menos 4 caracteres")
            return
        }
        
        viewModelScope.launch {
            _uiState.value = currentState.copy(isLoading = true, error = null)
            
            val result = repository.register(currentState.username, currentState.password)
            
            result.fold(
                onSuccess = {
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        registerSuccess = true
                    )
                },
                onFailure = { exception ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = exception.message ?: "Error al registrar"
                    )
                }
            )
        }
    }
}
