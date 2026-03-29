package com.example.taskapp

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class TaskVM : ViewModel() {

    // Estado observable de la lista de tareas
    private val _tasks = MutableStateFlow<List<TaskEntity>>(emptyList())
    val tasks: StateFlow<List<TaskEntity>> = _tasks

    init {
        // Cargar las tareas al inicializar el ViewModel
        loadTasks()
    }

    /** Carga todas las tareas de la base de datos */
    fun loadTasks() {
        viewModelScope.launch {
            try {
                _tasks.value = MainActivity.database.taskDao().getAllTasks()
            } catch (e: Exception) {
                // Manejar errores de base de datos
                e.printStackTrace()
            }
        }
    }

    /** Agrega una nueva tarea a la base de datos */
    fun addTask(name: String) {
        if (name.isBlank()) return

        val newTask = TaskEntity(name = name.trim(), isDone = false)
        viewModelScope.launch {
            try {
                // Inserta en la DB y luego recarga la lista para actualizar la UI
                MainActivity.database.taskDao().addTask(newTask)
                loadTasks()
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    /** Alterna el estado de completado (isDone) de una tarea */
    fun toggleTaskCompletion(task: TaskEntity) {
        // Crea una copia con el estado de isDone invertido
        val updatedTask = task.copy(isDone = !task.isDone)
        viewModelScope.launch {
            try {
                // Actualiza en la DB y luego recarga la lista
       //         MainActivity.database.taskDao().updateTask(updatedTask)
                MainActivity.database.taskDao().deleteTask(updatedTask)
                loadTasks()
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}