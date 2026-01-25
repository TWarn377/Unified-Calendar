import { CalendarEvent } from "./calendar-event.model";

export interface EventGridItem {
  event: CalendarEvent;
  verticalIndex: number;
  horizontalIndex: number;
  height: number;
  width: number; // percentage string for CSS
}
