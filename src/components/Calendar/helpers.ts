import dayjs from 'dayjs';

import type { ICalendarEvent } from 'rn-smartsuite-big-calendar';

import { zonedDate } from '../../utils';

export const toZonedEvent = (event: ICalendarEvent) => {
  return {
    ...event,
    fromDate: {
      ...event.fromDate,
      date: event.fromDate.include_time
        ? zonedDate(event.fromDate.date)
        : dayjs.utc(event.fromDate.date),
    },
    toDate: {
      ...event.toDate,
      date: event.toDate?.include_time
        ? zonedDate(event.toDate?.date)
        : dayjs.utc(event.toDate?.date),
    },
  };
};
