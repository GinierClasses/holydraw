﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.DataProvider;
using thyrel_api.Handler;
using thyrel_api.Json;
using thyrel_api.Models;
using thyrel_api.Models.DTO;
using thyrel_api.Websocket;

namespace thyrel_api.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ElementController : ControllerBase
    {
        private readonly IWebsocketHandler _websocketHandler;
        private readonly HolyDrawDbContext _context;

        public ElementController(IWebsocketHandler websocketHandler, HolyDrawDbContext context)
        {
            _websocketHandler = websocketHandler;
            _context = context;
        }


         // Call this endpoint to update the element with the finished result from the player
        // PATCH: api/element/:id
        /*[HttpPatch("{id}")]*/
        [HttpPatch("finish")]
        /*public async Task<ActionResult<Element>> Finish(int id, [FromBody] ElementBody body)*/
        public async Task<ActionResult<Element>> Finish([FromBody] ElementBody body)
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized();
            var elementDataProvider = new ElementDataProvider(_context);
            var sessionDataProvider = new SessionDataProvider(_context);
            var currentElementDto = await new ElementDataProvider(_context).GetCurrentElement(player.Id);
            var element = await elementDataProvider.GetElement(currentElementDto.Id);
            /*var element = await elementDataProvider.GetElement(id);*/
            var session = await sessionDataProvider.GetSessionById(element.SessionId);
            
            var finishState = await elementDataProvider.HandleFinish(currentElementDto.Id);
            if (finishState.FinishAt != null)
                if (element.Type == ElementType.Sentence)
                    await elementDataProvider.SetSentence(element, body.Text);
                else
                    await elementDataProvider.SetDrawing(element, body.DrawImage);
            
            var stepState = await sessionDataProvider.GetPlayerStatus(element.Session);
            if (stepState.PlayerCount == stepState.PlayerFinished)
                await sessionDataProvider.NextStep(session);

            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new BaseWebsocketEventJson(WebsocketEvent.PlayerFinished)), session.RoomId);

            return Ok(element);
        }

        [HttpPatch("finishCurrent")]
        public async Task<ActionResult<Element>> FinishCurrent([FromBody] ElementBody body)
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized();

            var elementDataProvider = new ElementDataProvider(_context);
            var sessionDataProvider = new SessionDataProvider(_context);

            var currentElementDto =  await new ElementDataProvider(_context).GetCurrentElement(player.Id);
            var currentElement = await elementDataProvider.GetElement(currentElementDto.Id);

            var finishState = await elementDataProvider.HandleFinish(currentElement.Id);
            if (finishState.FinishAt != null)
                if (currentElement.Type == ElementType.Sentence)
                    await elementDataProvider.SetSentence(currentElement, body.Text);
                else
                    await elementDataProvider.SetDrawing(currentElement, body.DrawImage);

            await _websocketHandler.SendMessageToSockets(
                            JsonBase.Serialize(
                                new BaseWebsocketEventJson(WebsocketEvent.PlayerFinished)), player.RoomId);

            return Ok(currentElement);
        }

        // Call this endpoint to get an Element by Id
        // GET : api/element/4
        [HttpGet("{id}")]
        public async Task<ActionResult<Element>> GetElement(int id)
        {
            var element = await new ElementDataProvider(_context).GetElement(id);
            return element;
        }
        
        // Call this endpoint to get the current Element of the player that call the api
        // GET : api/element/current
        [HttpGet("current")]
        public async Task<ActionResult<ElementStepDto>> GetCurrent()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized();

            return await new ElementDataProvider(_context).GetCurrentElement(player.Id);
        }


        public class ElementBody
        {
            public string Text;
            public string DrawImage;
        }
    }
}