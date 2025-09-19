import axios from "axios";
import { Event, CreateEventDto, UpdateEventDto } from '../Models/EventType';
import { toast } from "react-toastify";

const api = "http://localhost:5070/api"

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getAllEventAPI = async () => {
    try {
        const config = {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
        const data = await axios.get<Event>(api+ "/event", config)
        return data;
    } catch (error: any) {
        error.response.data[0].description ? toast.warning(error.response.data[0].description) : toast.warning("Please retry!");
    }
}

export const getEventByIdAPI = async (id: number) => {
    try {
        const config = {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
        const data = await axios.get<Event>(api+ "/event/"+id, config)
        return data;
    } catch (error: any) {
        error.response.data[0].description ? toast.warning(error.response.data[0].description) : toast.warning("Please retry!");
    }
}

export const deleteEventAPI = async (id: number, userId: string) => {
    try {
        const config = {
            userId: userId,
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
        const data = await axios.delete(api+ "/event/"+id, config)
        return data;
    } catch (error: any) {
        error.response.data[0].description ? toast.warning(error.response.data[0].description) : toast.warning("Please retry!");
    }
}

export const updateEventAPI = async (id: number, event: UpdateEventDto) => {
    try {
        const content = {
            title: event.title,
            description: event.description,
            location: event.location,
            startDateTime: event.startDateTime,
            endDateTime: event.endDateTime,
            isAllDay: event.isAllDay,
            status: event.status,
            userId: event.userId,
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
        const data = await axios.put(api+ "/event/" + id, content)

        return data
    } catch (error: any) {
        toast.warning("Please retry!");
    }
}

export const createEventAPI = async (event: UpdateEventDto) => {
    try {
        const content = {
            title: event.title,
            description: event.description,
            location: event.location,
            startDateTime: event.startDateTime,
            endDateTime: event.endDateTime,
            isAllDay: event.isAllDay,
            status: event.status,
            userId: event.userId,
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
        const data = await axios.post(api+ "/event", content)

        return data
    } catch (error: any) {
        toast.warning("Please retry!");
    }
}