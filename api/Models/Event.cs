using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public bool IsAllDay { get; set; } = false;
        public EventStatus Status { get; set; } = EventStatus.Tentative;
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public string UserId { get; set; }
        public AppUser? AppUser { get; set; }
    }
}