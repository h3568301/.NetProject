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
        public static CommentDto ToCommentDto (this Comment comment)
        {
            return new CommentDto
            {
                Id = comment.Id,
                Content = comment.Content,
                CreatedOn = comment.CreatedOn,
                EventId = comment.EventId,
            };
        }
    }
}