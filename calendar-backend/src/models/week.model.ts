import type { Day } from "./day.model.ts";

export interface Week {
    index: number;
    month: number;
    year: number;
    days: Day[];
}
