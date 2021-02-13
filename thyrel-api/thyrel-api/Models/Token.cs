using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Token
    {
        public Token() { }

        /// <summary>
        /// Only this constructor. A token never will be initialized with other data
        /// </summary>
        /// <param name="id">id</param>
        /// <param name="tokenKey">key</param>
        /// <param name="playerId">playerId</param>
        public Token(string tokenKey)
        {
            TokenKey = tokenKey;
            CreatedAt = DateTime.Now;
        }

        public int Id { get; set; }
        public string TokenKey { get; set; }
        public DateTime? DiscardAt { get; set; }
        public DateTime CreatedAt { get; set; }
        
        public List<Player> Players { get; set; }
    }
}
