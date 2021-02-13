using NUnit.Framework;
using thyrel_api.Models;

namespace test_thyrel_api
{
    public class ElementModelTest
    {
        [SetUp]
        public void Setup()
        {
        }
        
        [Test]
        public void DrawingElementConstructor()
        {
            var element = new Element(2, 1, 1, 1, 1);
            Assert.AreEqual(ElementType.Drawing, element.Type);
        }
        
        [Test]
        public void SentenceElementConstructor()
        {
            var element = new Element(2, 1, 1, 1, "Jean");
            Assert.AreEqual(ElementType.Sentence, element.Type);
        }
    }
}