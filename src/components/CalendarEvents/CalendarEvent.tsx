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
  eventOrder?: number;
  overlapOffset?: number;
  renderEvent?: EventRenderer<T>;
  ampm: boolean;
}

function _CalendarEvent<T>({
  event,
  onPressEvent,
  eventCellStyle,
  showTime,
  eventOrder = 0,
  overlapOffset = OVERLAP_OFFSET,
  renderEvent,
  ampm,
}: CalendarEventProps<T>) {
  const theme = useTheme();
  const { color, font } = useSpotlight();

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
        backgroundColor: color(
          event.recordId + event.slug,
          event.color.background
        ),
        borderRadius: 4,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: theme.eventBoxBorder,
      },
    ],
  });

  if (renderEvent) {
    return renderEvent(event, touchableOpacityProps);
  }

  return (
    <DefaultCalendarEventRenderer
      event={event}
      showTime={showTime}
      ampm={ampm}
      touchableOpacityProps={touchableOpacityProps}
      textColor={font(event.recordId + event.slug, event.color.font)}
    />
  );
}

export const CalendarEvent = typedMemo(_CalendarEvent);
