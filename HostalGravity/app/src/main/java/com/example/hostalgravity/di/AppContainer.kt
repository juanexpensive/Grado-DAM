package com.example.hostalgravity.di

import android.content.Context
import com.example.hostalgravity.data.database.AppDatabase
import com.example.hostalgravity.data.repository.HostalRepository

class AppContainer(context: Context) {
    
    private val database = AppDatabase.getDatabase(context)
    
    val repository: HostalRepository by lazy {
        HostalRepository(
            userDao = database.userDao(),
            roomDao = database.roomDao(),
            bookingDao = database.bookingDao()
        )
    }
}
