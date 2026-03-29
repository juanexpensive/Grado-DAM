namespace _3EnRaya.Domain
{
    /// <summary>
    /// Represents a game session of Tic-Tac-Toe.
    /// </summary>
    public class Partida
    {
        public string[][] Tablero { get; set; } = new string[3][];
        public int TurnoActual { get; set; } = 1;
        public bool Finalizada { get; set; } = false;
        public int Ganador { get; set; } = 0; // 0=ninguno, 1=jugador1, 2=jugador2, 3=tablas

        public Partida()
        {
            for (int i = 0; i < 3; i++)
                Tablero[i] = new string[3];
            Reiniciar();
        }

        /// <summary>
        /// Resets the game state to its initial values.
        /// </summary>
        public void Reiniciar()
        {
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    Tablero[i][j] = string.Empty;
                }
            }
            TurnoActual = 1;
            Finalizada = false;
            Ganador = 0;
        }

        /// <summary>
        /// Checks the board to see if there is a winner or a draw.
        /// </summary>
        public void ValidarEstado()
        {
            // Check rows
            for (int i = 0; i < 3; i++)
            {
                if (CheckLine(Tablero[i][0], Tablero[i][1], Tablero[i][2])) return;
            }

            // Check columns
            for (int i = 0; i < 3; i++)
            {
                if (CheckLine(Tablero[0][i], Tablero[1][i], Tablero[2][i])) return;
            }

            // Check diagonals
            if (CheckLine(Tablero[0][0], Tablero[1][1], Tablero[2][2])) return;
            if (CheckLine(Tablero[0][2], Tablero[1][1], Tablero[2][0])) return;

            // Check for draw
            if (EsTableroLleno())
            {
                Finalizada = true;
                Ganador = 3;
            }
        }

        private bool CheckLine(string a, string b, string c)
        {
            if (string.IsNullOrEmpty(a)) return false;
            if (a == b && b == c)
            {
                Finalizada = true;
                Ganador = (a == "X") ? 1 : 2;
                return true;
            }
            return false;
        }

        private bool EsTableroLleno()
        {
            for (int i = 0; i < 3; i++)
                for (int j = 0; j < 3; j++)
                    if (string.IsNullOrEmpty(Tablero[i][j])) return false;
            return true;
        }
    }
}
