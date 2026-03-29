package com.example.taskapp

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update

@Dao
interface TaskDao {
    @Query("SELECT * FROM task_entity")
    suspend fun getAllTasks(): List <TaskEntity>

    @Insert
    suspend fun addTask(taskEntity: TaskEntity): Long

    @Query ("SELECT * FROM task_entity where id like :id")
    suspend fun getTaskById(id:Long): TaskEntity

    @Update
    suspend fun updateTask(task: TaskEntity): Int

    @Delete
    suspend fun deleteTask(task: TaskEntity): Int
}


