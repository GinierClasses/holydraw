using System;
using System.Net.WebSockets;

namespace thyrel_api.Models
{
    public class SocketConnection
    {
        public Guid Id { get; set; }
        public WebSocket WebSocket { get; set; }
        public int? RoomId { get; set; }
        public int? PlayerId { get; set; }
    }
}