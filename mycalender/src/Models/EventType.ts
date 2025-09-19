export interface Comment {
  id: number;
  content: string;
  createdOn: string;
  updatedOn: string;
  eventId: number;
}

export interface Event {
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

export interface CreateEventDto {
  title: string;
  description: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  isAllDay: boolean;
  status: number;
  userId: string;
}

export interface UpdateEventDto {
  title: string;
  description: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  isAllDay: boolean;
  status: number;
  userId: string;
}