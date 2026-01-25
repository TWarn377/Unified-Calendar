import { db } from "../../infrastructure/internal-database/db.ts";
import { objectiveSchema, type ObjectiveDatabaseRecord } from "../../infrastructure/internal-database/schemas/objective.schema.ts";
import type { Objective } from "../../models/objective.model.ts";
import { DrizzleDatabaseToDomainMapper } from "./mapper/database-to-domain.mapper.ts";
import { DomainToDrizzleDatabaseMapper } from "./mapper/domain-to-database.mapper.ts";
import { eq } from "drizzle-orm";


export class ObjectiveRepository implements ObjectiveRepository {
    async createObjective(objective: Objective): Promise<Objective> {
        const result: ObjectiveDatabaseRecord[] =  await db
            .insert(objectiveSchema)
            .values(DomainToDrizzleDatabaseMapper.MapObjectiveToDatabase(objective))
            .returning() as ObjectiveDatabaseRecord[];

        return DrizzleDatabaseToDomainMapper.MapDrizzleDatabaseToObjective(result[0]);
    }

    async getObjectiveById(objectiveId: number): Promise<Objective | null> {
        const results: ObjectiveDatabaseRecord[] = await db
            .select()
            .from(objectiveSchema)
            .where(eq(objectiveSchema.id, objectiveId)) as ObjectiveDatabaseRecord[];

        return results.length > 0 ? 
            DrizzleDatabaseToDomainMapper.MapDrizzleDatabaseToObjective(results[0]) 
            : null;

    }

    async updateObjective(objective: Objective): Promise<Objective> {
        const result: ObjectiveDatabaseRecord[] = await db
            .update(objectiveSchema)
            .set(DomainToDrizzleDatabaseMapper.MapObjectiveToDatabase(objective))
            .where(eq(objectiveSchema.id, objective.id))
            .returning() as ObjectiveDatabaseRecord[];

        return DrizzleDatabaseToDomainMapper.MapDrizzleDatabaseToObjective(result[0]);
    }
}
