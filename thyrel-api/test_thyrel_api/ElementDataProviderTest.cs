using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using thyrel_api.DataProvider;
using thyrel_api.Models;
using thyrel_api.Models.DTO;

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
                new(1, 1, 1, 1, ElementType.Sentence),
                new(1, 2, 2, 1, ElementType.Sentence),
                new(1, 3, 3, 1, ElementType.Sentence),
                new(1, 4, 4, 1, ElementType.Sentence),
                new(1, 6, 6, 1, ElementType.Sentence),
                new(1, 7, 7, 1, ElementType.Sentence)
            };
            var elementCount = Context.Element.Count();

            await _elementDataProvider.AddElements(elements);

            Assert.AreEqual(elementCount + elements.Count, Context.Element.Count());
        }

        [Test]
        public async Task AddDrawingFunctionCreateSentence()
        {
            var newElement = await _elementDataProvider.AddDrawing(1, 2, 2, 1);
            Assert.IsNotNull(newElement);
            Assert.AreEqual(ElementType.Drawing, newElement.Type);
            Assert.AreEqual(1, newElement.CreatorId);
        }

        [Test]
        public async Task SetSentenceEditValueOfText()
        {
            const string newText = "yow";
            var element = Context.Element.First();
            await _elementDataProvider.SetSentence(element.Id, newText);
            Assert.AreEqual(newText, element.Text);
            var dbElement = await _elementDataProvider.GetElement(1);
            Assert.AreEqual(newText, dbElement.Text);
        }

        [Test]
        public async Task SetDrawingEditValueOfDrawImage()
        {
            const string newImage = "http://imageexample.com/image.png";
            var element = Context.Element.First();

            await _elementDataProvider.SetDrawing(element.Id, newImage);
            Assert.AreEqual(newImage, element.DrawImage);
            var dbElement = await _elementDataProvider.GetElement(1);
            Assert.AreEqual(newImage, dbElement.DrawImage);
        }

        [Test]
        public async Task HandleFinishChangeTheFinish()
        {
            const string text = "text";
            await _elementDataProvider.HandleFinish(1, new FinishElementDto
            {
                Text = text,
                DrawImage = "invalid image"
            });

            var element1 = await _elementDataProvider.GetElement(1);
            Assert.IsNotNull(element1.FinishAt);
            Assert.AreEqual(element1.Text, text);
            await _elementDataProvider.HandleFinish(1);
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

        [Test]
        public async Task TestGetNextCandidatesElement()
        {
            var session = await Context.Session.FirstAsync();
            var candidates = await _elementDataProvider.GetNextCandidateElements(session.Id);

            Assert.AreEqual(candidates.Count, Context.Element.Count(e => e.SessionId == session.Id));
            Assert.AreEqual((await Context.Element.FindAsync(candidates.First().Id)).SessionId, session.Id);
        }

        [Test]
        public async Task TestGetCurrentElement()
        {
            var player = await Context.Player.FindAsync(1);
            var expected = await Context.Element.OrderByDescending(e => e.Step)
                .FirstOrDefaultAsync(e => e.CreatorId == player.Id);
            var current = await _elementDataProvider.GetCurrentElement(player.Id);
            Assert.AreEqual(current.Step, expected.Step);
            Assert.AreEqual(current.Id, expected.Id);
        }

        [Test]
        public async Task TestGetCurrentElementWithParent()
        {
            var newElementWithParent = new Element(2, 1, 2, 1, ElementType.Sentence);
            await Context.Element.AddAsync(newElementWithParent);
            await Context.SaveChangesAsync();

            var player = await Context.Player.FindAsync(1);
            var expected = await Context.Element.OrderByDescending(e => e.Step)
                .FirstOrDefaultAsync(e => e.CreatorId == player.Id && e.InitiatorId != player.Id);
            var expectedWithParent = await _elementDataProvider.GetCurrentElement(expected.CreatorId);
            var current = await _elementDataProvider.GetCurrentElement(player.Id);
            Assert.AreEqual(expectedWithParent.Parent.Id, current.Parent.Id);
            Assert.AreNotEqual(expectedWithParent.Parent.Id, expectedWithParent.Id);
            Assert.AreNotEqual(expectedWithParent.Parent.Step, expectedWithParent.Step);
            Assert.AreEqual(current.Step, expected.Step);
            Assert.AreEqual(current.Id, expected.Id);
        }

        [Test]
        public async Task TestGetCurrentElementWithNoParent()
        {
            var playerId = 33;
            var newElement = new Element(1, playerId, playerId, 9, ElementType.Drawing);
            await Context.Element.AddAsync(newElement);
            await Context.SaveChangesAsync();

            var expectedWithParent = await _elementDataProvider.GetCurrentElement(playerId);
            Assert.IsNull(expectedWithParent.Parent);
        }

        [Test]
        public void TestEditFinishBody()
        {
            const string text = "Red";
            var session = new Session(1, DateTime.Now, 12, SessionStepType.Book, 12,
                new RoomSettingsDto {Mode = RoomMode.OneWord});

            var elementFinish = new FinishElementDto
            {
                DrawImage = "",
                Text = $"{text} car"
            };

            _elementDataProvider.UpdateFinishElementDto(elementFinish, session);

            Assert.AreEqual(elementFinish.Text, text);
        }
    }
}