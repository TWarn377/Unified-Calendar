import { EventService } from "../event.service.ts";
import { EventDrizzleRepository } from "../../repositories/drizzle/event.repository.drizzle.ts";
import { CategoryService } from "../category.service.ts";
import { CategoryDrizzleRepository } from "../../repositories/drizzle/category.repository.drizzle.ts";
import { ObjectiveDrizzleRepository } from "../../repositories/drizzle/objective.repository.drizzle.ts";
import { ObjectiveService } from "../objective.service.ts";

export const ProvideEventService = function () {
  const eventRepository = new EventDrizzleRepository();
  const eventService = new EventService(eventRepository);
  return eventService;
};

export const ProvideCategoryService = function () {
  const categoryRepository = new CategoryDrizzleRepository();
  const categoryService = new CategoryService(categoryRepository);
  return categoryService;
};

export const ProvideObjectiveService = function () {
  const objectiveRepository = new ObjectiveDrizzleRepository();
  const objectiveService = new ObjectiveService(objectiveRepository);
  return objectiveService;
};
