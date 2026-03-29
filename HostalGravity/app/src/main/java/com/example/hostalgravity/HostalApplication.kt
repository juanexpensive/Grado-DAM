package com.example.hostalgravity

import android.app.Application
import com.example.hostalgravity.di.AppContainer

class HostalApplication : Application() {
    
    lateinit var container: AppContainer
        private set
    
    override fun onCreate() {
        super.onCreate()
        container = AppContainer(this)
    }
}
