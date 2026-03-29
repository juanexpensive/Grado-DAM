package com.example.hostalgravity.di

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.hostalgravity.data.repository.HostalRepository
import com.example.hostalgravity.ui.screens.bookings.BookingsViewModel
import com.example.hostalgravity.ui.screens.login.LoginViewModel
import com.example.hostalgravity.ui.screens.owner.OwnerViewModel
import com.example.hostalgravity.ui.screens.register.RegisterViewModel
import com.example.hostalgravity.ui.screens.roomdetail.RoomDetailViewModel
import com.example.hostalgravity.ui.screens.roomlist.RoomListViewModel

class ViewModelFactory(
    private val repository: HostalRepository
) : ViewModelProvider.Factory {
    
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return when {
            modelClass.isAssignableFrom(RoomListViewModel::class.java) -> {
                RoomListViewModel(repository) as T
            }
            modelClass.isAssignableFrom(RoomDetailViewModel::class.java) -> {
                RoomDetailViewModel(repository) as T
            }
            modelClass.isAssignableFrom(LoginViewModel::class.java) -> {
                LoginViewModel(repository) as T
            }
            modelClass.isAssignableFrom(RegisterViewModel::class.java) -> {
                RegisterViewModel(repository) as T
            }
            modelClass.isAssignableFrom(BookingsViewModel::class.java) -> {
                BookingsViewModel(repository) as T
            }
            modelClass.isAssignableFrom(OwnerViewModel::class.java) -> {
                OwnerViewModel(repository) as T
            }
            else -> throw IllegalArgumentException("Unknown ViewModel class: ${modelClass.name}")
        }
    }
}
