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
            var result = StepTimeHandler.GetTimeForStep(SessionStepType.Start, RoomMode.Standard);
            Assert.AreEqual(result, GetPrivateField("StartStepTime"));
        }

        [Test]
        public void TestWriteStepTime()
        {
            var result = StepTimeHandler.GetTimeForStep(SessionStepType.Write, RoomMode.Standard);
            Assert.AreEqual(result, GetPrivateField("WriteStepTime"));
        }

        [Test]
        public void TestDrawStepTime()
        {
            var result = StepTimeHandler.GetTimeForStep(SessionStepType.Draw, RoomMode.Standard);
            Assert.AreEqual(result, GetPrivateField("DrawStepTime"));
        }

        [Test]
        public void TestOther()
        {
            var result = StepTimeHandler.GetTimeForStep(SessionStepType.Book, RoomMode.Standard);
            Assert.AreEqual(result, 0);
        }

        [Test]
        public void TestDrawOneWord()
        {
            var result = StepTimeHandler.GetTimeForStep(SessionStepType.Draw, RoomMode.OneWord);
            Assert.AreEqual(result, GetPrivateField("DrawStepTime") / 2);
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