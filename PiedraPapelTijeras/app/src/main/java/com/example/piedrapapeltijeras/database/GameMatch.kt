package com.example.piedrapapeltijeras.database

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.text.SimpleDateFormat
import java.util.*

@Entity(tableName = "game_matches")
data class GameMatch(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val playerName: String,
    val playerScore: Int,
    val aiScore: Int,
    val totalRounds: Int,
    val timestamp: Long = System.currentTimeMillis(),
    val isVictory: Boolean = playerScore > aiScore
) {
    fun getFormattedDate(): String {
        val sdf = SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault())
        return sdf.format(Date(timestamp))
    }

    fun getResultText(): String {
        return when {
            playerScore > aiScore -> "Victoria"
            playerScore < aiScore -> "Derrota"
            else -> "Empate"
        }
    }
}