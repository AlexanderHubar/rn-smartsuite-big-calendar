import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import type { ICalendarEvent } from '../../../lib/typescript';

const Events: React.FC<{
  events: ICalendarEvent[];
  _renderMappedEvent: (event: ICalendarEvent<any>) => JSX.Element;
  date: dayjs.Dayjs;
}> = ({ events, _renderMappedEvent, date }) => {
  const [visibleEvents, setVisibleEvents] = useState<ICalendarEvent<any>>([]);

  useEffect(() => {
    setVisibleEvents(
      events.filter((event: any) =>
        dayjs(event.fromDate.date).isBetween(
          date.startOf('day'),
          date.endOf('day'),
          null,
          '[)'
        )
      )
    );
  }, []);

  if (visibleEvents.length === 0) {
    return null;
  }

  return <>{visibleEvents.map(_renderMappedEvent)}</>;
};

export { Events };
