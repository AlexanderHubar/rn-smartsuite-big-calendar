import React from 'react';
import { Text, View } from 'react-native';

import type { ICalendarEvent } from '../../interfaces';
import { useTheme } from '../../theme/ThemeContext';
import { formatStartEnd } from '../../utils';
import { DueDateBadge } from '../DueDateBadge';
import { getOverdueDays } from '../../date-utils';

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
  const theme = useTheme();

  const eventTitleStyle = {
    fontSize: theme.typography.sm.fontSize,
    color: textColor,
  };

  const timeFormat = ampm ? 'h:mm a' : 'HH:mm';

  return (
    <View style={{ flexDirection: 'row' }}>
      {event?.fieldType === 'duedatefield' && (
        <DueDateBadge
          overdueDays={getOverdueDays(event)}
          isComplete={event.dueDateStatus?.isComplete || false}
        />
      )}
      <Text style={eventTitleStyle} numberOfLines={1}>
        {formatStartEnd(event, timeFormat)} {event.recordTitle} •{' '}
        {event.fieldLabel}
      </Text>
    </View>
  );
}
