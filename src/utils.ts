import dayjs from 'dayjs';
import React from 'react';
import { Platform, TextStyle, ViewStyle } from 'react-native';

import { OVERLAP_PADDING } from './commonStyles';
import type { DateObject, ICalendarEvent, Mode, WeekNum } from './interfaces';
import { FieldType } from './interfaces';
import Timezone from './timezone';

export const typedMemo: <T>(c: T) => T = React.memo;

export const DAY_MINUTES = 1440;

/**
 * Need to find solution for android to handle timezone.
 * dayjs is not working with Hermes.
 * */
export const zonedDate = (
  date?: string | Date | dayjs.Dayjs | null | undefined
) => {
  if (Platform.OS === 'ios') {
    const timeZone = Timezone.default().getUserTimezone();
    return dayjs.utcToZoned(date, timeZone);
  }

  return dayjs(date);
};

export const zonedFormatDate = (
  date?: string | Date | dayjs.Dayjs | null | undefined,
  format?: string
) => zonedDate(date).format(format);

export function getDatesInMonth(
  date: Date | dayjs.Dayjs = new Date(),
  locale = 'en'
) {
  const subject = dayjs.utc(date).startOf('day');
  return Array(subject.daysInMonth() - 1)
    .fill(0)
    .map((_, i) => {
      return subject.date(i + 1).locale(locale);
    });
}

export function getDatesInWeek(
  date: Date | dayjs.Dayjs = new Date(),
  weekStartsOn: WeekNum = 0,
  locale = 'en'
) {
  const subject = dayjs.utc(date).startOf('day');
  const subjectDOW = subject.day();
  return Array(7)
    .fill(0)
    .map((_, i) => {
      return subject
        .add(
          i -
            (subjectDOW < weekStartsOn ? 7 + subjectDOW : subjectDOW) +
            weekStartsOn,
          'day'
        )
        .locale(locale);
    });
}

export function getDatesInNextThreeDays(
  date: Date | dayjs.Dayjs = new Date(),
  locale = 'en'
) {
  const subject = dayjs.utc(date).startOf('day').locale(locale);
  return Array(3)
    .fill(0)
    .map((_, i) => {
      return subject.add(i, 'day');
    });
}

export function getDatesInNextOneDay(
  date: Date | dayjs.Dayjs = new Date(),
  locale = 'en'
) {
  const subject = dayjs.utc(date).startOf('day').locale(locale);
  return Array(1)
    .fill(0)
    .map((_, i) => {
      return subject.add(i, 'day');
    });
}

export const hours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

export function formatHour(hour: number, ampm = false) {
  if (ampm) {
    return dayjs().hour(hour).locale('en').format('h A');
  }

  return dayjs().hour(hour).format('HH');
}

export function isToday(date: dayjs.Dayjs) {
  const today = zonedDate();
  return today.isSame(date, 'day');
}

export function getRelativeTopInDay(date: dayjs.Dayjs) {
  const formattedDate = zonedDate(date);

  return (
    (100 * (formattedDate.hour() * 60 + formattedDate.minute())) / DAY_MINUTES
  );
}

export function todayInMinutes() {
  const today = dayjs();
  return today.diff(dayjs().startOf('day'), 'minute');
}

export function modeToNum(mode: Mode, current?: dayjs.Dayjs | Date): number {
  if (mode === 'dayGridMonth') {
    if (!current) {
      throw new Error('You must specify current date if mode is month');
    }
    if (current instanceof Date) {
      current = dayjs(current);
    }
    return current.daysInMonth();
  }
  switch (mode) {
    case 'timeGrid':
      return 1;
    case 'timeThreeDays':
      return 3;
    case 'timeGridWeek':
    case 'listWeek':
    case 'custom':
      return 7;
    default:
      throw new Error('undefined mode');
  }
}

export function formatStartEnd(event: ICalendarEvent, format: string) {
  if (event.fromDate.include_time && event.toDate?.include_time) {
    const timeRange = `${zonedFormatDate(
      event.fromDate.date,
      format
    )} - ${zonedFormatDate(event.toDate.date, format)}`;
    const startDate = zonedFormatDate(event.fromDate.date, format);

    switch (event.fieldType as FieldType) {
      case FieldType.datefield:
      case FieldType.firstcreatedfield:
      case FieldType.lastupdatedfield:
        return startDate;
      case FieldType.daterangefield:
      case FieldType.duedatefield:
        return timeRange;
    }
  }

  if (event.fromDate.include_time) {
    return zonedFormatDate(event.fromDate.date, format);
  }

  if (event.toDate?.include_time) {
    return zonedFormatDate(event.toDate.date, format);
  }

  return '';
}

export function isAllDayEvent(
  fieldType: string,
  start?: DateObject | null,
  end?: DateObject | null
) {
  const _start = zonedDate(start?.date);
  const _end = zonedDate(end?.date);

  if (fieldType === 'firstcreatedfield' || fieldType === 'lastupdatedfield') {
    return !start?.include_time;
  }

  if (fieldType === 'datefield' && !end?.include_time) {
    return true;
  }

  if (fieldType === 'daterangefield') {
    if (!end?.include_time && !start?.include_time) {
      return true;
    }

    if (_end.isAfter(_start, 'd')) {
      return true;
    }

    return false;
  }

  if (fieldType === 'duedatefield') {
    if (!end?.include_time) {
      return true;
    }

    if (!end?.include_time && !start?.include_time) {
      return true;
    }

    if (_end.isAfter(_start, 'd')) {
      return true;
    }

    return false;
  }

  return (
    _start.hour() === 0 &&
    _start.minute() === 0 &&
    _end.hour() === 0 &&
    _end.minute() === 0
  );
}

export function getCountOfEventsAtEvent(
  event: ICalendarEvent<any>,
  eventList: ICalendarEvent<any>[]
) {
  return eventList.filter(
    (e) =>
      dayjs(event.fromDate.date).isBetween(
        e.fromDate.date,
        e.toDate?.date,
        'minute',
        '[)'
      ) ||
      dayjs(e.fromDate.date).isBetween(
        event.fromDate.date,
        event.toDate?.date,
        'minute',
        '[)'
      )
  ).length;
}

export function getOrderOfEvent(
  event: ICalendarEvent<any>,
  eventList: ICalendarEvent<any>[]
) {
  const events = eventList
    .filter(
      (e) =>
        zonedDate(event.fromDate.date).isBetween(
          e.fromDate.date,
          e.toDate?.date,
          'minute',
          '[)'
        ) ||
        zonedDate(e.fromDate.date).isBetween(
          event.fromDate.date,
          event.toDate?.date,
          'minute',
          '[)'
        )
    )
    .sort((a, b) => {
      if (zonedDate(a.fromDate.date).isSame(b.fromDate.date)) {
        return zonedDate(a.fromDate.date).diff(a.toDate?.date) <
          zonedDate(b.fromDate.date).diff(b.toDate?.date)
          ? -1
          : 1;
      } else {
        return zonedDate(a.fromDate.date).isBefore(b.fromDate.date) ? -1 : 1;
      }
    });
  const index = events.indexOf(event);
  return index === -1 ? 0 : index;
}

export function getStyleForOverlappingEvent(
  eventPosition: number,
  overlapOffset: number
) {
  const start = eventPosition * overlapOffset;
  const zIndex = 100 + eventPosition;

  return {
    start: start + OVERLAP_PADDING,
    end: OVERLAP_PADDING,
    zIndex,
  };
}

export function getDatesInNextCustomDays(
  date: Date | dayjs.Dayjs = new Date(),
  weekStartsOn: WeekNum = 0,
  weekEndsOn: WeekNum = 6,
  locale = 'en'
) {
  const subject = dayjs.utc(date).startOf('day').locale(locale);
  const subjectDOW = subject.day();
  return Array(weekDaysCount(weekStartsOn, weekEndsOn))
    .fill(0)
    .map((_, i) => {
      return subject.add(i - subjectDOW + weekStartsOn, 'day').locale(locale);
    });
}

// TODO: This method should be unit-tested
function weekDaysCount(weekStartsOn: WeekNum, weekEndsOn: WeekNum) {
  // handle reverse week
  if (weekEndsOn < weekStartsOn) {
    let daysCount = 1;
    let i = weekStartsOn;
    while (i !== weekEndsOn) {
      ++i;
      ++daysCount;
      if (i > 6) {
        i = 0;
      }
      // fallback for infinite
      if (daysCount > 7) {
        break;
      }
    }
    return daysCount;
  }
  // normal week
  if (weekEndsOn > weekStartsOn) {
    return weekEndsOn - weekStartsOn + 1;
  }
  // default
  return 1;
}

export function getEventSpanningInfo(
  event: ICalendarEvent<any>,
  date: dayjs.Dayjs,
  dayOfTheWeek: number,
  calendarWidth: number
) {
  const dayWidth = calendarWidth / 7;

  // adding + 1 because durations start at 0
  const eventDuration =
    dayjs
      .duration(dayjs(event.toDate?.date).diff(dayjs(event.fromDate.date)))
      .days() + 1;
  const eventDaysLeft =
    dayjs.duration(dayjs(event.toDate?.date).diff(date)).days() + 1;
  const weekDaysLeft = 7 - dayOfTheWeek;
  const isMultipleDays = eventDuration > 1;
  // This is to determine how many days from the event to show during a week
  const eventWeekDuration =
    eventDuration > weekDaysLeft
      ? weekDaysLeft
      : dayOfTheWeek === 0 && eventDaysLeft < eventDuration
      ? eventDaysLeft
      : eventDuration;
  const isMultipleDaysStart =
    isMultipleDays &&
    (date.isSame(event.fromDate.date, 'day') ||
      (dayOfTheWeek === 0 && date.isAfter(event.fromDate.date)) ||
      date.get('date') === 1);
  // - 6 to take in account the padding
  const eventWidth = dayWidth * eventWeekDuration - 6;

  return { eventWidth, isMultipleDays, isMultipleDaysStart, eventWeekDuration };
}

export function isPair(i: number): boolean {
  return i % 2 === 0;
}

export function objHasContent(obj: ViewStyle | TextStyle): boolean {
  return !!Object.keys(obj).length;
}

export function stringHasContent(string: string): boolean {
  return !!string.length;
}

type BetweenDate = string | number | Date | dayjs.Dayjs | null | undefined;

export const isBetween = (
  date: BetweenDate,
  startDate: BetweenDate,
  endDate: BetweenDate,
  unit: dayjs.OpUnitType | null | undefined = 'day',
  d: '()' | '[]' | '[)' | '(]' = '[]'
): boolean => {
  return dayjs(date).isBetween(startDate, endDate, unit, d);
};

export const isFocusElement = (
  event: ICalendarEvent<any>,
  focusEvent?: ICalendarEvent<any>
): boolean =>
  Boolean(
    focusEvent &&
      focusEvent.slug === event.slug &&
      focusEvent.recordId === event.recordId
  );
