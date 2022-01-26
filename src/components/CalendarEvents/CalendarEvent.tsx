import dayjs from 'dayjs';
import * as React from 'react';

import { OVERLAP_OFFSET, u } from '../../commonStyles';
import { useCalendarTouchableOpacityProps } from '../../hooks/useCalendarTouchableOpacityProps';
import type {
  EventCellStyle,
  EventRenderer,
  ICalendarEvent,
} from '../../interfaces';
import { useTheme } from '../../theme/ThemeContext';
import {
  DAY_MINUTES,
  getRelativeTopInDay,
  getStyleForOverlappingEvent,
  typedMemo,
} from '../../utils';
import { DefaultCalendarEventRenderer } from '../DefaultCalendarEventRenderer';
import { useSpotlight } from '../../hooks/useSpotlight';

const getEventCellPositionStyle = (
  start?: Date | string | null,
  end?: Date | string | null
) => {
  const relativeHeight =
    100 * (1 / DAY_MINUTES) * dayjs(end).diff(start, 'minute');
  const relativeTop = getRelativeTopInDay(dayjs(start));
  return {
    height: `${relativeHeight}%`,
    top: `${relativeTop}%`,
  };
};

interface CalendarEventProps<T> {
  event: ICalendarEvent<T>;
  onPressEvent?: (event: ICalendarEvent<T>) => void;
  eventCellStyle?: EventCellStyle<T>;
  showTime: boolean;
  eventCount?: number;
  eventOrder?: number;
  overlapOffset?: number;
  renderEvent?: EventRenderer<T>;
  ampm: boolean;
  isLightMode?: boolean;
}

function _CalendarEvent<T>({
  event,
  onPressEvent,
  eventCellStyle,
  showTime,
  eventCount = 1,
  eventOrder = 0,
  overlapOffset = OVERLAP_OFFSET,
  renderEvent,
  ampm,
  isLightMode,
}: CalendarEventProps<T>) {
  const theme = useTheme();
  const { color } = useSpotlight();

  const palettes = React.useMemo(
    () => [theme.palette.primary, ...theme.eventCellOverlappings],
    [theme]
  );

  const touchableOpacityProps = useCalendarTouchableOpacityProps({
    event,
    eventCellStyle,
    onPressEvent,
    injectedStyles: [
      getEventCellPositionStyle(event.fromDate.date, event.toDate?.date),
      getStyleForOverlappingEvent(eventOrder, overlapOffset, palettes),
      u.absolute,
      {
        backgroundColor: color(event.recordId + event.slug, event.color),
        borderRadius: 4,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: isLightMode ? '#ffffff' : '#38393B',
      },
    ],
  });

  const textColor = React.useMemo(() => {
    const fgColors = palettes.map((p) => p.contrastText);
    return fgColors[eventCount % fgColors.length] || fgColors[0];
  }, [eventCount, palettes]);

  if (renderEvent) {
    return renderEvent(event, touchableOpacityProps);
  }

  return (
    <DefaultCalendarEventRenderer
      event={event}
      showTime={showTime}
      ampm={ampm}
      touchableOpacityProps={touchableOpacityProps}
      textColor={textColor}
    />
  );
}

export const CalendarEvent = typedMemo(_CalendarEvent);
