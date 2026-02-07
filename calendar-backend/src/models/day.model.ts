export interface Day {
    id: number;
    date: Date;
    isHoliday: boolean;
    events: Event[];
}
