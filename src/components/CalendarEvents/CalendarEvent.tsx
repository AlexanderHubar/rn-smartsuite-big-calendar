import * as React from 'react';

import { OVERLAP_OFFSET, u } from '../../commonStyles';
import { useCalendarTouchableOpacityProps } from '../../hooks/useCalendarTouchableOpacityProps';
import type {
  EventCellStyle,
  EventRenderer,
  ICalendarEvent,
} from '../../interfaces';
import {
  DAY_MINUTES,
  getRelativeTopInDay,
  getStyleForOverlappingEvent,
  typedMemo,
} from '../../utils';
import { DefaultCalendarEventRenderer } from '../DefaultCalendarEventRenderer';
import { useSpotlight } from '../../hooks/useSpotlight';
import { useContext } from 'react';
import { CalendarContext } from '../Calendar/CalendarContext';
import { TouchableOpacity } from 'react-native';
import { HighLightBox } from '../CalendarEventListItem/styled';
import dayjs from 'dayjs';

const DEFAULT_RELATIVE_HEIGHT = 4;

const getEventCellPositionStyle = (
  start?: Date | string | null,
  end?: Date | string | null
) => {
  const startDate = dayjs.utc(start);
  const endDate = dayjs.utc(end);

  const relativeHeight =
    100 * (1 / DAY_MINUTES) * endDate.diff(startDate, 'minute');
  const relativeTop = getRelativeTopInDay(startDate);
  return {
    height: `${
      relativeHeight <= 0 ? DEFAULT_RELATIVE_HEIGHT : relativeHeight
    }%`,
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
  opacity?: any;
  isFocusElement?: boolean;
}

function _CalendarEvent<T>({
  event,
  onPressEvent,
  eventCellStyle,
  showTime,
  eventOrder = 0,
  overlapOffset = OVERLAP_OFFSET,
  ampm,
  opacity,
  isFocusElement,
}: CalendarEventProps<T>) {
  const { isLightMode } = useContext(CalendarContext);
  const { color, font } = useSpotlight();

  const touchableOpacityProps = useCalendarTouchableOpacityProps({
    event,
    eventCellStyle,
    onPressEvent,
    injectedStyles: [
      getEventCellPositionStyle(event.fromDate.date, event.toDate?.date),
      getStyleForOverlappingEvent(eventOrder, overlapOffset),
      u.absolute,
      {
        backgroundColor: color(event),
        borderRadius: 4,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: isLightMode ? '#ffffff' : '#38393B',
      },
    ],
  });

  const highlightColor = isLightMode ? 'rgb(173,173,173)' : 'rgb(80,80,80)';

  return (
    <TouchableOpacity {...touchableOpacityProps}>
      {isFocusElement && (
        <HighLightBox style={{ opacity }} color={highlightColor} />
      )}
      <DefaultCalendarEventRenderer
        event={event}
        showTime={showTime}
        ampm={ampm}
        textColor={font(event)}
      />
    </TouchableOpacity>
  );
}

export const CalendarEvent = typedMemo(_CalendarEvent);
