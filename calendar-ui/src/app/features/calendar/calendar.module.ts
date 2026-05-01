import { NgModule } from "@angular/core";
import { Calendar } from "./calendar";
import { CalendarDayView } from "./views/calendar-day-view/calendar-day-view";
import { CalendarWeekView } from "./views/calendar-week-view/calendar-week-view";
import { CalendarMonthView } from "./views/calendar-month-view/calendar-month-view";
import { CommonModule } from "@angular/common";
import { CalendarRoutingModule } from "./calendar-routing.module";
import { CoreModule } from "../core/core-module";
import { CalendarEvent } from "./calendar-event/calendar-event";
import { CalendarHeader } from "./calendar-header/calendar-header";
import { CalendarFooter } from "./calendar-footer/calendar-footer";
import { MaterialModule } from "../../shared/material/material.module";
import { CalendarTaskViewBanner } from "./views/calendar-task-view/calendar-task-view-banner/calendar-task-view-banner";
import { CalendarWeekRow } from "./views/calendar-month-view/calendar-week-row/calendar-week-row";
import { CalendarDayCell } from "./views/calendar-month-view/calendar-day-cell/calendar-day-cell";
import { CalendarDayTimeline } from "./views/calendar-day-view/calendar-day-timeline/calendar-day-timeline";
import { CalendarDayTimelineEvent } from "./views/calendar-day-view/calendar-day-timeline/calendar-day-timeline-event/calendar-day-timeline-event";
import { CalendarYearView } from "./views/calendar-year-view/calendar-year-view";
import { TailwindDirectivesModule } from "../../shared/directives/tailwind/tailwind-directives.module";
import { AddEvent } from "./add-event/add-event";
import { provideHttpClient } from "@angular/common/http";

@NgModule({
    declarations: [
        AddEvent,
        Calendar,
        CalendarHeader,
        CalendarFooter,
        CalendarEvent,
        CalendarDayView,
        CalendarWeekView,
        CalendarMonthView,
        CalendarYearView,
        CalendarWeekRow,
        CalendarDayCell,
        CalendarTaskViewBanner,
        CalendarDayTimeline,
        CalendarDayTimelineEvent
    ],
    imports: [
    CoreModule,
    CommonModule,
    CalendarRoutingModule,
    MaterialModule,
    TailwindDirectivesModule,
    ],
    exports: [
        Calendar
    ],
    providers: [
        provideHttpClient()
    ]
})
export class CalendarModule {}