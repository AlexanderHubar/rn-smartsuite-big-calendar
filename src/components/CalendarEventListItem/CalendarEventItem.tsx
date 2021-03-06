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
  HighLightBox,
} from './styled';
import { DueDateBadge } from '../DueDateBadge';
import { getOverdueDays, getRecordTimeRange } from '../../date-utils';
import { useFind } from '../../hooks/useFind';

function CalendarEventItem<T>({
  event,
  onPress,
  ampm,
  opacity,
  isFocusElement = false,
  isLightMode = false,
  color,
}: CalendarEventItemProps<T>) {
  const { hasFind } = useFind(event);

  const isDueDate = event.fieldType === FieldType.duedatefield;

  const highlightColor = isLightMode
    ? 'rgba(78,80,85,0.5)'
    : 'rgba(233,233,233,0.5)';

  return (
    <ItemContainer
      isLightMode={isLightMode}
      onPress={() => onPress && onPress(event)}
    >
      {isFocusElement && (
        <HighLightBox style={{ opacity }} color={highlightColor} />
      )}
      <ItemColor color={color} />
      <DetailsContainer>
        <TitleContainer>
          <FieldTitle isLightMode={isLightMode}>
            <EventTitle hasFind={hasFind('title')} isLightMode={isLightMode}>
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
