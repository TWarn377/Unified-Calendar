import type { Category } from "../../models/category.model.ts";

export interface CategoryRepository {
    createCategory(category: Category): Promise<Category>;
    getCategoryById(categoryId: number): Promise<Category | null>;
    getCategoriesByIds(categoryIds: number[]): Promise<Category[]>;
    getCategoriesForObjective(objectiveId: number): Promise<Category[]>;
    updateCategory(category: Category): Promise<Category>;
    deleteCategory(categoryId: number): Promise<void>;
}