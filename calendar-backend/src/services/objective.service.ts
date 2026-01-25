import type { Objective } from "../models/objective.model.ts";
import type { ObjectiveDrizzleRepository } from "../repositories/drizzle/objective.repository.drizzle.ts";

export class ObjectiveService {
    constructor(private readonly objectiveRepository: ObjectiveDrizzleRepository) {}

    public async CreateObjective(objective: Objective): Promise<Objective> {
        return this.objectiveRepository.CreateObjective(objective);
    }

    public async GetObjectiveById(objectiveId: number): Promise<Objective | null> {
        return this.objectiveRepository.GetObjectiveById(objectiveId);
    }

    public async UpdateObjective(objective: Objective): Promise<Objective> {
        return this.objectiveRepository.UpdateObjective(objective);
    }

    public async DeleteObjective(objectiveId: number): Promise<void> {
        return this.objectiveRepository.DeleteObjective(objectiveId);
    }
    
}
