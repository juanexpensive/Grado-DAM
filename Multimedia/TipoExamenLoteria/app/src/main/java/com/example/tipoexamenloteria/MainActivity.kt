package com.example.tipoexamenloteria

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.tipoexamenloteria.ui.theme.TipoExamenLoteriaTheme

// Definición de las rutas de navegación
sealed class Screen(val route: String) {
    object Choice : Screen("choice_screen")
    object Bet : Screen("bet_screen")
    object Result : Screen("result_screen")
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            TipoExamenLoteriaTheme {
                val navController = rememberNavController()
                val viewModel: LotteryViewModel = viewModel() // Inicializa el ViewModel

                NavHost(
                    navController = navController,
                    startDestination = Screen.Choice.route
                ) {
                    composable(Screen.Choice.route) {
                        ChoiceScreen(navController, viewModel)
                    }
                    composable(Screen.Bet.route) {
                        BetScreen(navController, viewModel)
                    }
                    composable(Screen.Result.route) {
                        ResultScreen(navController, viewModel)
                    }
                }
            }
        }
    }
}

// --- Pantalla 1: Elección del Número ---

@Composable
fun ChoiceScreen(navController: NavController, viewModel: LotteryViewModel) {
    Scaffold() { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = "Tu Saldo Actual: ${viewModel.balance.value} Créditos",
                style = MaterialTheme.typography.headlineSmall,
                modifier = Modifier.padding(bottom = 24.dp),
                fontWeight = FontWeight.Bold
            )

            // Grid para los 9 botones de números
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                (1..9).chunked(3).forEach { rowNumbers ->
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        rowNumbers.forEach { number ->
                            NumberButton(number = number) { selectedNum ->
                                viewModel.selectNumber(selectedNum)
                                navController.navigate(Screen.Bet.route)
                            }
                        }
                    }
                    Spacer(modifier = Modifier.height(16.dp))
                }
            }
        }
    }
}

@Composable
fun NumberButton(number: Int, onClick: (Int) -> Unit) {
    Button(
        onClick = { onClick(number) },
        modifier = Modifier.size(80.dp),
        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
        contentPadding = PaddingValues(0.dp)
    ) {
        Text(text = number.toString(), fontSize = 32.sp, fontWeight = FontWeight.ExtraBold)
    }
}


// --- Pantalla 2: Apuesta ---

@Composable
fun BetScreen(navController: NavController, viewModel: LotteryViewModel) {
    val balance = viewModel.balance.value
    val chosenNumber = viewModel.chosenNumber.value
    var betInput by remember { mutableStateOf(viewModel.currentBet.value.toString()) }

    // Función para actualizar la apuesta en el ViewModel
    fun updateBetFromInput() {
        val betValue = betInput.toIntOrNull() ?: 1
        viewModel.updateBet(betValue)
    }

    Scaffold() { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(32.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Saldo Actual
            Text(
                text = "SALDO: $balance Créditos",
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(bottom = 16.dp)
            )

            // Número Elegido
            Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(bottom = 32.dp)) {

                Card(
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.tertiaryContainer),
                    modifier = Modifier.size(50.dp)
                ) {
                    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        Text(text = chosenNumber.toString(), fontSize = 24.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }

            // Campo de Apuesta
            OutlinedTextField(
                value = betInput,
                onValueChange = { newValue ->
                    // Filtra para solo permitir números y no más que el saldo
                    if (newValue.all { it.isDigit() }) {
                        betInput = newValue
                        updateBetFromInput() // Actualiza en tiempo real o al perder foco
                    }
                },
                label = { Text("Cantidad a Apostar") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                modifier = Modifier.fillMaxWidth(0.7f),
                singleLine = true,
                // Muestra un error si la apuesta es inválida
                isError = viewModel.currentBet.value !in 1..balance,
                supportingText = {
                    if (viewModel.currentBet.value !in 1..balance) {
                        Text("Apuesta debe ser entre 1 y $balance")
                    } else {
                        Text("Máximo a apostar: $balance")
                    }
                }
            )
            Spacer(modifier = Modifier.height(32.dp))

            // Botón Apostar
            Button(
                onClick = {
                    updateBetFromInput() // Asegura la última actualización
                    if (viewModel.currentBet.value in 1..balance) {
                        viewModel.performDraw() // Realiza el sorteo antes de navegar
                        navController.navigate(Screen.Result.route)
                    }
                },
                enabled = viewModel.currentBet.value in 1..balance,
                modifier = Modifier.fillMaxWidth(0.6f).height(50.dp)
            ) {
                Text("APOSTAR", fontSize = 18.sp)
            }
        }
    }
}


// --- Pantalla 3: Resultado ---

@Composable
fun ResultScreen(navController: NavController, viewModel: LotteryViewModel) {
    val chosenNumber = viewModel.chosenNumber.value
    val winningNumber = viewModel.winningNumber.value
    val isWinner = chosenNumber == winningNumber

    val resultText = if (isWinner) {
        "¡ GANASTE! "
    } else {
        " PERDISTE "
    }

    Scaffold() { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(32.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceAround
        ) {
            // Mensaje de Resultado
            Text(
                text = resultText,
                style = MaterialTheme.typography.headlineLarge.copy(),
                fontWeight = FontWeight.ExtraBold,
                fontSize = 40.sp,
                modifier = Modifier.padding(bottom = 20.dp)
            )

            // Número Ganador
            Text(text = "El número ganador es:", style = MaterialTheme.typography.titleLarge)
            Box(
                modifier = Modifier
                    .size(150.dp)
                    .padding(8.dp),

                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = winningNumber.toString(),
                    color = Color.Black,
                    fontSize = 80.sp,
                    fontWeight = FontWeight.Black
                )
            }


            Spacer(modifier = Modifier.height(32.dp))

            // Botones de Navegación
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                // Jugar de nuevo (Guarda el saldo)
                Button(
                    onClick = {
                        navController.navigate(Screen.Choice.route) {
                            popUpTo(Screen.Choice.route) { inclusive = true } // Limpia la pila hasta Choice
                        }
                    },
                    modifier = Modifier.fillMaxWidth(0.8f).height(50.dp)
                ) {
                    Text("Jugar de Nuevo", fontSize = 18.sp)
                }
                Spacer(modifier = Modifier.height(16.dp))

                // Salir (Resetea el saldo)
                Button(
                    onClick = {
                        viewModel.resetGame() // Reinicia el saldo a 10
                        navController.navigate(Screen.Choice.route) {
                            popUpTo(Screen.Choice.route) { inclusive = true }
                        }
                    },
                    modifier = Modifier.fillMaxWidth(0.8f).height(50.dp)
                ) {
                    Text("Salir (Reiniciar Saldo)")
                }
            }
        }
    }
}