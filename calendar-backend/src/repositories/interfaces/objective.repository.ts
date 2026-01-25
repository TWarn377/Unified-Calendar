
export interface EventRepository {
    createEvent(event: Event): Promise<Event>;
    getEventById(eventId: number): Promise<Event | null>;
    getEventsWithinDates(startDate: Date, endDate: Date): Promise<Event[]>;
    updateEvent(event: Event): Promise<Event>;
}