using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using thyrel_api.DataProvider;
using thyrel_api.Models;

namespace test_thyrel_api
{
    public class SessionStepTimeout
    {
        private readonly int _step;
        private readonly int _sessionId;
        private readonly int _delay;
        private readonly HolyDrawDbContext _context;

        public SessionStepTimeout(int step, int sessionId, int delay, HolyDrawDbContext context)
        {
            _step = step;
            _sessionId = sessionId;
            _delay = delay;
            _context = context;
        }

        public void RunTimeout()
        {
            Task.Delay(_delay).ContinueWith(_ =>
            {
                var sessionProvider = new SessionDataProvider(_context);
                var session = sessionProvider.GetSessionById(_sessionId).Result;
                // test if step is already finish
                if (session.ActualStep != _step) return;
                {
                    session.ActualStep += 1;
                }
            });
        }
    }
}