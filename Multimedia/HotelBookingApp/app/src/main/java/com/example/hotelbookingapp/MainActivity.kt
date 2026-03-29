package com.example.hotelbookingapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.example.hotelbookingapp.factory.getViewModelFactory
import com.example.hotelbookingapp.ui.navigation.AppNavigation
import com.example.hotelbookingapp.ui.theme.HotelBookingAppTheme
import com.example.hotelbookingapp.ui.viewmodel.BookingViewModel
import com.example.hotelbookingapp.ui.viewmodel.RoomViewModel
import com.example.hotelbookingapp.ui.viewmodel.UserViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            HotelBookingAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    HotelBookingApp()
                }
            }
        }
    }
}

@Composable
fun HotelBookingApp() {
    val navController = rememberNavController()

    // Obtener Context dentro del Composable
    val context = LocalContext.current
    val factory = context.getViewModelFactory()

    // ViewModels con Factory
    val userViewModel: UserViewModel = viewModel(factory = factory)
    val roomViewModel: RoomViewModel = viewModel(factory = factory)
    val bookingViewModel: BookingViewModel = viewModel(factory = factory)

    AppNavigation(
        navController = navController,
        userViewModel = userViewModel,
        roomViewModel = roomViewModel,
        bookingViewModel = bookingViewModel
    )
}
