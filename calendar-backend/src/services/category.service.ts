import type { Category } from "../models/category.model.ts";
import { CategoryDrizzleRepository } from "../repositories/drizzle/category.repository.drizzle.ts";

export class CategoryService {
    constructor(private readonly categoryRepository: CategoryDrizzleRepository) {}

    public async AddCategory(category: Category): Promise<Category> {
        return this.categoryRepository.CreateCategory(category);
    }

    public async GetCategoryById(categoryId: number): Promise<Category | null> {
        return this.categoryRepository.GetCategoryById(categoryId);
    }

    public async GetCategoriesByIds(categoryIds: number[]): Promise<Category[]> {
        return this.categoryRepository.GetCategoriesByIds(categoryIds);
    }

    public async GetCategoriesForObjective(objectiveId: number): Promise<Category[]> {
        return this.categoryRepository.GetCategoriesForObjective(objectiveId);
    }

    public async UpdateCategory(category: Category): Promise<Category> {
        return this.categoryRepository.UpdateCategory(category);
    }

    public async DeleteCategory(categoryId: number): Promise<void> {
        return this.categoryRepository.DeleteCategory(categoryId);
    }
}
