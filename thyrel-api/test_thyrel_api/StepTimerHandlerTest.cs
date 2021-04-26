using System.Reflection;
using NUnit.Framework;
using thyrel_api.Handler;
using thyrel_api.Models;

namespace test_thyrel_api
{
    public class StepTimerHandlerTest
    {
        [Test]
        public void TestStartStepTime()
        {
            var result = StepTimeHandler.GetTimeForStep(SessionStepType.Start);
            Assert.AreEqual(result, GetPrivateField("StartStepTime"));
        }
        
        [Test]
        public void TestWriteStepTime()
        {
            var result = StepTimeHandler.GetTimeForStep(SessionStepType.Write);
            Assert.AreEqual(result, GetPrivateField("WriteStepTime"));
        }
        
        [Test]
        public void TestDrawStepTime()
        {
            var result = StepTimeHandler.GetTimeForStep(SessionStepType.Draw);
            Assert.AreEqual(result, GetPrivateField("DrawStepTime"));
        }
        
        [Test]
        public void TestOther()
        {
            var result = StepTimeHandler.GetTimeForStep(SessionStepType.Book);
            Assert.AreEqual(result, 0);
        }

        private int GetPrivateField(string fieldName)
        {
            var type = typeof(StepTimeHandler);
            var info = type.GetField(fieldName, BindingFlags.NonPublic | BindingFlags.Static);
            var value = info?.GetValue(null);
            if (value != null) return (int) value;
            return 0;
        }
    }
}