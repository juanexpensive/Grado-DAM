package com.example.hotelbookingapp.data.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import com.example.hotelbookingapp.data.dao.BookingDao
import com.example.hotelbookingapp.data.dao.RoomDao
import com.example.hotelbookingapp.data.dao.UserDao
import com.example.hotelbookingapp.data.entity.Booking
import com.example.hotelbookingapp.data.entity.User

/**
 * Clase principal de la base de datos ROOM
 * Define las entidades, versión y proporciona acceso a los DAOs
 */
@Database(
    entities = [
        User::class,
        com.example.hotelbookingapp.data.entity.Room::class,
        Booking::class
    ],
    version = 1,
    exportSchema = false
)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {
    
    // DAOs abstractos
    abstract fun userDao(): UserDao
    abstract fun roomDao(): RoomDao
    abstract fun bookingDao(): BookingDao
    
    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null
        
        /**
         * Obtiene la instancia de la base de datos (Singleton)
         * @param context Contexto de la aplicación
         * @return Instancia única de AppDatabase
         */
        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "hotel_booking_database"
                )
                    .fallbackToDestructiveMigration() // En producción usar migraciones adecuadas
                    .addCallback(object : RoomDatabase.Callback() {
                        override fun onCreate(db: androidx.sqlite.db.SupportSQLiteDatabase) {
                            super.onCreate(db)
                            // Aquí se pueden insertar datos iniciales si es necesario
                        }
                    })
                    .build()
                INSTANCE = instance
                instance
            }
        }
        
        /**
         * Limpia la instancia de la base de datos (útil para testing)
         */
        fun closeDatabase() {
            INSTANCE?.close()
            INSTANCE = null
        }
    }
}
