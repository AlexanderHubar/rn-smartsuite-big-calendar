import React from 'react';

import type { ICalendarEvent } from '../../interfaces';
import { formatStartEnd } from '../../utils';
import { DueDateBadge } from '../DueDateBadge';
import { getOverdueDays } from '../../date-utils';

import { Container, Title, Time, EventTitle } from './styled';
import { HighlightWrapper } from '../Find';

interface DefaultCalendarEventRendererProps<T> {
  event: ICalendarEvent<T>;
  showTime?: boolean;
  textColor: string;
  ampm: boolean;
}

export function DefaultCalendarEventRenderer<T>({
  event,
  textColor,
  ampm,
}: DefaultCalendarEventRendererProps<T>) {
  const timeFormat = ampm ? 'h:mm a' : 'HH:mm';

  const time = formatStartEnd(event, timeFormat);

  return (
    <Container>
      {event?.fieldType === 'duedatefield' && (
        <DueDateBadge
          overdueDays={getOverdueDays(event)}
          isComplete={event.dueDateStatus?.isComplete || false}
        />
      )}
      {Boolean(time) && (
        <Time numberOfLines={1} color={textColor}>
          {time}{' '}
        </Time>
      )}
      <HighlightWrapper slug="title" event={event}>
        <EventTitle numberOfLines={1} color={textColor}>
          {event.recordTitle}
        </EventTitle>
      </HighlightWrapper>
      <Title color={textColor} numberOfLines={1}>
        {' '}
        • {event.fieldLabel}
      </Title>
    </Container>
  );
}
