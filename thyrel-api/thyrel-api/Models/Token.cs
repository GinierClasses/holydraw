using System;
using System.Collections.Generic;

namespace thyrel_api.Models
{
    public class Token
    {
        public Token()
        {
        }

        /// <summary>
        ///     Only this constructor. A token never will be initialized with other data
        /// </summary>
        /// <param name="tokenKey">key</param>
        public Token(string tokenKey)
        {
            TokenKey = tokenKey;
            CreatedAt = DateTime.Now;
        }

        public int Id { get; set; }
        public string TokenKey { get; set; }
        public DateTime? DiscardAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual List<Player> Players { get; set; }
    }
}