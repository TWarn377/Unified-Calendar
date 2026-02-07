import  { OpenAPIHono } from "@hono/zod-openapi";
import CategoryController from "./controllers/category-controller.ts";
import EventController from "./controllers/event-controller.ts";
import ObjectiveController from "./controllers/objective-controller.ts";

const app: OpenAPIHono = new OpenAPIHono();

app.route("/categories", CategoryController);
app.route("/events", EventController);
app.route("/objectives", ObjectiveController);

export default app;