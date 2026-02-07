import { ObjectiveService } from "../services/objective.service.ts";
import type { Objective } from "../models/objective.model.ts";
import { OpenAPIHono } from "@hono/zod-openapi"
import { ProvideObjectiveService } from "../services/providers-drizzle/drizzle-service-provider.ts";

const objectiveService = ProvideObjectiveService();
const objectiveApp: OpenAPIHono = new OpenAPIHono();

objectiveApp.get("/:id", async (c) => {
    const objectiveId = Number(c.req.param("id"));
    const objective = await objectiveService.GetObjectiveById(objectiveId);
    if (objective) {
        return c.json(objective);
    } else {
        return c.status(404);
    }
});

objectiveApp.post("/:id", async (c) => {
    const objectiveId = Number(c.req.param("id"));
    const body = await c.req.json();
    const objective = await objectiveService.CreateObjective({ ...body, id: objectiveId } as Objective);
    return c.json(objective);
});

objectiveApp.put("/:id", async (c) => {
    const objectiveId = Number(c.req.param("id"));
    const body = await c.req.json();
    const objective = await objectiveService.UpdateObjective({ ...body, id: objectiveId } as Objective);
    return c.json(objective);
});

objectiveApp.delete("/:id", async (c) => {
    const objectiveId = Number(c.req.param("id"));
    await objectiveService.DeleteObjective(objectiveId);
    return c.status(204);
});

export default objectiveApp;