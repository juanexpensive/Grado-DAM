using Microsoft.AspNetCore.SignalR;
using ASPChatClean.entities;


namespace ASPChatClean.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(clsMensajeUsuario mensaje)
        {
            await Clients.All.SendAsync("ReceiveMessage", mensaje);
        }
    }
}