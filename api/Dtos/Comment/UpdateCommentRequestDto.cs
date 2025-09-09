using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class UpdateCommentRequestDto
    {
        [Required]
        [StringLength(255, ErrorMessage = "Maximum Length of Title is 255.")]
        public string Content { get; set; } = string.Empty;
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
    }
}