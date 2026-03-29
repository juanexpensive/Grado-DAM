package com.example.hostalgravity.ui.navigation

sealed class Screen(val route: String) {
    object RoomList : Screen("room_list")
    object RoomDetail : Screen("room_detail/{roomId}") {
        fun createRoute(roomId: Long) = "room_detail/$roomId"
    }
    object Login : Screen("login?redirectToRoom={roomId}") {
        fun createRoute(roomId: Long? = null) = if (roomId != null) "login?redirectToRoom=$roomId" else "login"
    }
    object Register : Screen("register")
    object Bookings : Screen("bookings")
    object OwnerDashboard : Screen("owner_dashboard")
}
