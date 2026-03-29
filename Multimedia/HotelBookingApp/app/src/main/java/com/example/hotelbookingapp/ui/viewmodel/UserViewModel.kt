package com.example.hotelbookingapp.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.hotelbookingapp.data.entity.User
import com.example.hotelbookingapp.data.repository.UserRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * ViewModel para gestionar la lógica de usuarios (Login/Registro)
 */
class UserViewModel(private val repository: UserRepository) : ViewModel() {
    
    // Estado de autenticación
    private val _currentUser = MutableStateFlow<User?>(null)
    val currentUser: StateFlow<User?> = _currentUser.asStateFlow()
    
    // Estado de carga
    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()
    
    // Estado de error
    private val _errorMessage = MutableStateFlow<String?>(null)
    val errorMessage: StateFlow<String?> = _errorMessage.asStateFlow()
    
    /**
     * Registra un nuevo usuario
     */
    fun register(name: String, email: String, password: String, onSuccess: () -> Unit) {
        viewModelScope.launch {
            _isLoading.value = true
            _errorMessage.value = null
            
            try {
                // Validaciones
                if (name.isBlank() || email.isBlank() || password.isBlank()) {
                    _errorMessage.value = "Todos los campos son obligatorios"
                    return@launch
                }
                
                if (!isValidEmail(email)) {
                    _errorMessage.value = "Email inválido"
                    return@launch
                }
                
                if (password.length < 6) {
                    _errorMessage.value = "La contraseña debe tener al menos 6 caracteres"
                    return@launch
                }
                
                // Verificar si el email ya existe
                if (repository.emailExists(email)) {
                    _errorMessage.value = "El email ya está registrado"
                    return@launch
                }
                
                // Crear usuario
                val user = User(
                    name = name,
                    email = email,
                    password = password
                )
                
                val userId = repository.registerUser(user)
                if (userId != null) {
                    _currentUser.value = user.copy(id = userId)
                    onSuccess()
                } else {
                    _errorMessage.value = "Error al registrar usuario"
                }
            } catch (e: Exception) {
                _errorMessage.value = "Error: ${e.message}"
            } finally {
                _isLoading.value = false
            }
        }
    }
    
    /**
     * Inicia sesión con email y password
     */
    fun login(email: String, password: String, onSuccess: () -> Unit) {
        viewModelScope.launch {
            _isLoading.value = true
            _errorMessage.value = null
            
            try {
                // Validaciones
                if (email.isBlank() || password.isBlank()) {
                    _errorMessage.value = "Email y contraseña son obligatorios"
                    return@launch
                }
                
                // Intentar login
                val user = repository.login(email, password)
                if (user != null) {
                    _currentUser.value = user
                    onSuccess()
                } else {
                    _errorMessage.value = "Credenciales incorrectas"
                }
            } catch (e: Exception) {
                _errorMessage.value = "Error: ${e.message}"
            } finally {
                _isLoading.value = false
            }
        }
    }
    
    /**
     * Cierra la sesión del usuario actual
     */
    fun logout() {
        _currentUser.value = null
        _errorMessage.value = null
    }
    
    /**
     * Limpia el mensaje de error
     */
    fun clearError() {
        _errorMessage.value = null
    }
    
    /**
     * Verifica si el usuario está autenticado
     */
    fun isAuthenticated(): Boolean {
        return _currentUser.value != null
    }
    
    /**
     * Obtiene el ID del usuario actual
     */
    fun getCurrentUserId(): Long? {
        return _currentUser.value?.id
    }
    
    /**
     * Valida formato de email
     */
    private fun isValidEmail(email: String): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }
}
