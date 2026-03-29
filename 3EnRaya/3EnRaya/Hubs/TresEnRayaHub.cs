using _3EnRaya.Domain;
using Microsoft.AspNetCore.SignalR;

namespace _3EnRaya.Hubs
{
    /// <summary>
    /// SignalR Hub for real-time communication of the Tic-Tac-Toe game.
    /// </summary>
    public class TresEnRayaHub : Hub
    {
        private readonly JuegoEstado _juegoEstado;
        private const string GrupoJuego = "PartidaUnica";

        public TresEnRayaHub(JuegoEstado juegoEstado)
        {
            _juegoEstado = juegoEstado;
        }

        /// <summary>
        /// Handles the connection of a new player.
        /// Asks for opponent if first, starts game if second.
        /// </summary>
        public override async Task OnConnectedAsync()
        {
            int numeroJugador = _juegoEstado.AgregarJugador(Context.ConnectionId);

            if (numeroJugador > 0)
            {
                Console.WriteLine($"[HUB] Jugador {numeroJugador} conectado: {Context.ConnectionId}");
                await Groups.AddToGroupAsync(Context.ConnectionId, GrupoJuego);

                if (numeroJugador == 1)
                {
                    // First player: must wait
                    await Clients.Caller.SendAsync("Mensaje", "Esperando oponente...");
                }
                else if (numeroJugador == 2)
                {
                    // Second player: game starts
                    await Clients.Group(GrupoJuego).SendAsync("ComenzarJuego");
                }
            }
            else
            {
                Console.WriteLine($"[HUB] Sala llena. Rechazando: {Context.ConnectionId}");
                await Clients.Caller.SendAsync("Mensaje", "Sala llena");
            }

            await base.OnConnectedAsync();
        }

        /// <summary>
        /// Handles player disconnection.
        /// </summary>
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _juegoEstado.QuitarJugador(Context.ConnectionId);
            await Clients.Group(GrupoJuego).SendAsync("OponenteDesconectado");
            await base.OnDisconnectedAsync(exception);
        }

        /// <summary>
        /// Processes a move made by a player.
        /// </summary>
        public async Task Mover(int fila, int columna)
        {
            int jugador = _juegoEstado.ObtenerJugador(Context.ConnectionId);

            if (_juegoEstado.ValidarMovimiento(fila, columna, jugador))
            {
                _juegoEstado.ActualizarEstado(fila, columna, jugador);
                
                // Send board update to all
                await Clients.Group(GrupoJuego).SendAsync("ActualizarTablero", _juegoEstado.PartidaActual);
            }
        }
        /// <summary>
        /// Resets the game for all players in the group.
        /// </summary>
        public async Task Reiniciar()
        {
            _juegoEstado.ReiniciarPartida();
            await Clients.Group(GrupoJuego).SendAsync("ActualizarTablero", _juegoEstado.PartidaActual);
        }
    }
}
