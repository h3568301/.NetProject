using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Event;
using FluentValidation;

namespace api.Validators
{
    public class CreateEventRequestValidator : AbstractValidator<CreateEventRequestDto>
    {
        public CreateEventRequestValidator()
      {
          RuleFor(x => x.Title)
              .NotEmpty()
              .WithMessage("Title is required")
              .MaximumLength(255)
              .WithMessage("Title cannot exceed 255 characters");

          RuleFor(x => x.Description)
              .MaximumLength(1000)
              .WithMessage("Description cannot exceed 1000 characters");

          RuleFor(x => x.Location)
              .NotEmpty()
              .WithMessage("Location is required")
              .MaximumLength(255)
              .WithMessage("Location cannot exceed 255 characters");

          RuleFor(x => x.StartDateTime)
              .NotEmpty()
              .WithMessage("Start date is required")
              .Must(BeValidDate)
              .WithMessage("Start date must be in the future");

          RuleFor(x => x.EndDateTime)
              .NotEmpty()
              .WithMessage("End date is required")
              .GreaterThanOrEqualTo(x => x.StartDateTime)
              .WithMessage("End date must be after start date");

          RuleFor(x => x)
              .Must(HaveValidDuration)
              .WithMessage("Event duration cannot exceed 30 days");
      }

      private bool BeValidDate(DateTime date)
      {
          return date > DateTime.Now;
      }

      private bool HaveValidDuration(CreateEventRequestDto dto)
      {
          return (dto.EndDateTime - dto.StartDateTime).TotalDays <= 30;
      }
    }
}