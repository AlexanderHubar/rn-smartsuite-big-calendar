import React from 'react';

import type { CalendarEventItemProps } from './types';
import { FieldType } from 'rn-smartsuite-big-calendar';

import {
  DetailsContainer,
  EventTitle,
  FieldTitle,
  ItemColor,
  ItemContainer,
  PeriodText,
  TimeContainer,
  TitleContainer,
} from './styled';
import { DueDateBadge } from '../DueDateBadge';
import { getOverdueDays, getRecordTimeRange } from '../../date-utils';

function CalendarEventItem<T>({ event, onPress }: CalendarEventItemProps<T>) {
  const isDueDate = event.fieldType === FieldType.duedatefield;

  return (
    <ItemContainer onPress={() => onPress && onPress(event)}>
      <ItemColor color={event.color} />
      <DetailsContainer>
        <TitleContainer>
          <FieldTitle>
            <EventTitle>{event.recordTitle} </EventTitle>•
            <FieldTitle> {event.fieldLabel}</FieldTitle>
          </FieldTitle>
        </TitleContainer>
        <TimeContainer>
          {isDueDate && (
            <DueDateBadge
              overdueDays={getOverdueDays(event)}
              isComplete={event.dueDateStatus.isComplete}
            />
          )}
          <PeriodText>{getRecordTimeRange(event)}</PeriodText>
        </TimeContainer>
      </DetailsContainer>
    </ItemContainer>
  );
}

export { CalendarEventItem };
