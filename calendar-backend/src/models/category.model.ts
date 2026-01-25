export interface Category {
    id: number;
    createdOn?: Date;
    updatedOn?: Date;
    name: string;
    description?: string;
    color: string;
    objectiveId: number;
    objective?: 'Work' | 'Life' | 'Play';
}