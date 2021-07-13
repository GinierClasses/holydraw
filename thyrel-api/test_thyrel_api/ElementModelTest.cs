using NUnit.Framework;
using thyrel_api.Models;

namespace test_thyrel_api
{
    public class ElementModelTest
    {
        [Test]
        public void DrawingElementConstructor()
        {
            var element = new Element(2, 1, 1, 1, ElementType.Drawing);
            Assert.AreEqual(ElementType.Drawing, element.Type);
            Assert.AreEqual("", element.DrawImage);
            Assert.AreEqual(null, element.Text);
        }

        [Test]
        public void SentenceElementConstructor()
        {
            var element = new Element(2, 1, 1, 1, ElementType.Sentence);
            Assert.AreEqual(ElementType.Sentence, element.Type);
            Assert.AreEqual(null, element.DrawImage);
            Assert.AreEqual("", element.Text);
        }
    }
}