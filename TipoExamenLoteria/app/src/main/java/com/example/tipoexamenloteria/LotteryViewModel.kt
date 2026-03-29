package com.example.tipoexamenloteria

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import kotlin.random.Random

class LotteryViewModel : ViewModel() {
    // 1. Estado del Saldo
    var _balance = mutableIntStateOf(10)
    var balance: State<Int> = _balance

    // 2. Estado del Número Elegido por el Usuario
    private var _chosenNumber = mutableIntStateOf(0)
    var chosenNumber: State<Int> = _chosenNumber

    // 3. Estado de la Apuesta
    private var _currentBet = mutableIntStateOf(1)
    var currentBet: State<Int> = _currentBet

    // 4. Estado del Número Ganador
    private var _winningNumber = mutableIntStateOf(0)
    var winningNumber: State<Int> = _winningNumber

    // 5. Función para seleccionar el número
    fun selectNumber(number: Int) {
        _chosenNumber.intValue = number
        _currentBet.intValue = 1 // Reseteamos la apuesta al elegir un nuevo número
    }

    // 6. Función para actualizar la apuesta
    fun updateBet(bet: Int) {
        if (bet in 1.._balance.intValue) {
            _currentBet.intValue = bet
        } else if (bet > _balance.intValue) {
            _currentBet.intValue = _balance.intValue // Máximo
        } else {
            _currentBet.intValue = 1 // Mínimo
        }
    }

    // 7. Función principal para realizar el sorteo y actualizar el saldo
    fun performDraw() {
        // Genera un número ganador aleatorio entre 1 y 9
        var winner = Random.nextInt(1, 10)
        _winningNumber.intValue = winner

        if (_chosenNumber.intValue == winner) {
            // Acierto: se multiplica la apuesta por 2 y se suma al saldo
            val winAmount = _currentBet.intValue * 2
            _balance.intValue += winAmount
        } else {
            // Fallo: se resta lo apostado
            _balance.intValue -= _currentBet.intValue
        }
    }

    // 8. Función para resetear el juego (Botón "Salir")
    fun resetGame() {
        _balance.intValue = 10
        _chosenNumber.intValue = 0
        _currentBet.intValue = 1
    }
}