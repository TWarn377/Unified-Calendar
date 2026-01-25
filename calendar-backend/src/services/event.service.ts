import type { Event } from "../models/event.model.ts";
import { EventDrizzleRepository } from "../repositories/drizzle/event.repository.drizzle.ts";

export class EventService {
    constructor(private readonly eventRepository: EventDrizzleRepository) {}

    public async CreateEvent(event: Event): Promise<Event> {
        return this.eventRepository.CreateEvent(event);
    }

    public async GetEventById(eventId: number): Promise<Event | null> {
        return this.eventRepository.GetEventById(eventId);
    }

    public async GetEventsWithinDates(startDate: Date, endDate: Date): Promise<Event[]> {
        return this.eventRepository.GetEventsWithinDates(startDate, endDate);
    }

    public async UpdateEvent(event: Event): Promise<Event> {
        return this.eventRepository.UpdateEvent(event);
    }

    public async DeleteEvent(eventId: number): Promise<void> {
        return this.eventRepository.DeleteEvent(eventId);
    }
}
