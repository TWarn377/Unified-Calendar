import type { EventDatabaseRecord } from "../../../infrastructure/internal-database/schemas/events.schema.ts"
import type { ObjectiveDatabaseRecord } from "../../../infrastructure/internal-database/schemas/objective.schema.ts"
import type { Event } from "../../../models/event.model.ts"
import type { Objective } from "../../../models/objective.model.ts"

export class DrizzleDatabaseToDomainMapper {
    public static MapDrizzleDatabaseToEvent(dbEvent: EventDatabaseRecord ): Event {
        return {
            id: dbEvent.id,
            createdOn: dbEvent.createdOn,
            updatedOn: dbEvent.updatedOn,
            categoryIds: dbEvent.categories,
            title: dbEvent.title,
            startDate: dbEvent.startDate,
            endDate: dbEvent.endDate,
            location: dbEvent.location,
            description: dbEvent.description,
            source: this.ValidateEventSource(dbEvent.source),
        }
    }

    public static MapDrizzleDatabaseToCategory(dbCategory: any ): any {
        return {
            id: dbCategory.id,
            name: dbCategory.name,
            color: dbCategory.color,
            description: dbCategory.description
        }
    }

    public static MapDrizzleDatabaseToObjective(dbObjective: ObjectiveDatabaseRecord ): Objective {
        return {
            id: dbObjective.id,
            name: dbObjective.name,
            description: dbObjective.description,
            color: dbObjective.color
        }
    }

    public static ValidateEventSource(source: string): 'Internal' {
        let validatedSource: 'Internal' = 'Internal';
        switch (source) {
            case 'Internal':
                validatedSource = 'Internal';
                break;
            default:
                throw new Error(`Unsupported Event Source: ${source}`);
        }

        return validatedSource;
    }
}