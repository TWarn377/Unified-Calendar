import type { Week } from "./week.model.ts";

export interface Month {
    index: number;
    year: number;
    weeks: Week[];
}