import React, { useState } from 'react'
import { CreateEventDto, UpdateEventDto } from '../Models/EventType';
import { toast } from 'react-toastify';
import { createEventAPI } from '../Services/EventService';
import {useNavigate } from 'react-router';

interface Event {
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

interface EventCardProps {
    onCreate: (event: CreateEventDto) => void;
}

const CreateEventCard : React.FC<EventCardProps> = () => {
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

    const getCurrentAndNextSecond = () => {
        const now = new Date();
        const oneSecondLater = new Date(now.getTime() + 1000);
        
        return {
            startDateTime: now.toISOString(),
            endDateTime: oneSecondLater.toISOString()
        };
    };

    const {startDateTime, endDateTime} = getCurrentAndNextSecond();
    const [editForm, setEditForm] = useState<UpdateEventDto>({
        title: '',
        description: '',
        location: '',
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        isAllDay: true,
        status: 0,
        userId: "",
    });

    const [isCreating, setIsCreating] = useState<boolean>(false);

    const formatDateTimeForInput = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    };
    
    const validateForm = (): boolean => {
        const errors: {[key: string]: string} = {};

        if (!editForm.title.trim()) {
        errors.title = 'Title is required';
        } else if (editForm.title.trim().length < 3) {
        errors.title = 'Title must be at least 3 characters';
        } else if (editForm.title.trim().length > 100) {
        errors.title = 'Title must be less than 100 characters';
        }

        if (!editForm.description.trim()) {
        errors.description = 'Description is required';
        } else if (editForm.description.trim().length < 5) {
        errors.description = 'Description must be at least 5 characters';
        } else if (editForm.description.trim().length > 500) {
        errors.description = 'Description must be less than 500 characters';
        }

        if (!editForm.location.trim()) {
        errors.location = 'Location is required';
        } else if (editForm.location.trim().length < 2) {
        errors.location = 'Location must be at least 2 characters';
        } else if (editForm.location.trim().length > 200) {
        errors.location = 'Location must be less than 200 characters';
        }

        const startDate = new Date(editForm.startDateTime);
        const endDate = new Date(editForm.endDateTime);
        const now = new Date();

        if (isNaN(startDate.getTime())) {
        errors.startDateTime = 'Start date is invalid';
        } else if (startDate < now) {
        errors.startDateTime = 'Start date cannot be in the past';
        }

        if (isNaN(endDate.getTime())) {
        errors.endDateTime = 'End date is invalid';
        } else if (endDate <= startDate) {
        errors.endDateTime = 'End date must be after start date';
        }

        if (![0, 1, 2, 3].includes(editForm.status)) {
        errors.status = 'Invalid status selected';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCancelEdit = () => {
        const {startDateTime, endDateTime} = getCurrentAndNextSecond();
        setEditForm({
        title: '',
        description: '',
        location: '',
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        isAllDay: true,
        status: 0,
        userId: ""
        });
        setValidationErrors({});
    };

    const handleCreate = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            setIsCreating(true)
            const postUserId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).userId : null;
            const eventDataWithUserId = {...editForm, userId: postUserId};
            await createEventAPI(eventDataWithUserId)
        } catch (error) {
            console.log('Error updating event:', error);
        } finally {
            setIsCreating(false)
            toast.success("Event Created!");
            navigate("/home");
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4 border border-blue-200">
            <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Create Event</h3>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    validationErrors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                />
                {validationErrors.title && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    validationErrors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={3}
                />
                {validationErrors.description && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                type="text"
                value={editForm.location}
                onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    validationErrors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                />
                {validationErrors.location && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.location}</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time</label>
                <input
                    type="datetime-local"
                    value={formatDateTimeForInput(editForm.startDateTime)}
                    onChange={(e) => setEditForm({...editForm, startDateTime: new Date(e.target.value).toISOString()})}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    validationErrors.startDateTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {validationErrors.startDateTime && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.startDateTime}</p>
                )}
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date & Time</label>
                <input
                    type="datetime-local"
                    value={formatDateTimeForInput(editForm.endDateTime)}
                    onChange={(e) => setEditForm({...editForm, endDateTime: new Date(e.target.value).toISOString()})}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    validationErrors.endDateTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {validationErrors.endDateTime && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.endDateTime}</p>
                )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({...editForm, status: parseInt(e.target.value)})}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    validationErrors.status ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                    <option value={0}>Tentative</option>
                    <option value={1}>Confirmed</option>
                    <option value={2}>Cancelled</option>
                    <option value={3}>Completed</option>
                </select>
                {validationErrors.status && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.status}</p>
                )}
                </div>
                <div className="flex items-center">
                <input
                    type="checkbox"
                    id="allDay"
                    checked={editForm.isAllDay}
                    onChange={(e) => setEditForm({...editForm, isAllDay: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="allDay" className="ml-2 text-sm text-gray-700">All Day Event</label>
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                Cancel
                </button>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                    Save
                </button>
            </div>
            </div>
        </div>
    )
}

export default CreateEventCard