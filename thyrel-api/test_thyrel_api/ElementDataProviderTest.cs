using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using thyrel_api.DataProvider;
using thyrel_api.Models;

namespace test_thyrel_api
{
    public class ElementDataProviderTest : TestProvider
    {
        private IElementDataProvider _elementDataProvider;

        [SetUp]
        public async Task Setup()
        {
            await SetupTest();
            _elementDataProvider = new ElementDataProvider(Context);
        }

        [Test]
        public async Task AddSentenceFunctionCreateSentence()
        {
            var newElement = await _elementDataProvider.AddSentence(1, 2, 2, 1, "Test2");
            Assert.IsNotNull(newElement);
            Assert.AreEqual(ElementType.Sentence, newElement.Type);
            Assert.AreEqual(1, newElement.CreatorId);
        }

        [Test]
        public async Task AddElementsFunctionCreateList()
        {

            var elements = new List<Element>
            {
                new (1, 1, 1, 1, "element-sentence-1"),
                new (1, 2, 2, 1, "element-sentence-2"),
                new (1, 3, 3, 1, "element-sentence-3"),
                new (1, 4, 4, 1, "element-sentence-4"),
                new (1, 6, 6, 1, "element-sentence-5"),
                new (1, 7, 7, 1, "element-sentence-6"),
            };
            var elementCount = Context.Element.Count();

            await _elementDataProvider.AddElements(elements);

            Assert.AreEqual(elementCount + elements.Count, Context.Element.Count());           
        }

        [Test]
        public async Task AddDrawingFunctionCreateSentence()
        {
            var newElement = await _elementDataProvider.AddDrawing(1, 2, 2, 1, 1);
            Assert.IsNotNull(newElement);
            Assert.AreEqual(ElementType.Drawing, newElement.Type);
            Assert.AreEqual(1, newElement.CreatorId);
        }

        [Test]
        public async Task SetSentenceEditValueOfText()
        {
            const string newText = "yow";
            var newElement = await _elementDataProvider.SetSentence(1, newText);
            Assert.AreEqual(newText, newElement.Text);
            var dbElement = await _elementDataProvider.GetElement(1);
            Assert.AreEqual(newText, dbElement.Text);
        }

        [Test]
        public async Task SetDrawingEditValueOfDrawingId()
        {
            const int newId = 2;
            var newElement = await _elementDataProvider.SetDrawing(1, newId);
            Assert.AreEqual(newId, newElement.DrawingId);
            var dbElement = await _elementDataProvider.GetElement(1);
            Assert.AreEqual(newId, dbElement.DrawingId);
        }
        
        [Test]
        public async Task HandleFinishChangeTheFinish()
        {
            await _elementDataProvider.HandleFinish(1, true);
            var element1 = await _elementDataProvider.GetElement(1);
            Assert.IsNotNull(element1.FinishAt);
            await _elementDataProvider.HandleFinish(1, false);
            var element2 = await _elementDataProvider.GetElement(1);
            Assert.IsNull(element2.FinishAt);
        }
        
        [Test]
        public async Task TestGetAlbum()
        {
            var elementExpected = Context.Element.Count(e => e.InitiatorId == 1);
            var album = await _elementDataProvider.GetAlbum(1);
            Assert.AreEqual(elementExpected, album.Count);
        }
        
        [Test]
        public async Task TestGetElement()
        {
            var element = await _elementDataProvider.GetElement(1);
            var expectedElement = await Context.Element.SingleAsync(e => e.Id == 1);
            Assert.AreEqual(expectedElement.Id, element.Id);
            Assert.AreEqual(expectedElement.Text, element.Text);
        }
    }
}