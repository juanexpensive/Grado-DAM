package com.example.juego.data.model
enum class Choice {
    ROCK, PAPER, SCISSORS;

    fun beats(other: Choice): Boolean {
        return when (this) {
            ROCK -> other == SCISSORS
            PAPER -> other == ROCK
            SCISSORS -> other == PAPER
        }
    }
}