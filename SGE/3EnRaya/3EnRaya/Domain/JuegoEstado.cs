namespace _3EnRaya.Domain
{
    /// <summary>
    /// Represents the overall state of the game session.
    /// Includes player tracking and the current match.
    /// </summary>
    public class JuegoEstado
    {
        public Partida PartidaActual { get; set; } = new Partida();
        public int NumJugadores { get; set; } = 0;
        public int JugadorActual { get; set; } = 1;

        private readonly System.Collections.Concurrent.ConcurrentDictionary<string, int> _jugadores = new();
        private readonly object _lock = new();

        /// <summary>
        /// Registers a new player and returns their ID (1 or 2).
        /// </summary>
        public int AgregarJugador(string connectionId)
        {
            lock (_lock)
            {
                if (_jugadores.Count >= 2) return 0;
                
                int id = _jugadores.Count + 1;
                if (_jugadores.TryAdd(connectionId, id))
                {
                    NumJugadores = _jugadores.Count;
                    return id;
                }
                return 0;
            }
        }

        public void ReiniciarJuego()
        {
            lock (_lock)
            {
                PartidaActual.Reiniciar();
                _jugadores.Clear();
                NumJugadores = 0;
            }
        }

        public bool ValidarMovimiento(int fila, int columna, int jugador)
        {
            lock (_lock)
            {
                if (PartidaActual.Finalizada) return false;
                if (PartidaActual.TurnoActual != jugador) return false;
                if (fila < 0 || fila > 2 || columna < 0 || columna > 2) return false;
                return string.IsNullOrEmpty(PartidaActual.Tablero[fila][columna]);
            }
        }

        public void ActualizarEstado(int fila, int columna, int jugador)
        {
            lock (_lock)
            {
                PartidaActual.Tablero[fila][columna] = (jugador == 1) ? "X" : "O";
                PartidaActual.ValidarEstado();
                
                if (!PartidaActual.Finalizada)
                {
                    PartidaActual.TurnoActual = (PartidaActual.TurnoActual == 1) ? 2 : 1;
                }
            }
        }

        public void QuitarJugador(string connectionId)
        {
            lock (_lock)
            {
                if (_jugadores.TryRemove(connectionId, out _))
                {
                    NumJugadores = _jugadores.Count;
                    PartidaActual.Reiniciar();
                }
            }
        }

        public void ReiniciarPartida()
        {
            lock (_lock)
            {
                PartidaActual.Reiniciar();
                // We keep the players, just reset turn and board
            }
        }

        public int ObtenerJugador(string connectionId) => _jugadores.GetValueOrDefault(connectionId, 0);
    }
}
