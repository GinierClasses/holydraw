using thyrel_api.Models;

namespace thyrel_api.Handler
{
    public static class StepTimeHandler
    {
        private const int StartStepTime = 60; // 1 minute
        private const int WriteStepTime = 60; // 1 minute
        private const int DrawStepTime = 180; // 3 minutes

        public static int GetTimeForStep(SessionStepType sessionStepType, RoomMode? mode = RoomMode.Standard)
        {
            var time = sessionStepType switch
            {
                SessionStepType.Write => WriteStepTime,
                SessionStepType.Start => StartStepTime,
                SessionStepType.Draw => DrawStepTime,
                _ => 0
            };

            return mode switch
            {
                RoomMode.Standard => time,
                RoomMode.OneWord => time / 2,
                _ => 0,
            };
        }
    }
}