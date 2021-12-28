import type { ICalendarEvent } from 'rn-smartsuite-big-calendar';
import type { HorizontalDirection } from 'rn-smartsuite-big-calendar';
import type dayjs from 'dayjs';

export interface CalendarListProps<T> {
  events: ICalendarEvent<T>[];
  dateRange: dayjs.Dayjs[];
  activeColor: string;
  onSwipeHorizontal?: (d: HorizontalDirection) => void;
}
