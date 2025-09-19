import React, { useEffect, useState } from 'react'
import { deleteEventAPI, getAllEventAPI, updateEventAPI } from '../Services/EventService';
import { toast } from 'react-toastify';
import { EventCard } from '../Components/EvenetCard';
import { UpdateEventDto } from '../Models/EventType';

interface Comment {
  id: number;
  content: string;
  createdOn: string;
  updatedOn: string;
  eventId: number;
}

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  isAllDay: boolean;
  status: number;
  comments: Comment[];
  userId: string;
}

type Props = {}

const EventPageComponent = (props: Props) => {
    const [EventData, setEventData] = useState<Event[]>([]);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getAllEventAPI();
                if (response && Array.isArray(response.data)) {
                    setEventData(response.data);
                }
            } catch (err) {
                toast.warning(err instanceof Error ? err.message : 'Unknown error');
            }
        };

        fetchEvents();
    }, []);

    const handleDeleteEvent = async (eventId: number, userId: string) => {
        await deleteEventAPI(eventId, userId);
        setEventData((prev: Event[]) => prev.filter((event: Event) => event.id !== eventId));
    };

    const handleUpdateEvent = async (eventId: number, eventData: UpdateEventDto) => {
        const response = await updateEventAPI(eventId, eventData);
        const updatedEvent = response?.data;
        
        setEventData(prev => 
            prev.map(event => 
            event.id === eventId ? updatedEvent : event
            )
        );
    };

    return (
        <div className="p-4 pt-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Events</h1>
            {EventData.length === 0 ? (
                <div className="text-center text-gray-600">No events found</div>
            ) : (
                EventData.map((event: Event) => (
                <EventCard key={event.id} 
                event={event} 
                onDelete={handleDeleteEvent} 
                onUpdate={handleUpdateEvent}/>
                ))
            )}
        </div>
    )
}

export default EventPageComponent