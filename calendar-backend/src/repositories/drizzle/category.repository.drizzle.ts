import { db } from "../../infrastructure/internal-database/db.ts";
import type { Category } from "../../models/category.model.ts";
import { categorySchema, type CategoryDatabaseRecord } from "../../infrastructure/internal-database/schemas/category.schema.ts";
import { DomainToDrizzleDatabaseMapper } from "./mapper/domain-to-database.mapper.ts";
import { DrizzleDatabaseToDomainMapper } from "./mapper/database-to-domain.mapper.ts";
import { between, eq, or, inArray} from "drizzle-orm";
import type { CategoryRepository } from "../interfaces/category.repository.ts";


export class CategoryDrizzleRepository implements CategoryRepository {

    public async CreateCategory(category: Category): Promise<Category> {
        const result: CategoryDatabaseRecord[] =  await db
            .insert(categorySchema)
            .values(DomainToDrizzleDatabaseMapper.MapCategoryToDatabase(category))
            .returning() as CategoryDatabaseRecord[];

        return DrizzleDatabaseToDomainMapper.MapDrizzleDatabaseToCategory(result[0]);
    }

    public async GetCategoryById(categoryId: number): Promise<Category | null> {
        const results: CategoryDatabaseRecord[] = await db
            .select()
            .from(categorySchema)
            .where(eq(categorySchema.id, categoryId)) as CategoryDatabaseRecord[];

        return results.length > 0 ? DrizzleDatabaseToDomainMapper.MapDrizzleDatabaseToCategory(results[0]) : null;
    }

    public async GetCategoriesByIds(categoryIds: number[]): Promise<Category[]> {
        const results: CategoryDatabaseRecord[] = await db
            .select()
            .from(categorySchema)
            .where(inArray(categorySchema.id, categoryIds)) as CategoryDatabaseRecord[];

        return results.map(result => DrizzleDatabaseToDomainMapper.MapDrizzleDatabaseToCategory(result));
    }

    public async GetCategoriesForObjective(objectiveId: number): Promise<Category[]> {
        const results: CategoryDatabaseRecord[] = await db
            .select()
            .from(categorySchema)
            .where(eq(categorySchema.objectiveId, objectiveId)) as CategoryDatabaseRecord[];

        return results.map(result => DrizzleDatabaseToDomainMapper.MapDrizzleDatabaseToCategory(result));
    }

    public async UpdateCategory(category: Category): Promise<Category> {
        const result: CategoryDatabaseRecord[] = await db
            .update(categorySchema)
            .set(DomainToDrizzleDatabaseMapper.MapCategoryToDatabase(category))
            .where(eq(categorySchema.id, category.id))
            .returning() as CategoryDatabaseRecord[];

        return DrizzleDatabaseToDomainMapper.MapDrizzleDatabaseToCategory(result[0]);
    }

    public async DeleteCategory(categoryId: number): Promise<void> {
        await db.delete(categorySchema).where(eq(categorySchema.id, categoryId));
    }

}
