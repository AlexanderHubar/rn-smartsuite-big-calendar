import dayjs from 'dayjs';
import React from 'react';
import type { ViewStyle } from 'react-native';

import { eventCellCss } from '../commonStyles';
import type {
  CalendarTouchableOpacityProps,
  EventCellStyle,
  ICalendarEvent,
} from '../interfaces';

interface UseCalendarTouchableOpacityPropsProps<T> {
  event: ICalendarEvent<T>;
  eventCellStyle?: EventCellStyle<T>;
  onPressEvent?: (e: ICalendarEvent<T>) => void;
  injectedStyles?: ViewStyle[];
}

export function useCalendarTouchableOpacityProps<T>({
  event,
  eventCellStyle,
  injectedStyles = [],
  onPressEvent,
}: UseCalendarTouchableOpacityPropsProps<T>) {
  const getEventStyle = React.useMemo(
    () =>
      typeof eventCellStyle === 'function'
        ? eventCellStyle
        : () => eventCellStyle,
    [eventCellStyle]
  );

  const plainJsEvent = React.useMemo(
    () => ({
      ...event,
      start: dayjs(event.fromDate.date).toDate(),
      end: dayjs(event.toDate?.date).toDate(),
    }),
    [event]
  );

  const _onPress = React.useCallback(() => {
    onPressEvent && onPressEvent(plainJsEvent);
  }, [onPressEvent, plainJsEvent]);

  const touchableOpacityProps: CalendarTouchableOpacityProps = {
    delayPressIn: 20,
    key: String(event.fromDate?.date),
    style: [eventCellCss.style, ...injectedStyles, getEventStyle(plainJsEvent)],
    onPress: _onPress,
    disabled: !onPressEvent,
  };

  return touchableOpacityProps;
}
