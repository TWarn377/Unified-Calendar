import type { CategoryDatabaseRecord } from "../../../infrastructure/internal-database/schemas/category.schema.ts";
import type { EventDatabaseRecord } from "../../../infrastructure/internal-database/schemas/events.schema.ts";
import type { ObjectiveDatabaseRecord } from "../../../infrastructure/internal-database/schemas/objective.schema.ts";
import type { Category } from "../../../models/category.model.ts";
import type { Event } from "../../../models/event.model.ts";
import type { Objective } from "../../../models/objective.model.ts";
import { DrizzleDatabaseToDomainMapper } from "./database-to-domain.mapper.ts";

export class DomainToDrizzleDatabaseMapper {
    public static MapEventToDatabase(domainEvent: Event ): EventDatabaseRecord {

        return {
            id: domainEvent.id,
            createdOn: domainEvent.createdOn || new Date(),
            updatedOn: domainEvent.updatedOn || new Date(),
            categories: domainEvent.categoryIds,
            title: domainEvent.title,
            startDate: domainEvent.startDate,
            endDate: domainEvent.endDate,
            location: domainEvent.location,
            description: domainEvent.description,
            source: DrizzleDatabaseToDomainMapper.ValidateEventSource(domainEvent.source),
        }
    }
    
    public static MapCategoryToDatabase(domainCategory: Category ): CategoryDatabaseRecord {
        return {
            id: domainCategory.id,
            createdOn: domainCategory.createdOn,
            updatedOn: domainCategory.updatedOn,
            name: domainCategory.name,
            description: domainCategory.description,
            color: domainCategory.color
        }
    }

    public static MapObjectiveToDatabase(domainObjective: Objective ): ObjectiveDatabaseRecord {
        return {
            id: domainObjective.id,
            name: domainObjective.name,
            description: domainObjective.description,
            color: domainObjective.color
        }
    }


}