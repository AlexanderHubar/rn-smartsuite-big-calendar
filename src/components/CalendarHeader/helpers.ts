import dayjs from 'dayjs';
import type { ICalendarEvent } from '../../interfaces';
import { filter, reduce } from 'remeda';

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

    return {
      ...eventsObject,
      [`${event.recordId}-${event.slug}`]: filteredDaysId,
    };
  }, {});

export const getEventsByRangeArray = (
  eventsObj: Record<string, any[]>,
  countOfDays = 3
) => {
  let eventsRangeArr: (string | false)[][] = [];

  const eventIds = Object.keys(eventsObj);

  eventIds.forEach((eventId) => {
    const days = eventsObj[eventId];

    const firstValidIndex = eventsRangeArr.reduce((acc) => {
      const isEventsRangeArrEmpty = eventsRangeArr.length === 0;

      if (!isEventsRangeArrEmpty) {
        const availableIndex = eventsRangeArr.findIndex((eventsRange) => {
          const isRangeAvailable = !days.some((day) => {
            const isDayFree = eventsRange[day];

            return isDayFree;
          });

          return isRangeAvailable;
        });

        return availableIndex === -1 ? eventsRangeArr.length : availableIndex;
      }

      return acc;
    }, 0);

    const daysArr = new Array(countOfDays).fill(false);

    const alreadyHasEvents = eventsRangeArr[firstValidIndex];

    if (alreadyHasEvents) {
      eventsRangeArr[firstValidIndex] = eventsRangeArr[firstValidIndex].map(
        (event, dayIndex) => {
          if (event) {
            return event;
          }

          return days.find((_index) => +_index === dayIndex) ? eventId : event;
        }
      );
    }

    if (!alreadyHasEvents) {
      eventsRangeArr[firstValidIndex] = daysArr.map((_, dayIndex) => {
        return days.find((index) => Number(index) === dayIndex)
          ? eventId
          : false;
      });
    }
  });

  return eventsRangeArr.slice(0, 4);
};

export const getWeekTimeLine = (eventsByRangeArray: (string | false)[][]) =>
  reduce(
    eventsByRangeArray,
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
            return eventsLine;
          }

          return [...eventsLine, idWithCount];
        },
        []
      );

      return [...rangeTimeLine, dayEvents];
    },
    []
  );
