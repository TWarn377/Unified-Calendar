import type { Event } from "../../models/event.model.ts";

export interface EventRepository {
    CreateEvent(event: Event): Promise<Event>;

    GetEventById(eventId: number): Promise<Event | null>;

    GetEventsWithinDates(startDate: Date, endDate: Date): Promise<Event[]>;

    UpdateEvent(event: Event): Promise<Event>;
    
    DeleteEvent(eventId: number): Promise<void>;
}
