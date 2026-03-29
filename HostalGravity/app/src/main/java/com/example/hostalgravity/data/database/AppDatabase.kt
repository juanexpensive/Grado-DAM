package com.example.hostalgravity.data.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.sqlite.db.SupportSQLiteDatabase
import com.example.hostalgravity.data.database.dao.BookingDao
import com.example.hostalgravity.data.database.dao.RoomDao
import com.example.hostalgravity.data.database.dao.UserDao
import com.example.hostalgravity.data.database.entities.BookingEntity
import com.example.hostalgravity.data.database.entities.RoomEntity
import com.example.hostalgravity.data.database.entities.UserEntity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Database(
    entities = [UserEntity::class, RoomEntity::class, BookingEntity::class],
    version = 1,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {
    
    abstract fun userDao(): UserDao
    abstract fun roomDao(): RoomDao
    abstract fun bookingDao(): BookingDao
    
    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null
        
        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "hostal_database"
                )
                    .addCallback(DatabaseCallback())
                    .build()
                INSTANCE = instance
                instance
            }
        }
    }
    
    private class DatabaseCallback : Callback() {
        override fun onCreate(db: SupportSQLiteDatabase) {
            super.onCreate(db)
            INSTANCE?.let { database ->
                CoroutineScope(Dispatchers.IO).launch {
                    populateDatabase(database)
                }
            }
        }
        
        private suspend fun populateDatabase(database: AppDatabase) {
            // Insert owner user
            database.userDao().insertUser(
                UserEntity(
                    username = "admin",
                    password = "admin",
                    isOwner = true
                )
            )
            
            // Insert initial rooms
            val rooms = listOf(
                RoomEntity(
                    roomNumber = "101",
                    roomType = "Individual",
                    pricePerNight = 45.0,
                    description = "Habitación individual acogedora con cama individual, baño privado y WiFi gratuito.",
                    capacity = 1,
                    isAvailable = true
                ),
                RoomEntity(
                    roomNumber = "102",
                    roomType = "Individual",
                    pricePerNight = 45.0,
                    description = "Habitación individual con vistas al jardín, cama individual y escritorio.",
                    capacity = 1,
                    isAvailable = true
                ),
                RoomEntity(
                    roomNumber = "201",
                    roomType = "Doble",
                    pricePerNight = 75.0,
                    description = "Habitación doble con cama de matrimonio, baño completo y balcón.",
                    capacity = 2,
                    isAvailable = true
                ),
                RoomEntity(
                    roomNumber = "202",
                    roomType = "Doble",
                    pricePerNight = 80.0,
                    description = "Habitación doble superior con dos camas individuales y minibar.",
                    capacity = 2,
                    isAvailable = true
                ),
                RoomEntity(
                    roomNumber = "301",
                    roomType = "Suite",
                    pricePerNight = 120.0,
                    description = "Suite de lujo con salón independiente, jacuzzi y vistas panorámicas.",
                    capacity = 4,
                    isAvailable = true
                )
            )
            
            rooms.forEach { room ->
                database.roomDao().insertRoom(room)
            }
        }
    }
}
