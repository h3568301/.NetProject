using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(255, ErrorMessage = "Maximum Length of Content is 255.")]
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? EventId { get; set; }
        public Event? Event { get; set; }
    }
}