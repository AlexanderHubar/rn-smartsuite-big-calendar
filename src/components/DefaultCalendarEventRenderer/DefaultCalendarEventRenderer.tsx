import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import type {
  CalendarTouchableOpacityProps,
  ICalendarEvent,
} from '../../interfaces';
import { useTheme } from '../../theme/ThemeContext';
import { formatStartEnd } from '../../utils';
import { DueDateBadge } from '../DueDateBadge';
import { getOverdueDays } from '../../date-utils';

interface DefaultCalendarEventRendererProps<T> {
  touchableOpacityProps: CalendarTouchableOpacityProps;
  event: ICalendarEvent<T>;
  showTime?: boolean;
  textColor: string;
  ampm: boolean;
}

export function DefaultCalendarEventRenderer<T>({
  touchableOpacityProps,
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
    <TouchableOpacity {...touchableOpacityProps}>
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
    </TouchableOpacity>
  );
}
