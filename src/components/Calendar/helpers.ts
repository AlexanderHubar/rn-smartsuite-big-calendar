import dayjs from 'dayjs';

import type { ICalendarEvent } from 'rn-smartsuite-big-calendar';

export const toZonedEvent = (event: ICalendarEvent) => {
  return {
    ...event,
    fromDate: {
      ...event.fromDate,
      date: dayjs.utc(event.fromDate.date),
    },
    toDate: {
      ...event.toDate,
      date: dayjs.utc(event.toDate?.date),
    },
  };
};
