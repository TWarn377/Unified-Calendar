import type { Category } from "./category.model.ts";

export interface Event {
    id: number;
    title: string;
    createdOn?: Date;
    updatedOn?: Date;
    categoryIds: number[];
    categories?: Category[];
    startDate: Date;
    endDate: Date;
    location?: string;
    description?: string;
    source: 'Internal';
}