import type { ReactElement } from 'react';
import type { RecursiveArray, ViewStyle } from 'react-native';

import type { CalendarHeaderProps } from './components/CalendarHeader';
import type { CalendarHeaderForMonthViewProps } from './components/CalendarHeaderForMonthView';

export enum FieldType {
  firstcreatedfield = 'firstcreatedfield',
  lastupdatedfield = 'lastupdatedfield',
  datefield = 'datefield',
  daterangefield = 'daterangefield',
  duedatefield = 'duedatefield',
}

export interface DateObject {
  date: string | null;
  include_time: boolean;
}

export interface StatusResult {
  value: string;
  updated_on: string;
}

export interface DueDateStatus {
  statusResult: StatusResult;
  isComplete: boolean;
}

export interface ICalendarEventBase {
  recordTitle: string;
  fieldLabel: string;
  color: string;
  fieldType: string;
  toDate: DateObject | null;
  fromDate: DateObject;
  slug: string;
  recordId: string;
  children?: ReactElement | null;
  dueDateStatus?: DueDateStatus;
}

export type CalendarTouchableOpacityProps = {
  delayPressIn: number;
  key: string;
  style: RecursiveArray<ViewStyle | undefined> | ViewStyle;
  onPress: () => void;
  disabled: boolean;
};

export type ICalendarEvent<T = {}> = ICalendarEventBase & T;

// export type Mode = '3days' | 'week' | 'day' | 'custom' | 'month' | 'list';

export type Mode =
  | 'timeGrid'
  | 'timeThreeDays'
  | 'timeGridWeek'
  | 'dayGridMonth'
  | 'monthGridYear'
  | 'listWeek'
  | 'custom';

export type EventCellStyle<T> =
  | ViewStyle
  | ((event: ICalendarEvent<T>) => ViewStyle);

export type WeekNum = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type HasDateRange = [Date, Date];

export type DateRangeHandler = ([start, end]: HasDateRange) => void;

export type HorizontalDirection = 'RIGHT' | 'LEFT';

export type EventRenderer<T> = (
  event: ICalendarEvent<T>,
  touchableOpacityProps: CalendarTouchableOpacityProps
) => JSX.Element;

export type HeaderRenderer<T> = React.ComponentType<
  CalendarHeaderProps<T> & { mode: Mode }
>;
export type MonthHeaderRenderer =
  React.ComponentType<CalendarHeaderForMonthViewProps>;

/**
 * @deprecated Prefer interface ICalendarEvent instead.
 */
export type DayJSConvertedEvent<T = any> = ICalendarEvent<T>;

/**
 * @deprecated Prefer interface ICalendarEvent instead.
 */
export type Event<T = any> = ICalendarEvent<T>;
