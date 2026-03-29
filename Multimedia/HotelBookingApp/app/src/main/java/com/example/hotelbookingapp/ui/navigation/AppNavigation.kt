package com.example.hotelbookingapp.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.example.hotelbookingapp.ui.screen.BookingsScreen
import com.example.hotelbookingapp.ui.screen.HomeScreen
import com.example.hotelbookingapp.ui.screen.LoginScreen
import com.example.hotelbookingapp.ui.screen.RegisterScreen
import com.example.hotelbookingapp.ui.screen.RoomDetailScreen
import com.example.hotelbookingapp.ui.viewmodel.BookingViewModel
import com.example.hotelbookingapp.ui.viewmodel.RoomViewModel
import com.example.hotelbookingapp.ui.viewmodel.UserViewModel

/**
 * Navigation Graph principal de la aplicación
 */
@Composable
fun AppNavigation(
    navController: NavHostController,
    userViewModel: UserViewModel,
    roomViewModel: RoomViewModel,
    bookingViewModel: BookingViewModel
) {
    NavHost(
        navController = navController,
        startDestination = Screen.Home.route
    ) {
        // Pantalla principal con lista de habitaciones
        composable(Screen.Home.route) {
            HomeScreen(
                navController = navController,
                userViewModel = userViewModel,
                roomViewModel = roomViewModel
            )
        }
        
        // Pantalla de login
        composable(Screen.Login.route) {
            LoginScreen(
                navController = navController,
                userViewModel = userViewModel
            )
        }
        
        // Pantalla de registro
        composable(Screen.Register.route) {
            RegisterScreen(
                navController = navController,
                userViewModel = userViewModel
            )
        }
        
        // Pantalla de detalle de habitación
        composable(
            route = Screen.RoomDetail.route,
            arguments = listOf(
                navArgument("roomId") {
                    type = NavType.LongType
                }
            )
        ) { backStackEntry ->
            val roomId = backStackEntry.arguments?.getLong("roomId") ?: 0L
            RoomDetailScreen(
                roomId = roomId,
                navController = navController,
                userViewModel = userViewModel,
                roomViewModel = roomViewModel,
                bookingViewModel = bookingViewModel
            )
        }
        
        // Pantalla de reservas del usuario
        composable(Screen.Bookings.route) {
            BookingsScreen(
                navController = navController,
                userViewModel = userViewModel,
                bookingViewModel = bookingViewModel
            )
        }
    }
}
