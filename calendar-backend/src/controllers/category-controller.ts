import { OpenAPIHono } from "@hono/zod-openapi"
import { ProvideCategoryService } from "../services/providers-drizzle/drizzle-service-provider.ts";
import type { Category } from "../models/category.model.ts";
import { CategoryService } from "../services/category.service.ts";

const categoryService: CategoryService = ProvideCategoryService();
const categoryApp: OpenAPIHono = new OpenAPIHono();

categoryApp.get("/:id", async (c) => {
    const categoryId = Number(c.req.param("id"));
    const category = await categoryService.GetCategoryById(categoryId);
    if (category) {
        return c.json(category);
    } else {
        return c.status(404);
    }
});

categoryApp.post("/", async (c) => {
    const body = await c.req.json();

    const category = await categoryService.AddCategory(body as Category);
    return c.json(category);
});

categoryApp.put("/:id", async (c) => {
    const categoryId = Number(c.req.param("id"));
    const body = await c.req.json();
    const category = await categoryService.UpdateCategory({ ...body, id: categoryId } as Category);
    return c.json(category);
});

categoryApp.patch("/:id", async (c) => {
    const categoryId = Number(c.req.param("id"));
    const originalCategory = await categoryService.GetCategoryById(categoryId);
    if (!originalCategory) { return c.status(404); }

    const body = await c.req.json();
    const category = await categoryService.UpdateCategory({ ...originalCategory, ...body } as Category);
    return c.json(category);
});

categoryApp.delete("/:id", async (c) => {
    const categoryId = Number(c.req.param("id"));
    await categoryService.DeleteCategory(categoryId);
    return c.status(204);
});

export default categoryApp;
