package com.example.hostalgravity.ui.screens.login

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.hostalgravity.data.database.entities.UserEntity
import com.example.hostalgravity.data.repository.HostalRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class LoginUiState(
    val username: String = "",
    val password: String = "",
    val isLoading: Boolean = false,
    val error: String? = null,
    val loginSuccess: UserEntity? = null
)

class LoginViewModel(
    private val repository: HostalRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(LoginUiState())
    val uiState: StateFlow<LoginUiState> = _uiState.asStateFlow()
    
    fun updateUsername(username: String) {
        _uiState.value = _uiState.value.copy(username = username, error = null)
    }
    
    fun updatePassword(password: String) {
        _uiState.value = _uiState.value.copy(password = password, error = null)
    }
    
    fun login() {
        val currentState = _uiState.value
        
        if (currentState.username.isBlank() || currentState.password.isBlank()) {
            _uiState.value = currentState.copy(error = "Usuario y contraseña son obligatorios")
            return
        }
        
        viewModelScope.launch {
            _uiState.value = currentState.copy(isLoading = true, error = null)
            
            val user = repository.login(currentState.username, currentState.password)
            
            if (user != null) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    loginSuccess = user
                )
            } else {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = "Usuario o contraseña incorrectos"
                )
            }
        }
    }
    
    fun resetLoginSuccess() {
        _uiState.value = _uiState.value.copy(loginSuccess = null)
    }
}
