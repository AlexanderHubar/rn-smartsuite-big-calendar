import dayjs from 'dayjs';
import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';

import { OVERLAP_PADDING } from './commonStyles';
import type { DateObject, ICalendarEvent, Mode, WeekNum } from './interfaces';
import type { Palette } from './theme/ThemeInterface';

export const typedMemo: <T>(c: T) => T = React.memo;

export const DAY_MINUTES = 1440;

export function getDatesInMonth(
  date: Date | dayjs.Dayjs = new Date(),
  locale = 'en'
) {
  const subject = dayjs(date);
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
  const subject = dayjs(date);
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
  const subject = dayjs(date).locale(locale);
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
  const subject = dayjs(date).locale(locale);
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
    if (hour === 0) {
      return '';
    }
    if (hour === 12) {
      return `12 PM`;
    }
    if (hour > 12) {
      return `${hour - 12} PM`;
    }
    return `${hour} AM`;
  }
  return `${hour}:00`;
}

export function isToday(date: dayjs.Dayjs) {
  const today = dayjs();
  return today.isSame(date, 'day');
}

export function getRelativeTopInDay(date: dayjs.Dayjs) {
  return (100 * (date.hour() * 60 + date.minute())) / DAY_MINUTES;
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
    return current.daysInMonth() - current.date() + 1;
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
    return `${dayjs(event.fromDate.date).format(format)} - ${dayjs(
      event.toDate.date
    ).format(format)}`;
  }

  if (event.fromDate.include_time) {
    return dayjs(event.fromDate.date).format(format);
  }

  if (event.toDate?.include_time) {
    return dayjs(event.toDate.date).format(format);
  }

  return '';
}

export function isAllDayEvent(
  fieldType: string,
  start?: DateObject | null,
  end?: DateObject | null
) {
  const _start = dayjs(start?.date);
  const _end = dayjs(end?.date);

  if (fieldType === 'firstcreatedfield' || fieldType === 'lastupdatedfield') {
    return end?.include_time ? false : true;
  }

  if (fieldType === 'datefield' && !end?.include_time) {
    return true;
  }

  if (fieldType === 'daterangefield') {
    if (!end?.include_time && !start?.include_time) {
      return true;
    }

    if (_start.diff(_end, 'day')) {
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

    if (_start.diff(_end, 'day')) {
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
    )
    .sort((a, b) => {
      if (dayjs(a.fromDate.date).isSame(b.fromDate.date)) {
        return dayjs(a.fromDate.date).diff(a.toDate?.date) <
          dayjs(b.fromDate.date).diff(b.toDate?.date)
          ? -1
          : 1;
      } else {
        return dayjs(a.fromDate.date).isBefore(b.fromDate.date) ? -1 : 1;
      }
    });
  const index = events.indexOf(event);
  return index === -1 ? 0 : index;
}

export function getStyleForOverlappingEvent(
  eventPosition: number,
  overlapOffset: number,
  palettes: Palette[]
) {
  let overlapStyle = {};
  const offset = overlapOffset;
  const start = eventPosition * offset;
  const zIndex = 100 + eventPosition;
  const bgColors = palettes.map((p) => p.main);
  overlapStyle = {
    start: start + OVERLAP_PADDING,
    end: OVERLAP_PADDING,
    backgroundColor: bgColors[eventPosition % bgColors.length] || bgColors[0],
    zIndex,
  };
  return overlapStyle;
}

export function getDatesInNextCustomDays(
  date: Date | dayjs.Dayjs = new Date(),
  weekStartsOn: WeekNum = 0,
  weekEndsOn: WeekNum = 6,
  locale = 'en'
) {
  const subject = dayjs(date);
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
