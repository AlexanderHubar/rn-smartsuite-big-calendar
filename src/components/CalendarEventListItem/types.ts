import type { ICalendarEvent } from 'rn-smartsuite-big-calendar';

export interface CalendarEventItemProps<T> {
  event: any;
  ampm?: boolean;
  onPress?: (event: ICalendarEvent<T>) => void;
}
