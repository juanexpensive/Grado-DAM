package com.example.hotelbookingapp.ui.navigation

/**
 * Sealed class que define todas las rutas de navegación de la app
 */
sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Login : Screen("login")
    object Register : Screen("register")
    object RoomDetail : Screen("room_detail/{roomId}") {
        fun createRoute(roomId: Long) = "room_detail/$roomId"
    }
    object Bookings : Screen("bookings")
}
