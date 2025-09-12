using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Event;
using api.Models;

namespace api.Interfaces
{
    public interface IEventRepo
    {
        Task<List<Event>> GetAllAsync(string userId);
        Task<Event?> GetByIdAsync(int id);
        Task<Event> CreateAsync(Event createEventRequestDto);
        Task<Event?> DeleteAsync(int id, string userId);
        Task<Event?> UpdateAsync(int id, UpdateEventRequestDto updateEventRequestDto, string userId);
        Task<bool> EventExist(int id);
    }
}