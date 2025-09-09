using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Event;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class EventRepo : IEventRepo
    {
        private readonly ApplicationDBContext _context;
        public EventRepo(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Event> CreateAsync(Event createEventRequestDto)
        {
            await _context.Events.AddAsync(createEventRequestDto);
            await _context.SaveChangesAsync();
            return createEventRequestDto;
        }

        public async Task<Event?> DeleteAsync(int id)
        {
            var eventModel = await _context.Events.FirstOrDefaultAsync(x => x.Id == id);
            if (eventModel == null)
            {
                return null;
            }
            _context.Remove(eventModel);
            await _context.SaveChangesAsync();
            return eventModel;
        }

        public async Task<bool> EventExist(int id)
        {
            return await _context.Events.AnyAsync(s=>s.Id ==id);
        }

        public async Task<List<Event>> GetAllAsync()
        {
            return await _context.Events.Include(c => c.Comments).ToListAsync();
        }

        public async Task<Event?> GetByIdAsync(int id)
        {
            var eventModel = await _context.Events.Include(x => x.Comments).FirstOrDefaultAsync(x => x.Id == id);
            if (eventModel == null)
            {
                return null;
            }

            return eventModel;
        }

        public async Task<Event?> UpdateAsync(int id, UpdateEventRequestDto updateEventRequestDto)
        {
            var existingStock = await _context.Events.FirstOrDefaultAsync(x => x.Id == id);
            if (existingStock == null)
            {
                return null;
            }
            existingStock.Title = updateEventRequestDto.Title;
            existingStock.Description = updateEventRequestDto.Description;
            existingStock.Location = updateEventRequestDto.Location;
            existingStock.StartDateTime = updateEventRequestDto.StartDateTime;
            existingStock.EndDateTime = updateEventRequestDto.EndDateTime;
            existingStock.IsAllDay = updateEventRequestDto.IsAllDay;
            existingStock.Status = updateEventRequestDto.Status;
            await _context.SaveChangesAsync();
            return existingStock;
        }
    }
}