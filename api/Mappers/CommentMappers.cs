using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Models;

namespace api.Mappers
{
    public static class CommentMappers
    {
        public static CommentDto ToCommentDto(this Comment comment)
        {
            return new CommentDto
            {
                Id = comment.Id,
                Content = comment.Content,
                EventId = comment.EventId,
                CreatedOn = comment.CreatedOn,
                UpdatedOn = comment.UpdatedOn
            };
        }

        public static Comment ToCommentFromCreateDto(this CreateCommentRequestDto createCommentRequestDto)
        {
            return new Comment
            {
                Content = createCommentRequestDto.Content,
                EventId = createCommentRequestDto.EventId,
            };
        }
    }
}