using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Event;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace api.Controllers
{
    [Route("api/event")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepo _eventRepo;
        public EventController(IEventRepo eventRepo)
        {
            _eventRepo = eventRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var eventModel = await _eventRepo.GetAllAsync();
            var eventDto = eventModel.Select(s => s.ToEventDto());

            return Ok(eventDto);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var eventModel = await _eventRepo.GetByIdAsync(id);

            if (eventModel == null)
            {
                return NotFound();
            }

            return Ok(eventModel.ToEventDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateEventRequestDto createEventRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var eventModel = createEventRequestDto.ToCreateEventRequestDto();
            await _eventRepo.CreateAsync(eventModel);
            return CreatedAtAction(nameof(GetById), new { id = eventModel.Id }, eventModel.ToEventDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var eventModel = await _eventRepo.DeleteAsync(id);
            if (eventModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateEventRequestDto updateEventRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var eventModel = await _eventRepo.UpdateAsync(id, updateEventRequestDto);
            if (eventModel == null)
            {
                return NotFound();
            }

            return Ok(eventModel.ToEventDto());
        }
    }
}