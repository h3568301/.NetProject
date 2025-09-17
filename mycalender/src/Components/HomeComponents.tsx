import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Fullcalender from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGripPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { getAllEventAPI } from '../Services/EventService'
import { toast } from 'react-toastify'
import { title } from 'process'

type Props = {}

const HomeComponents = (props: Props) => {
    const navigate = useNavigate();
    const [EventData, setEventData] = useState<any[]>([]);
    const getStatusColor = (statusCode: number) => {
        switch (statusCode) {
            case 0: return '#2c5aa0';
            case 1: return '#1e7e34';
            case 2: return '#bd2130';
            case 3: return '#545b62';
            default: return '#0056b3';  
        }
    }
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getAllEventAPI();
                if (response && Array.isArray(response.data)) {
                    const data = response.data.map(x => ({
                        title: x.title,
                        start: x.startDateTime,
                        end: x.endDateTime,
                        allDay: false,
                        backgroundColor: getStatusColor(x.status)
                    }));
                    setEventData(data);
                }
            } catch (err) {
                toast.warning(err instanceof Error ? err.message : 'Unknown error');
            }
        };

        fetchEvents();
    }, []);
    
    return (
        <div className="pt-16">
            <div className="bg-gradient-to-r  py-12">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Manage Your Events
                    </h2>
                    <div className="w-full">
                        <Fullcalender
                            plugins={[dayGridPlugin, timeGripPlugin, interactionPlugin]}
                            initialView={"dayGridMonth"}
                            eventDisplay="block"
                            displayEventTime={true}
                            events={EventData}
                            eventTimeFormat={{
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true
                            }}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button 
                            onClick={() => navigate("/createEvent")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Create New Event
                        </button>
                        
                        <button 
                            onClick={() => navigate("/event")}
                            className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Check Events
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeComponents