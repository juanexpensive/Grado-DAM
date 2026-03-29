package com.example.hostalgravity.ui.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.example.hostalgravity.data.database.entities.UserEntity
import com.example.hostalgravity.di.ViewModelFactory
import com.example.hostalgravity.ui.screens.bookings.BookingsScreen
import com.example.hostalgravity.ui.screens.bookings.BookingsViewModel
import com.example.hostalgravity.ui.screens.login.LoginScreen
import com.example.hostalgravity.ui.screens.login.LoginViewModel
import com.example.hostalgravity.ui.screens.owner.OwnerDashboardScreen
import com.example.hostalgravity.ui.screens.owner.OwnerViewModel
import com.example.hostalgravity.ui.screens.register.RegisterScreen
import com.example.hostalgravity.ui.screens.register.RegisterViewModel
import com.example.hostalgravity.ui.screens.roomdetail.RoomDetailScreen
import com.example.hostalgravity.ui.screens.roomdetail.RoomDetailViewModel
import com.example.hostalgravity.ui.screens.roomlist.RoomListScreen
import com.example.hostalgravity.ui.screens.roomlist.RoomListViewModel

@Composable
fun NavGraph(
    navController: NavHostController,
    viewModelFactory: ViewModelFactory
) {
    var currentUser by remember { mutableStateOf<UserEntity?>(null) }
    
    NavHost(
        navController = navController,
        startDestination = Screen.RoomList.route
    ) {
        composable(Screen.RoomList.route) {
            val viewModel: RoomListViewModel = viewModel(factory = viewModelFactory)
            RoomListScreen(
                viewModel = viewModel,
                currentUser = currentUser,
                onRoomClick = { roomId ->
                    if (currentUser != null) {
                        navController.navigate(Screen.RoomDetail.createRoute(roomId))
                    } else {
                        navController.navigate(Screen.Login.createRoute(roomId))
                    }
                },
                onLoginClick = {
                    navController.navigate(Screen.Login.createRoute())
                },
                onBookingsClick = {
                    navController.navigate(Screen.Bookings.route)
                },
                onOwnerDashboardClick = {
                    navController.navigate(Screen.OwnerDashboard.route)
                },
                onLogout = {
                    currentUser = null
                }
            )
        }
        
        composable(
            route = Screen.RoomDetail.route,
            arguments = listOf(navArgument("roomId") { type = NavType.LongType })
        ) { backStackEntry ->
            val roomId = backStackEntry.arguments?.getLong("roomId") ?: return@composable
            val viewModel: RoomDetailViewModel = viewModel(factory = viewModelFactory)
            
            RoomDetailScreen(
                viewModel = viewModel,
                roomId = roomId,
                userId = currentUser?.id ?: 0,
                onBookingComplete = {
                    navController.navigate(Screen.Bookings.route) {
                        popUpTo(Screen.RoomList.route)
                    }
                },
                onBack = {
                    navController.popBackStack()
                }
            )
        }
        
        composable(
            route = Screen.Login.route,
            arguments = listOf(
                navArgument("roomId") {
                    type = NavType.StringType
                    nullable = true
                    defaultValue = null
                }
            )
        ) { backStackEntry ->
            val redirectRoomId = backStackEntry.arguments?.getString("roomId")?.toLongOrNull()
            val viewModel: LoginViewModel = viewModel(factory = viewModelFactory)
            
            LoginScreen(
                viewModel = viewModel,
                onLoginSuccess = { user ->
                    currentUser = user
                    if (user.isOwner) {
                        navController.navigate(Screen.OwnerDashboard.route) {
                            popUpTo(Screen.RoomList.route)
                        }
                    } else if (redirectRoomId != null) {
                        navController.navigate(Screen.RoomDetail.createRoute(redirectRoomId)) {
                            popUpTo(Screen.RoomList.route)
                        }
                    } else {
                        navController.popBackStack()
                    }
                },
                onRegisterClick = {
                    navController.navigate(Screen.Register.route)
                },
                onBack = {
                    navController.popBackStack()
                }
            )
        }
        
        composable(Screen.Register.route) {
            val viewModel: RegisterViewModel = viewModel(factory = viewModelFactory)
            
            RegisterScreen(
                viewModel = viewModel,
                onRegisterSuccess = {
                    navController.popBackStack()
                },
                onBack = {
                    navController.popBackStack()
                }
            )
        }
        
        composable(Screen.Bookings.route) {
            val viewModel: BookingsViewModel = viewModel(factory = viewModelFactory)
            
            BookingsScreen(
                viewModel = viewModel,
                userId = currentUser?.id ?: 0,
                onBack = {
                    navController.popBackStack()
                }
            )
        }
        
        composable(Screen.OwnerDashboard.route) {
            val viewModel: OwnerViewModel = viewModel(factory = viewModelFactory)
            
            OwnerDashboardScreen(
                viewModel = viewModel,
                onBack = {
                    navController.navigate(Screen.RoomList.route) {
                        popUpTo(0) { inclusive = true }
                    }
                    currentUser = null
                }
            )
        }
    }
}
