using System;

namespace thyrel_api.Models.DTO
{
    public class SessionSocketDto
    {
        public int ActualStep { get; set; }
        public SessionStepType StepType { get; set; }
        public DateTime? StepFinishAt { get; set; }
        public int TimeDuration { get; set; }
        public int PlayerFinished { get; set; }
    }
    
    public class PlayerFinishStepSocketDto
    {
        public int PlayerFinished { get; set; }
    }
}