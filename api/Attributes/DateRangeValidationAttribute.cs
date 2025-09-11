using System.ComponentModel.DataAnnotations;

namespace api.Attributes
{
    public class DateRangeValidationAttribute : ValidationAttribute
    {
        private readonly string _startDatePropertyName;

        public DateRangeValidationAttribute(string startDatePropertyName)
        {
            _startDatePropertyName = startDatePropertyName;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var endDate = (DateTime?)value;
            var startDateProperty = validationContext.ObjectType.GetProperty(_startDatePropertyName);

            if (startDateProperty == null)
            {
                return new ValidationResult($"Property '{_startDatePropertyName}' not found.");
            }

            var startDate = (DateTime?)startDateProperty.GetValue(validationContext.ObjectInstance);

            if (endDate.HasValue && startDate.HasValue && endDate.Value < startDate.Value)
            {
                return new ValidationResult("End date must be greater than or equal to start date.");
            }

            return ValidationResult.Success;
        }
    }
}