using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using api.Dtos.Event;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace api.Controllers
{
    [Route("api/event")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepo _eventRepo;
        private readonly UserManager<AppUser> _userManager;
        public EventController(IEventRepo eventRepo, UserManager<AppUser> userManager)
        {
            _eventRepo = eventRepo;
            _userManager = userManager;
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

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) {
                return Unauthorized("User ID not found in token");
            }

            var eventModel = createEventRequestDto.ToCreateEventRequestDto(userId);
            
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

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) {
                return Unauthorized("User ID not found in token");
            }

            var eventModel = await _eventRepo.DeleteAsync(id, userId);
            if (eventModel == null)
            {
                return Unauthorized("The record cannot be found/ You have no access to delete that record.");
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