import dayjs from 'dayjs';
import React from 'react';
import { find } from 'remeda';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { u } from '../../commonStyles';
import type { ICalendarEvent } from '../../interfaces';
import { useTheme } from '../../theme/ThemeContext';
import { isToday, typedMemo } from '../../utils';
import {
  ActiveDateCircle,
  AllDayEventCell,
  AllDayEventLabel,
  AllDayEventPill,
  CircleLabel,
  DayLabel,
} from './styled';
import { getEventsByDay, getWeekTimeLine } from './helpers';

export interface CalendarHeaderProps<T> {
  dateRange: dayjs.Dayjs[];
  cellHeight: number;
  style: ViewStyle;
  allDayEvents: ICalendarEvent<T>[];
  onPressDateHeader?: (date: Date) => void;
  activeDate?: Date;
  headerContentStyle?: ViewStyle;
  dayHeaderStyle?: ViewStyle;
  dayHeaderHighlightColor?: string;
  weekDayHeaderHighlightColor?: string;
  showAllDayEventCell?: boolean;
}

function _CalendarHeader<T>({
  dateRange,
  style,
  allDayEvents,
  onPressDateHeader,
  activeDate,
  showAllDayEventCell = true,
}: CalendarHeaderProps<T>) {
  const _onPress = React.useCallback(
    (date: Date) => {
      onPressDateHeader && onPressDateHeader(date);
    },
    [onPressDateHeader]
  );

  const theme = useTheme();

  const borderColor = { borderColor: theme.palette.gray['200'] };

  const eventsByDay = getEventsByDay(allDayEvents, dateRange);

  const weekTimeLine = getWeekTimeLine(eventsByDay);

  return (
    <View style={[theme.isRTL ? u['flex-row-reverse'] : u['flex-row'], style]}>
      <View style={[u['z-10'], u['w-50'], borderColor]} />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {dateRange.map((date, index) => {
          const isFirstDay = index === 0;
          const shouldHighlight = activeDate
            ? date.isSame(activeDate, 'date')
            : isToday(date);

          return (
            <TouchableOpacity
              style={[u['flex-1'], u['pt-2']]}
              onPress={() => _onPress(date.toDate())}
              disabled={onPressDateHeader === undefined}
              key={date.toString()}
            >
              <View style={[u['justify-between'], u['items-center']]}>
                <DayLabel>{date.format('dd')}</DayLabel>
                <ActiveDateCircle shouldHighlight={shouldHighlight}>
                  <CircleLabel shouldHighlight={shouldHighlight}>
                    {date.format('D')}
                  </CircleLabel>
                </ActiveDateCircle>
              </View>

              {showAllDayEventCell ? (
                <AllDayEventCell isFirstDay={isFirstDay}>
                  {allDayEvents.map((event) => {
                    const isDateBetweenEvent = dayjs(date).isBetween(
                      event.start,
                      event.end,
                      'day',
                      '[]'
                    );

                    if (!isDateBetweenEvent) {
                      return null;
                    }

                    return (
                      <AllDayEventPill
                        style={{ opacity: 0.5 }}
                        backgroundColor={event.color}
                        key={event.recordId}
                      />
                    );
                  })}
                </AllDayEventCell>
              ) : null}
            </TouchableOpacity>
          );
        })}

        <View
          style={{
            top: 53.4,
            borderRadius: 4,
            flex: 1,
            right: 1,
            left: 1,
            position: 'absolute',
          }}
        >
          {weekTimeLine.map((timeLine) => (
            <View style={{ flexDirection: 'row' }}>
              {timeLine.map((dayLine) => {
                const [eventId, eventCount] =
                  typeof dayLine === 'string' ? dayLine.split('|') : [];

                const event = find(
                  allDayEvents,
                  (_event) => _event.recordId === eventId
                );

                return dayLine ? (
                  <AllDayEventPill
                    style={{ width: 113 * Number(eventCount) }}
                    backgroundColor={event?.color || 'red'}
                  >
                    <AllDayEventLabel>
                      {event?.title} • {event?.fieldLabel}
                    </AllDayEventLabel>
                  </AllDayEventPill>
                ) : (
                  <View style={{ width: 113 }} />
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export const CalendarHeader = typedMemo(_CalendarHeader);
