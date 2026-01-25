import { Routes } from '@angular/router';
import { Calendar } from './features/calendar/calendar';
import { CalendarDayView } from './features/calendar/views/calendar-day-view/calendar-day-view';
import { CalendarWeekView } from './features/calendar/views/calendar-week-view/calendar-week-view';
import { CalendarMonthView } from './features/calendar/views/calendar-month-view/calendar-month-view';
import { CalendarYearView } from './features/calendar/views/calendar-year-view/calendar-year-view';

export const routes: Routes = [
    { path: '', redirectTo: 'month', pathMatch: 'full' },
    {
        path: 'month',
        component: CalendarMonthView,
    },
    {
        path: 'week',
        component: CalendarWeekView,
    },
    {
        path: 'day',
        component: CalendarDayView,
    },
    {
        path: 'year',
        component: CalendarYearView,
    }
];
