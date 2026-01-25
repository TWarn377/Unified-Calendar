export interface CalendarEvent {
    id: number,
    title: string,
    categoryId: number,
    isImportant: boolean, /* Used to determine if events should be shown in the month view */
    location: string,
    url?: string,
    details: string,
    startDate: Date,
    endDate: Date,
}

export interface CalendarReminder {
    id: number,
    calendarEventId: number,
    time: Date,
    isDismissed: boolean,
    isCompleted: boolean,
}

/**
 * An Event Category is used to group Calendar Events by priority or theme.
 * Examples: Work Project (1:1s, Customer Meetings, Demos)
 */
export interface CalendarEventCategory {
    id: number,
    name: string,
    color: string,
    events?: Array<CalendarEvent>,
    objectiveId: number,
}

/** 
 * An Event Objective is used to classify different CalendarEventCategory(s)
 * Examples: Work - Project, Personal - Basketball Game/ Health Visit, Hobbies - Kitchen Remodel / Track Day, etc.
 */
export interface CalendarEventObjective {
    id: number,
    name: string,
    color: string,
    categories?: Array<CalendarEventCategory>
}
