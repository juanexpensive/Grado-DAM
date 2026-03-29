package com.example.taskapp

import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import kotlinx.coroutines.launch


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun textandbutton (navController: NavController, viewModel: TaskVM) {
    var valueInput by remember { mutableStateOf("") }
    // Ya no necesitas `lista` o el primer `LaunchedEffect` aquí,
    // ya que el ViewModel se encarga de gestionar el estado.
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        OutlinedTextField(
            value = valueInput,
            onValueChange = { valueInput = it },
            label = { Text("Nueva Tarea") },
            singleLine = true,
            modifier = Modifier.weight(1f) // Ocupa el espacio restante
        )
        Spacer(modifier = Modifier.width(8.dp))
        Button(
            // Al hacer clic, llama a la función del VM y limpia el input
            onClick = {
                viewModel.addTask(valueInput)
                valueInput = ""
            },
            enabled = valueInput.isNotBlank(), // Habilitar solo si hay texto
            modifier = Modifier.size(56.dp)
        ) {
            Text( text = "+",fontSize = 32.sp)
        }
    }
}


@Composable
fun taskcolumn (navController: NavController, viewModel: TaskVM) {
    // Recoge el StateFlow de tareas del ViewModel como un State de Compose
    val tasks by viewModel.tasks.collectAsState()

    if (tasks.isEmpty()) {
        Text(
            text = "¡No hay tareas pendientes! Añade una.",
            modifier = Modifier.padding(16.dp)
        )
        return
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 8.dp)
    ) {
        items(tasks) { task ->
            TaskItemRow(task = task, viewModel = viewModel)
            HorizontalDivider()
        }
    }
}

// Composable auxiliar para cada fila de tarea
@Composable
fun TaskItemRow(task: TaskEntity, viewModel: TaskVM) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Checkbox(
            checked = task.isDone,
            onCheckedChange = {
                viewModel.toggleTaskCompletion(task) // Llama al VM para actualizar
            },
            modifier = Modifier.padding(end = 8.dp)
        )
        Text(
            text = task.name,
            style = MaterialTheme.typography.bodyLarge,
            color = if (task.isDone)
                Color.Red
            else
                Color.Black
        )
    }
}

@Composable
fun Screen1 (navController: NavController, viewModel: TaskVM) {
    Column {
        textandbutton(navController = navController, viewModel = viewModel)
        taskcolumn(navController = navController, viewModel = viewModel)
    }
}