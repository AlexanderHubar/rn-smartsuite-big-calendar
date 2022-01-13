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

function CalendarEventItem<T>({
  event,
  onPress,
  ampm,
  isLightMode = false,
}: CalendarEventItemProps<T>) {
  const isDueDate = event.fieldType === FieldType.duedatefield;

  return (
    <ItemContainer
      isLightMode={isLightMode}
      onPress={() => onPress && onPress(event)}
    >
      <ItemColor color={event.color} />
      <DetailsContainer>
        <TitleContainer>
          <FieldTitle isLightMode={isLightMode}>
            <EventTitle isLightMode={isLightMode}>
              {event.recordTitle}{' '}
            </EventTitle>
            •
            <FieldTitle isLightMode={isLightMode}>
              {' '}
              {event.fieldLabel}
            </FieldTitle>
          </FieldTitle>
        </TitleContainer>
        <TimeContainer>
          {isDueDate && (
            <DueDateBadge
              overdueDays={getOverdueDays(event)}
              isComplete={event.dueDateStatus.isComplete}
            />
          )}
          <PeriodText isLightMode={isLightMode}>
            {getRecordTimeRange(event, ampm)}
          </PeriodText>
        </TimeContainer>
      </DetailsContainer>
    </ItemContainer>
  );
}

export { CalendarEventItem };
