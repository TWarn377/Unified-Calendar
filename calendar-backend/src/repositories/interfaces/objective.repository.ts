import type { Objective } from "../../models/objective.model.ts";

export interface ObjectiveRepository {
    CreateObjective(objective: Objective): Promise<Objective>;
    GetObjectiveById(objectiveId: number): Promise<Objective | null>;
    UpdateObjective(objective: Objective): Promise<Objective>;
    DeleteObjective(objectiveId: number): Promise<void>;
}