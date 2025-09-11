using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepo _commentRepo;
        private readonly IEventRepo _eventRepo;
        public CommentController(ICommentRepo commentRepo, IEventRepo eventRepo)
        {
            _commentRepo = commentRepo;
            _eventRepo = eventRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var commentModel = await _commentRepo.GetAllAsync();
            if (commentModel == null)
            {
                return NotFound();
            }
            return Ok(commentModel.Select(x => x.ToCommentDto()));
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var commentModel = await _commentRepo.GetByIdAsync(id);
            if (commentModel == null)
            {
                return NotFound();
            }

            return Ok(commentModel.ToCommentDto());
        }

        [HttpPost("{eventId:int}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] int eventId, [FromBody] CreateCommentRequestDto createCommentRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!await _eventRepo.EventExist(eventId))
            {
                return BadRequest("Event Not Exist");
            }
            var commentModel = createCommentRequestDto.ToCommentFromCreateDto();
            await _commentRepo.CreateAsync(commentModel);
            return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
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
            var comment = await _commentRepo.DeleteAsync(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDto commentModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var commentRepo = await _commentRepo.UpdateAsync(id, commentModel);
            if (commentRepo == null)
            {
                return NotFound();
            }

            return Ok(commentRepo.ToCommentDto());
        }
    }
}