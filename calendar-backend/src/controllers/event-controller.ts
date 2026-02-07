import { EventService } from "../services/event.service.ts";
import type { Event } from "../models/event.model.ts";
import { OpenAPIHono } from "@hono/zod-openapi"
import { ProvideEventService } from "../services/providers-drizzle/drizzle-service-provider.ts";


const eventService: EventService = ProvideEventService();
const eventsApp: OpenAPIHono = new OpenAPIHono();

eventsApp.get("/:id", async (c) => { 
            const eventId = Number(c.req.param("id"));
            const event = await eventService.GetEventById(eventId);
            if (event) {
                return c.json(event);
            } else {
                return c.status(404);
            }

        });

eventsApp.post("/:id", async (c) => { 
            const eventId = Number(c.req.param("id"));
            const body = await c.req.json();
            const event = await eventService.CreateEvent({ ...body, id: eventId } as Event);
            return c.json(event);
        });

eventsApp.put("/:id", async (c) => { 
            const eventId = Number(c.req.param("id"));
            const body = await c.req.json();
            const event = await eventService.UpdateEvent({ ...body, id: eventId } as Event);
            return c.json(event);
        });

eventsApp.delete("/:id", async (c) => { 
            const eventId = Number(c.req.param("id"));
            await eventService.DeleteEvent(eventId);
            return c.status(204);
        });

export default eventsApp ;