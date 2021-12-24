import React from 'react';

import type { CalendarEventItemProps } from './types';
import { FieldType, typedMemo } from 'rn-smartsuite-big-calendar';

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

function _CalendarEventItem({ event, onPress }: CalendarEventItemProps) {
  const isDueDate = event.fieldType === FieldType.duedatefield;

  return (
    <ItemContainer onPress={onPress}>
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

export const CalendarEventItem = typedMemo(_CalendarEventItem);
