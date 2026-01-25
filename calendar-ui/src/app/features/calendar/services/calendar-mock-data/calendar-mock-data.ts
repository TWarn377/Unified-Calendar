import { Injectable } from '@angular/core';
import { DateService } from '../date-service/date-service';
import { CalendarService } from '../calendar-service/calendar-service';
import {
  CalendarEvent,
  CalendarEventCategory,
  CalendarEventObjective,
} from '../../models/calendar-event.model';
import { CalendarWeek } from '../../models/calendar-week.model';
import { CalendarDay } from '../../models/calendar-day.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarMockData {
  constructor() {}

  private readonly MAX_EVENTS_PER_DAY = 10; 

  // private date: Date | null = null;
  // private currentMonthSubject: BehaviorSubject<Array<CalendarWeek>> = new BehaviorSubject<
  //   Array<CalendarWeek>
  // >([]);
  // public currentMonth$ = this.currentMonthSubject.asObservable();

  //   private generateMonth(date: Date): Array<CalendarWeek> {
  //     const weeksInMonth = this.calendarService.fetchWeeksInMonth(date);

  //     const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  //     const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  //     const events = getMockEventsForDateRange(startDate, endDate);

  //     weeksInMonth.forEach((week: CalendarWeek) => {
  //       week.days.forEach((day: CalendarDay) => {
  //         day.events = events.filter(event =>
  //           event.startDate.getMonth() === date.getMonth()
  //           && event.startDate.getDate() === day.date.getDate())
  //       })
  //     });
  //     return weeksInMonth;
  //   }
  // }

  public getMockEventsForDateRange(startDate: Date, endDate: Date): Array<CalendarEvent> {
    // Get mock event start times and durations
    const eventSlots: Array<{ eventStartDate: Date; durationInMinutes: number }> =
      this.getEventStartTimesAndDurations(startDate, endDate);

    const eventsData: Array<CalendarEvent> = eventSlots.map((slot, index) => {
      const { startDate, endDate } = this.getEventTimesFromDuration(
        slot.eventStartDate,
        slot.durationInMinutes
      );
      const randomEventIndex = Math.floor(Math.random() * MOCK_CALENDAR_EVENTS.length);
      const randomEvent: CalendarEvent = { ...MOCK_CALENDAR_EVENTS[randomEventIndex] };
      randomEvent.id = index;
      return {
        ...randomEvent,
        startDate,
        endDate,
      };
    });

    return eventsData;
  }

  private getEventStartTimesAndDurations(
    startDate: Date,
    endDate: Date
  ): Array<{ eventStartDate: Date; durationInMinutes: number }> {
    let currentDate = new Date(startDate);
    const eventDates: Array<{ eventStartDate: Date; durationInMinutes: number }> = [];

    while (currentDate <= endDate) {
      const numberOfEventsToday: number = Math.floor(Math.random() * this.MAX_EVENTS_PER_DAY); 
      const startHoursForEvents: Array<number> = Array.from(
        { length: numberOfEventsToday },
        () => Math.floor(Math.random() * 9) + 8
      ); // Events between 8 AM and 5 PM

      for (let i = 0; i < numberOfEventsToday; i++) {
        const eventStartDate: Date = new Date(
          new Date(currentDate).setHours(startHoursForEvents[i], 0, 0, 0)
        );
        const durationInMinutes: number = (Math.floor(Math.random() * 4) + 1) * 30; // Durations of 30, 60, 90, or 120 minutes

        eventDates.push({ eventStartDate, durationInMinutes });
      }

      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );
    }
    return eventDates;
  }

  /**
   * Used to get the CalendarEvent startDate and endDate based on provided startDate and duration.
   * @param eventStart The starting Date and Time of the CalendarEvent.
   * @param durationInMinutes The duration of the CalendarEvent in minutes.
   * @returns The startDate and endDate of the CalendarEvent.
   */
  private getEventTimesFromDuration(
    eventStart: Date,
    durationInMinutes: number
  ): { startDate: Date; endDate: Date } {
    const startDate = new Date(eventStart);
    const endDate = new Date(
      new Date(eventStart).setMinutes(startDate.getMinutes() + durationInMinutes)
    );

    return { startDate, endDate };
  }
}

export const CALENDAR_OBJECTIVE_CATEGORY_MAP: { [key: number]: number[] } = {
  "1": [7, 8, 9, 10],
  "2": [1, 2, 3, 4, 5, 6],
  "3": [11, 12, 13, 14, 15]
};

export const CALENDAR_EVENT_CATEGORIES: CalendarEventCategory[] = [
  { id: 1, name: 'Kickoffs', color: '#FF5733', objectiveId: 2 },
  { id: 2, name: '1:1 Meetings', color: '#33C1FF', objectiveId: 2 },
  { id: 3, name: 'Demos', color: '#33FF8A', objectiveId: 2 },
  { id: 4, name: 'Design Review', color: '#FF33A8', objectiveId: 2 },
  { id: 5, name: 'Code Review', color: '#FFD433', objectiveId: 2 },
  { id: 6, name: 'Deadline Check', color: '#8A33FF', objectiveId: 2 },
  { id: 7, name: 'Dentist', color: '#338AFF', objectiveId: 1 },
  { id: 8, name: 'Physical Therapy', color: '#FF8A33', objectiveId: 1 },
  { id: 9, name: 'Budgeting', color: '#33FFA8', objectiveId: 1 },
  { id: 10, name: 'Allowance', color: '#FF3380', objectiveId: 1 },
  { id: 11, name: 'Practice', color: '#3380FF', objectiveId: 3 },
  { id: 12, name: 'Games', color: '#FF8033', objectiveId: 3 },
  { id: 13, name: 'Sprint Sessions', color: '#33FF80', objectiveId: 3 },
  { id: 14, name: 'Kitchen Remodel', color: '#8033FF', objectiveId: 3 },
  { id: 15, name: 'Bathroom Renovation', color: '#FF3380', objectiveId: 3 },
];

const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 1,
    title: 'Apollo Kickoff',
    categoryId: 1,
    isImportant: true,
    location: 'Conference Room A',
    details: 'Initial project kickoff with stakeholders',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 2,
    title: 'Design Review',
    categoryId: 1,
    isImportant: false,
    location: 'Zoom',
    details: 'Review designs for module X',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 3,
    title: '1:1 with Manager',
    categoryId: 2,
    isImportant: false,
    location: 'Manager Office',
    details: 'Weekly sync',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 4,
    title: 'Team Standup',
    categoryId: 3,
    isImportant: false,
    location: 'Slack Huddle',
    details: 'Daily standup',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 5,
    title: 'Dentist Appointment',
    categoryId: 4,
    isImportant: true,
    location: 'Smile Dental',
    details: 'Routine cleaning',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 6,
    title: 'Budget Review',
    categoryId: 5,
    isImportant: false,
    location: 'Home Office',
    details: 'Monthly budgeting tasks',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 7,
    title: 'Fix Basement Lighting',
    categoryId: 6,
    isImportant: false,
    location: 'Basement',
    details: 'Replace bulbs and wiring',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 8,
    title: 'Basketball Practice',
    categoryId: 7,
    isImportant: false,
    location: 'Community Gym',
    details: 'Practice shooting drills',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 9,
    title: 'Track Event',
    categoryId: 8,
    isImportant: true,
    location: 'Local Track',
    details: 'Quarter mile sprint session',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 10,
    title: 'Cabinet Installation',
    categoryId: 9,
    isImportant: true,
    location: 'Kitchen',
    details: 'Install new cabinets',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 11,
    title: 'Project Apollo Weekly Sync',
    categoryId: 1,
    isImportant: false,
    location: 'Teams',
    details: 'Weekly status update',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 12,
    title: 'Apollo Client Demo',
    categoryId: 1,
    isImportant: true,
    location: 'Client HQ',
    details: 'Demo new features',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 13,
    title: '1:1 with Direct Report',
    categoryId: 2,
    isImportant: false,
    location: 'Office',
    details: 'Monthly performance review',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 14,
    title: 'Physical Therapy',
    categoryId: 4,
    isImportant: true,
    location: 'Therapy Center',
    details: 'Follow-up session',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 15,
    title: 'Pay Credit Card Bill',
    categoryId: 5,
    isImportant: true,
    location: 'Online',
    details: 'Due before 5 PM',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 16,
    title: 'Replace Bathroom Faucet',
    categoryId: 6,
    isImportant: false,
    location: 'Bathroom',
    details: 'Install new faucet',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 17,
    title: 'Basketball Game vs Rivals',
    categoryId: 7,
    isImportant: true,
    location: 'Gymnasium',
    details: 'Evening game',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 18,
    title: 'Track Sprint Practice',
    categoryId: 8,
    isImportant: false,
    location: 'Track',
    details: 'Speed work',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 19,
    title: 'Paint Kitchen Walls',
    categoryId: 9,
    isImportant: false,
    location: 'Kitchen',
    details: 'Apply 2 coats',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 20,
    title: 'Apollo Retrospective',
    categoryId: 1,
    isImportant: false,
    location: 'Zoom',
    details: 'Sprint retrospective meeting',
    startDate: new Date(),
    endDate: new Date(),
  },
];
