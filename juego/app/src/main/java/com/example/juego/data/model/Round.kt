package com.example.rockpaperscissors.data.model

import com.example.juego.data.model.Choice

data class Round(
    val playerChoice: Choice,
    val aiChoice: Choice,
    val result: GameResult
)