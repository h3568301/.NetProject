using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Event;
using api.Models;

namespace api.Mappers
{
    public static class EventMappers
    {
        public static EventDto ToEventDto(this Event events)
        {
            return new EventDto
            {
                Id = events.Id,
                Title = events.Title,
                Description = events.Description,
                Location = events.Location,
                StartDateTime = events.StartDateTime,
                EndDateTime = events.EndDateTime,
                IsAllDay = events.IsAllDay,
                Status = events.Status,
                Comments = events.Comments.Select(x => x.ToCommentDto()).ToList()
            };
        }
        
        public static Event ToCreateEventRequestDto (this CreateEventRequestDto events)
        {
            return new Event
            {
                Title = events.Title,
                Description = events.Description,
                Location = events.Location,
                StartDateTime = events.StartDateTime,
                EndDateTime = events.EndDateTime,
                IsAllDay = events.IsAllDay,
                Status = events.Status
            };
        }
    }
}