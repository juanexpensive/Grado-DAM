package com.example.piedrapapeltijerasroom2.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "game_history")
data class GameEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val playerName: String,
    val playerScore: Int,
    val aiScore: Int,
    val resultMessage: String,
    val timestamp: Long = System.currentTimeMillis()
)