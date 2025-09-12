import React, { useState } from 'react';
import { UpdateEventDto } from '../Models/EventType';
import { toast } from 'react-toastify';

// Define types for your data
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

interface EventCardProps {
  event: Event;
  onDelete: (eventId: number) => void;
  onUpdate: (eventId: number, eventData: UpdateEventDto) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onDelete, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [editForm, setEditForm] = useState<UpdateEventDto>({
    title: event.title,
    description: event.description,
    location: event.location,
    startDateTime: event.startDateTime,
    endDateTime: event.endDateTime,
    isAllDay: event.isAllDay,
    status: event.status,
  });


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 0: return 'Tentative';
      case 1: return 'Confirmed';
      case 2: return 'Cancelled';
      case 3: return 'Completed';
      default: return 'Unknown';
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: return 'bg-blue-100 text-blue-800';
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-red-100 text-red-800';
      case 3: return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(event.id);
      setShowConfirm(false);
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setIsDeleting(false);
    }
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

  const handleUpdate = async () => {
    if (!validateForm()) {
        return;
    }

    setIsUpdating(true);
    try {
            await onUpdate(event.id, editForm);
            setIsEditing(false);
            setValidationErrors({});
        } catch (error) {
            console.log('Error updating event:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancelEdit = () => {
    setEditForm({
      title: event.title,
      description: event.description,
      location: event.location,
      startDateTime: event.startDateTime,
      endDateTime: event.endDateTime,
      isAllDay: event.isAllDay,
      status: event.status,
    });
    setValidationErrors({});
    setIsEditing(false);
  };

  const formatDateTimeForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-4 border border-blue-200">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Event</h3>
          
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
              disabled={isUpdating}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
                Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
            {getStatusText(event.status)}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200"
            title="Edit event"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
            title="Delete event"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-red-800 font-medium">Delete Event</h4>
              <p className="text-red-600 text-sm">Are you sure you want to delete "{event.title}"? This action cannot be undone.</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors duration-200"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-200 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-gray-600 mb-4">{event.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Location</h3>
          <p className="text-gray-800">{event.location}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">All Day Event</h3>
          <p className="text-gray-800">{event.isAllDay ? 'Yes' : 'No'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Start Time</h3>
          <p className="text-gray-800">{formatDate(event.startDateTime)}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">End Time</h3>
          <p className="text-gray-800">{formatDate(event.endDateTime)}</p>
        </div>
      </div>

      {event.comments && event.comments.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Comments ({event.comments.length})
          </h3>
          <div className="space-y-3">
            {event.comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-2">{comment.content}</p>
                <div className="text-sm text-gray-500">
                  <span>Created: {formatDate(comment.createdOn)}</span>
                  {comment.updatedOn !== comment.createdOn && (
                    <span className="ml-4">Updated: {formatDate(comment.updatedOn)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};