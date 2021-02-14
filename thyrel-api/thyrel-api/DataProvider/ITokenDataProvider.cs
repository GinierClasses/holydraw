using System.Threading.Tasks;
using thyrel_api.Models;

namespace thyrel_api.DataProvider
{
    public interface ITokenDataProvider
    {
        /// <summary>
        /// Create a new Token autogenerate
        /// </summary>
        Task<Token> Add();

        /// <summary>
        /// To discord a token
        /// </summary>
        /// <param name="tokenId"></param>
        Task<Token> Discard(int tokenId);

        /// <summary>
        /// To find Player associated with the key
        /// </summary>
        /// <param name="tokenKey">the token key</param>
        /// <returns>Return the Player with associated key if player exist or null</returns>
        Task<Player> FindPlayer(string tokenKey);

        /// <summary>
        /// To find a Token
        /// </summary>
        /// <param name="tokenId"></param>
        /// <returns>Return token with this ID</returns>
        Task<Token> GetToken(int tokenId);
    }
}