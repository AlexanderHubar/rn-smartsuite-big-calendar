import dayjs from 'dayjs';
import type { ICalendarEvent } from '../../interfaces';
import { filter, reduce } from 'remeda';
import type { Mode } from '../../interfaces';

type WeekTimeLine = any[][];
type DayTimeLine = any[];

export const getEventsByDay = <T>(
  allDayEvents: ICalendarEvent<T>[],
  dateRange: dayjs.Dayjs[]
) =>
  allDayEvents.reduce((eventsObject, event) => {
    const eventsRange = dateRange.map((date, dateIndex) => {
      const isDateBetweenEvent = dayjs(date).isBetween(
        event.fromDate.date,
        event.toDate?.date,
        'day',
        '[]'
      );

      return isDateBetweenEvent ? dateIndex.toString() : false;
    });

    const filteredDaysId = eventsRange.filter((eventId) => eventId);
    const isDayFree = filteredDaysId.length === 0;

    if (isDayFree) {
      return eventsObject;
    }

    return { ...eventsObject, [event.recordId]: filteredDaysId };
  }, {});

export const getEventsByRangeArray = (
  eventsObj: Record<string, any[]>,
  countOfDays = 3
) => {
  let eventsRangeArr: any[] = [];

  const eventIds = Object.keys(eventsObj);

  eventIds.forEach((eventId) => {
    for (let i = 0; i < eventIds.length; i++) {
      const daysIds = eventsObj[eventId];

      let isAvailable = true;

      daysIds.forEach((dayKey: string) => {
        isAvailable = !eventsRangeArr[i]?.[dayKey];
      });

      if (isAvailable) {
        daysIds.forEach((dayKey) => {
          if (eventsRangeArr[i]) {
            eventsRangeArr[i][dayKey] = eventId;
          } else {
            const newSubArr: any[] = new Array(countOfDays).fill(false);

            newSubArr[dayKey as any] = eventId;
            eventsRangeArr[i] = newSubArr;
          }
        });

        break;
      }
    }
  });

  return eventsRangeArr.slice(0, 4);
};

export const getWeekTimeLine = (
  eventsByDay: Record<string, any[]>,
  mode: Mode
) =>
  reduce(
    getEventsByRangeArray(eventsByDay, mode === 'timeGridWeek' ? 7 : 3),
    (rangeTimeLine: WeekTimeLine, timeLine) => {
      const dayEvents = reduce(
        timeLine,
        (eventsLine: DayTimeLine, eventId) => {
          if (typeof eventId === 'boolean') {
            return [...eventsLine, eventId];
          }

          const eventsCount = filter(
            timeLine,
            (event) => event === eventId
          ).length;

          const idWithCount = `${eventId}|${eventsCount}`;

          if (eventsLine.find((eventsId) => eventsId === idWithCount)) {
            return [...eventsLine, false];
          }

          return [...eventsLine, idWithCount];
        },
        []
      );

      return [...rangeTimeLine, dayEvents];
    },
    []
  );
