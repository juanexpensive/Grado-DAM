package com.example.hotelbookingapp.data.database

import android.content.Context

/**
 * Provider para la base de datos
 * Implementa el patrón Factory para proveer instancias de la base de datos
 */
object DatabaseProvider {
    
    @Volatile
    private var database: AppDatabase? = null
    
    /**
     * Obtiene o crea la instancia de la base de datos
     */
    fun provideDatabase(context: Context): AppDatabase {
        return database ?: synchronized(this) {
            val instance = AppDatabase.getDatabase(context)
            database = instance
            instance
        }
    }
    
    /**
     * Provee el UserDao
     */
    fun provideUserDao(context: Context) = provideDatabase(context).userDao()
    
    /**
     * Provee el RoomDao
     */
    fun provideRoomDao(context: Context) = provideDatabase(context).roomDao()
    
    /**
     * Provee el BookingDao
     */
    fun provideBookingDao(context: Context) = provideDatabase(context).bookingDao()
}
