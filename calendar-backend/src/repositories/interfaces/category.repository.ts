import type { Category } from "../../models/category.model.ts";

export interface CategoryRepository {
    CreateCategory(category: Category): Promise<Category>;
    GetCategoryById(categoryId: number): Promise<Category | null>;
    GetCategoriesByIds(categoryIds: number[]): Promise<Category[]>;
    GetCategoriesForObjective(objectiveId: number): Promise<Category[]>;
    UpdateCategory(category: Category): Promise<Category>;
    DeleteCategory(categoryId: number): Promise<void>;
}