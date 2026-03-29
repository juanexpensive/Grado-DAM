package com.example.hotelbookingapp.factory

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.hotelbookingapp.data.database.DatabaseProvider
import com.example.hotelbookingapp.data.repository.BookingRepository
import com.example.hotelbookingapp.data.repository.RoomRepository
import com.example.hotelbookingapp.data.repository.UserRepository
import com.example.hotelbookingapp.ui.viewmodel.BookingViewModel
import com.example.hotelbookingapp.ui.viewmodel.RoomViewModel
import com.example.hotelbookingapp.ui.viewmodel.UserViewModel

/**
 * Factory para crear ViewModels con sus dependencias
 * Implementa el patrón Factory para inyección de dependencias manual
 */
class ViewModelFactory(private val context: Context) : ViewModelProvider.Factory {
    
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return when {
            modelClass.isAssignableFrom(UserViewModel::class.java) -> {
                val userDao = DatabaseProvider.provideUserDao(context)
                val userRepository = UserRepository(userDao)
                UserViewModel(userRepository) as T
            }
            modelClass.isAssignableFrom(RoomViewModel::class.java) -> {
                val roomDao = DatabaseProvider.provideRoomDao(context)
                val roomRepository = RoomRepository(roomDao)
                RoomViewModel(roomRepository) as T
            }
            modelClass.isAssignableFrom(BookingViewModel::class.java) -> {
                val bookingDao = DatabaseProvider.provideBookingDao(context)
                val roomDao = DatabaseProvider.provideRoomDao(context)
                val bookingRepository = BookingRepository(bookingDao)
                val roomRepository = RoomRepository(roomDao)
                BookingViewModel(bookingRepository, roomRepository) as T
            }
            else -> throw IllegalArgumentException("Unknown ViewModel class: ${modelClass.name}")
        }
    }
}

/**
 * Extensión para obtener el Factory fácilmente desde cualquier Context
 */
fun Context.getViewModelFactory(): ViewModelFactory {
    return ViewModelFactory(this.applicationContext)
}
