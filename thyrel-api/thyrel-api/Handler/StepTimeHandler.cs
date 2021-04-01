using thyrel_api.Models;

namespace thyrel_api.Handler
{
    public static class StepTimeHandler
    {
        private const int StartStepTime = 60; // 1 minute
        private const int WriteStepTime = 60; // 1 minute
        private const int DrawStepTime = 180; // 3 minutes

        public static int GetTimeForStep(SessionStepType sessionStepType)
        {
            return sessionStepType switch
            {
                SessionStepType.Write => WriteStepTime,
                SessionStepType.Start => StartStepTime,
                SessionStepType.Draw => DrawStepTime,
                _ => 0
            };
        }
    }
}