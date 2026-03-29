package com.example.hotelbookingapp.data.repository

import com.example.hotelbookingapp.data.dao.UserDao
import com.example.hotelbookingapp.data.entity.User
import kotlinx.coroutines.flow.Flow

/**
 * Repository para operaciones relacionadas con usuarios
 * Actúa como intermediario entre el ViewModel y el DAO
 */
class UserRepository(private val userDao: UserDao) {
    
    /**
     * Registra un nuevo usuario
     * @return ID del usuario insertado o null si el email ya existe
     */
    suspend fun registerUser(user: User): Long? {
        return if (!userDao.emailExists(user.email)) {
            userDao.insert(user)
        } else {
            null // Email ya existe
        }
    }
    
    /**
     * Intenta hacer login con email y password
     * @return Usuario si las credenciales son correctas, null en caso contrario
     */
    suspend fun login(email: String, password: String): User? {
        return userDao.login(email, password)
    }
    
    /**
     * Obtiene un usuario por su ID
     */
    suspend fun getUserById(userId: Long): User? {
        return userDao.getUserById(userId)
    }
    
    /**
     * Obtiene un usuario por su email
     */
    suspend fun getUserByEmail(email: String): User? {
        return userDao.getUserByEmail(email)
    }
    
    /**
     * Verifica si un email ya está registrado
     */
    suspend fun emailExists(email: String): Boolean {
        return userDao.emailExists(email)
    }
    
    /**
     * Obtiene todos los usuarios como Flow
     */
    fun getAllUsers(): Flow<List<User>> {
        return userDao.getAllUsers()
    }
    
    /**
     * Actualiza los datos de un usuario
     */
    suspend fun updateUser(user: User) {
        userDao.update(user)
    }
    
    /**
     * Elimina un usuario
     */
    suspend fun deleteUser(user: User) {
        userDao.delete(user)
    }
}
