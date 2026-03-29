package com.example.rockpaperscissors.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "games")
data class GameEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val playerName: String,
    val totalRounds: Int,
    val playerWins: Int,
    val aiWins: Int,
    val draws: Int,
    val timestamp: Long
)
