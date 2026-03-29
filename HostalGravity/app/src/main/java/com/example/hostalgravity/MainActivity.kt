package com.example.hostalgravity

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.navigation.compose.rememberNavController
import com.example.hostalgravity.di.ViewModelFactory
import com.example.hostalgravity.ui.navigation.NavGraph
import com.example.hostalgravity.ui.theme.HostalGravityTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        
        val app = application as HostalApplication
        val viewModelFactory = ViewModelFactory(app.container.repository)
        
        setContent {
            HostalGravityTheme {
                val navController = rememberNavController()
                NavGraph(
                    navController = navController,
                    viewModelFactory = viewModelFactory
                )
            }
        }
    }
}