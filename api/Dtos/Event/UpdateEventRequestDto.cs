using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Dtos.Event
{
    public class UpdateEventRequestDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public bool IsAllDay { get; set; } = false;
        public EventStatus Status { get; set; } = EventStatus.Tentative;
        public string UserId { get; set; }
    }
}