import { CalendarDay } from "./calendar-day.model";
export interface CalendarWeek {
    /* The index of the week within the month (0 based). */
    weekNumber: number;

    /* The days in the week (includes events). */
    days: Array<CalendarDay>;
}