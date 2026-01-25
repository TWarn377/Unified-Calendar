export class DateUtilities {
  /**
   * Returns the count for the number of days in a month.
   * @param date The Date containing the month to get the number of days from.
   * @returns The number of days in the specified month.
   */
  public static getDaysInMonthCount(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  /**
   * Returns the count for the number of weeks in a month - always returns a whole number (rounds up).
   * @param date The Date containing the month to get the number of weeks from.
   * @returns The number of weeks in the specified month.
   */
  public static getWeeksInMonthCount(date: Date): number {
    return Math.ceil(this.getDaysInMonthCount(date) / 7);
  }

  /**
   * Returns the names of the days in a week.
   * @returns The names of days in a week.
   */
  public static getDayNamesInWeek(): Array<string> {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }

  /**
   * Returns the names of the days in a week.
   * @returns The names of days in a week.
   */
  public static getShortDayNamesInWeek(): Array<string> {
    return ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
  }

  /**
   * Gets the long month name for the specified date.
   * @param date The date to get the long month name for.
   * @returns The long month name for the specified date.
   */
  public static getLongMonthName(date: Date): string {
    return date.toLocaleDateString('en-Us', { month: 'long' });
  }

  /**
   * Gets the short month name for the specified date.
   * @param date The date to get the short month name for.
   * @returns The short month name for the specified date.
   */
  public static getShortMonthName(date: Date): string {
    return date.toLocaleDateString('en-Us', { month: 'short' });
  }

  /**
   * Returns the number of the first day in the week for the specified date.
   * @param date The Date containing the week to get the first day from.
   * @returns The numeric day that Sunday falls on for the week.
   */
  public static getFirstDayOfWeek(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
  }

    /**
   * Returns the zero/Sunday-based index of the current week in the month based on a 7 day week.
   * @param date The Date to get the week index for
   * @returns A zero-based index of the current week in the month.
   */
  public static getWeekIndexInMonth(date: Date): number {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    return Math.floor((date.getDate() - 1 + firstDayOfMonth.getDay()) / 7);
  };

  /**
   *  Determines if the month has changed between two dates.
   * @param previousDate The previous date to compare.
   * @param currentDate The current date to compare.
   * @returns True if the month has changed, false otherwise.
   */
  public static isMonthChanged(previousDate: Date | null, currentDate: Date): boolean {
    return previousDate ? previousDate.getMonth() !== currentDate.getMonth() : false;
  };

  /**
   * Determines if the week has changed between two dates.
   * @param previousDate The previous date to compare.
   * @param currentDate The current date to compare.
   * @returns True if the week has changed, false otherwise.
   */
  public static isWeekChanged(previousDate: Date | null, currentDate: Date): boolean {
    return previousDate ? this.getWeekIndexInMonth(previousDate) !== this.getWeekIndexInMonth(currentDate) : false;
  };

  /**
   * Determines if the day of the week has changed between two dates.
   * @param previousDate The previous date to compare.
   * @param currentDate The current date to compare.
   * @returns True if the day of the week has changed, false otherwise.
   */
  public static isDayOfWeekChanged(previousDate: Date | null, currentDate: Date): boolean {
    return previousDate ? previousDate.getDay() !== currentDate.getDay() : false;
  };

  /**
   * Determines if the day has changed between two dates.
   * @param previousDate The previous date to compare.
   * @param currentDate The current date to compare.
   * @returns True if the day has changed, false otherwise.
   */
  public static isDayChanged(previousDate: Date | null, currentDate: Date): boolean {
    return previousDate ? previousDate.getDate() !== currentDate.getDate() : false;
  };
}
