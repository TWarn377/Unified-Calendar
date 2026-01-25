import { db } from "../../infrastructure/internal-database/db.ts";
import { eventSchema, type EventDatabaseRecord } from "../../infrastructure/internal-database/schemas/events.schema.ts";
import type { Event } from "../../models/event.model.ts";
import type { EventRepository } from "../interfaces/event.repository.ts";
import { DrizzleDatabaseToDomainMapper } from "./mapper/database-to-domain.mapper.ts";
import { DomainToDrizzleDatabaseMapper } from "./mapper/domain-to-database.mapper.ts";
import { between, eq, or} from "drizzle-orm";

/**
 * Repository for managing Event entities in the database using Drizzle ORM.
 */
export class EventDrizzleRepository implements EventRepository {

    /**
     * Creates a new event in the database.
     * @param event The event to create.
     * @returns The created event.
     */
    public async CreateEvent(event: Event): Promise<Event> {
        const results: EventDatabaseRecord[] = await db
            .insert(eventSchema)
            .values(DomainToDrizzleDatabaseMapper.MapEventToDatabase(event))
            .returning() as EventDatabaseRecord[];

        return DrizzleDatabaseToDomainMapper.MapDrizzleDatabaseToEvent(results[0]);
    }

    /**
     * Gets an event by its ID.
     * @param EventId The ID of the event to retrieve.
     * @returns The event with the specified ID, or null if not found.
     */
    public async GetEventById(EventId: number): Promise<Event | null> {
        const results: EventDatabaseRecord[] = await db
            .select()
            .from(eventSchema)
            .where(eq(eventSchema.id, EventId)) as EventDatabaseRecord[];

        return results.length > 0 ? 
            DrizzleDatabaseToDomainMapper.MapDrizzleDatabaseToEvent(results[0]) 
            : null;
    }

    /**
     * Gets all events that start or end within the specified date range.
     * @param startDate The start date of the range.
     * @param endDate The end date of the range.
     * @returns Events within the specified date range.
     */
    public async GetEventsWithinDates(startDate: Date, endDate: Date): Promise<Event[]> {
        const results: EventDatabaseRecord[] = await db
            .select()
            .from(eventSchema)
            .where(
                or(
                    between(eventSchema.startDate, startDate, endDate),
                    between(eventSchema.endDate, startDate, endDate),
            )) as EventDatabaseRecord[];

        return results.map(result => DrizzleDatabaseToDomainMapper.MapDrizzleDatabaseToEvent(result));
    }

    /**
     * Updates an existing event in the database.
     * @param event The event to update.
     * @returns The updated event.
     */
    public async UpdateEvent(event: Event): Promise<Event> {
        const results: EventDatabaseRecord[] = await db
            .update(eventSchema)
            .set(DomainToDrizzleDatabaseMapper.MapEventToDatabase(event))
            .where(eq(eventSchema.id, event.id)) 
            .returning() as EventDatabaseRecord[];

        return DrizzleDatabaseToDomainMapper.MapDrizzleDatabaseToEvent(results[0]);
    }

    public async DeleteEvent(eventId: number): Promise<void> {
        await db.delete(eventSchema).where(eq(eventSchema.id, eventId));
    }
}