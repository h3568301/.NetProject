import React from 'react'
import CreateEventCard from './CreateEventCard'
import { CreateEventDto } from '../Models/EventType'
import { createEventAPI } from '../Services/EventService'

type Props = {}

const CreateEventComponent = (props: Props) => {
    const handleCreateEvent = async (event: CreateEventDto) => {
            await createEventAPI(event);
        };

  return (
    <div className="p-4 pt-16">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Your Events</h1>
                <CreateEventCard
              onCreate={handleCreateEvent}/>
            </div>
  )
}

export default CreateEventComponent