using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Dtos.Event
{
    public class CreateEventRequestDto
    {
        [Required]
        [StringLength(255, ErrorMessage = "Maximum Length of Title is 255.")]
        public string Title { get; set; } = string.Empty;
        [StringLength(1000, ErrorMessage = "Maximum Length of Description is 1000.")]
        public string? Description { get; set; } = string.Empty;
        [Required]
        [StringLength(255, ErrorMessage = "Maximum Length of Location is 255.")]
        public string Location { get; set; } = string.Empty;
        [Required]
        public DateTime StartDateTime { get; set; }
        [Required]
        public DateTime EndDateTime { get; set; }
        public bool IsAllDay { get; set; } = false;
        public EventStatus Status { get; set; } = EventStatus.Tentative;
    }
}