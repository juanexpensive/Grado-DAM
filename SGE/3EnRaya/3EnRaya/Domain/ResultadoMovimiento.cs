namespace _3EnRaya.Domain
{
    public class ResultadoMovimiento
    {
        public bool Exitoso { get; set; }
        public CeldaEstado[][] Tablero { get; set; } = null!;
        public int TurnoActual { get; set; }
        public int Ganador { get; set; } // -1: En juego, 0: Tablas, 1: Jugador1, 2: Jugador2
        public string MensajeError { get; set; } = string.Empty;
    }
}
