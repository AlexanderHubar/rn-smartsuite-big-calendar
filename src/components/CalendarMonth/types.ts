import type { ICalendarEvent } from 'rn-smartsuite-big-calendar';
import type dayjs from 'dayjs';
import type { HorizontalDirection } from 'rn-smartsuite-big-calendar';
import type { MutableRefObject } from 'react';

export interface CalendarMonthProps<T> {
  calendarRef: MutableRefObject<any | null>;
  events: ICalendarEvent<T>[];
  dateRange: dayjs.Dayjs[];
  targetDate: Date | dayjs.Dayjs;
  activeColor: string;
  onEventPress?: (event: ICalendarEvent<T>) => void;
  onSwipeHorizontal?: (d: HorizontalDirection) => void;
}
