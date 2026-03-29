package com.example.taskapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.room.Room
import com.example.taskapp.ui.theme.TaskAppTheme

class MainActivity : ComponentActivity() {
    companion object {
        lateinit var database: TaskDatabase
    }
    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        database = Room.databaseBuilder(
            applicationContext,
            TaskDatabase::class.java,
            "TaskDatabase").build()

        enableEdgeToEdge()
        setContent {
            TaskAppTheme {
                val navController = rememberNavController()
                val viewModel: TaskVM = viewModel()
                NavHost(
                    navController = navController,
                    startDestination = "Screen1"
                ) {
                    composable("Screen1") {
                        Screen1(navController = navController, viewModel = viewModel)
                    }
                }
                }
            }
        }
    }

