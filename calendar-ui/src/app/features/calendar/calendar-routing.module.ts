import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Calendar } from "./calendar";
import { CalendarDayView } from "./views/calendar-day-view/calendar-day-view";
import { CalendarWeekView } from "./views/calendar-week-view/calendar-week-view";
import { CalendarMonthView } from "./views/calendar-month-view/calendar-month-view";
import { CalendarYearView } from "./views/calendar-year-view/calendar-year-view";

const routes: Routes = [
    {
        path: '',
        component: Calendar,
        children: [
            { path: 'day', component: CalendarDayView},
            { path: 'week', component: CalendarWeekView},
            { path: 'month', component: CalendarMonthView},
            { path: 'year', component: CalendarYearView}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalendarRoutingModule {}