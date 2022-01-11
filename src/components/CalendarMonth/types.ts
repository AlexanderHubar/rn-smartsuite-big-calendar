import type { ICalendarEvent } from 'rn-smartsuite-big-calendar';
import type dayjs from 'dayjs';
import type { HorizontalDirection } from 'rn-smartsuite-big-calendar';
import type { MutableRefObject } from 'react';
import type { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';

export interface CalendarMonthProps<T> {
  ampm?: boolean;
  calendarRef: MutableRefObject<any | null>;
  events: ICalendarEvent<T>[];
  dateRange: dayjs.Dayjs[];
  targetDate: Date | dayjs.Dayjs;
  todayDate: Date | dayjs.Dayjs;
  activeColor: string;
  onEventPress?: (event: ICalendarEvent<T>) => void;
  onSwipeHorizontal?: (d: HorizontalDirection) => void;
}

export type MarkedDatesType = {
  [key: string]: MarkingProps;
};
