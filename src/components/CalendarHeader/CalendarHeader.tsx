import dayjs from 'dayjs';
import React, { useState } from 'react';
import { find } from 'remeda';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';

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
import type { Mode } from '../../interfaces';

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
  mode: Mode;
  activeColor: string;
}

function _CalendarHeader<T>({
  dateRange,
  style,
  allDayEvents,
  onPressDateHeader,
  activeDate,
  mode,
  showAllDayEventCell = true,
  activeColor,
}: CalendarHeaderProps<T>) {
  const [cellWidth, setCellWidth] = useState(0);

  const _onPress = React.useCallback(
    (date: Date) => {
      onPressDateHeader && onPressDateHeader(date);
    },
    [onPressDateHeader]
  );

  const theme = useTheme();

  const borderColor = { borderColor: theme.palette.gray['200'] };

  const eventsByDay = getEventsByDay(allDayEvents, dateRange);

  const weekTimeLine = getWeekTimeLine(eventsByDay, mode);

  const isDayMode = mode === 'timeGrid';

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
              onLayout={({ nativeEvent }) =>
                setCellWidth(nativeEvent.layout.width)
              }
              style={[u['flex-1'], u['pt-2']]}
              onPress={() => _onPress(date.toDate())}
              disabled={onPressDateHeader === undefined}
              key={date.toString()}
            >
              <View style={[u['justify-between'], u['items-center']]}>
                <DayLabel>{date.format('dd')}</DayLabel>
                <ActiveDateCircle
                  shouldHighlight={shouldHighlight}
                  color={activeColor}
                >
                  <CircleLabel shouldHighlight={shouldHighlight}>
                    {date.format('D')}
                  </CircleLabel>
                </ActiveDateCircle>
              </View>

              {showAllDayEventCell ? (
                <AllDayEventCell isFirstDay={isFirstDay}>
                  {allDayEvents.map((event) => {
                    const isDateBetweenEvent = dayjs(date).isBetween(
                      event.fromDate.date,
                      event.toDate?.date,
                      'day',
                      '[]'
                    );

                    if (!isDateBetweenEvent) {
                      return null;
                    }

                    return (
                      <AllDayEventPill
                        style={{ opacity: isDayMode ? 1 : 0 }}
                        backgroundColor={event.color}
                        key={event.recordId}
                      >
                        <AllDayEventLabel>
                          {event?.recordTitle} • {event?.fieldLabel}
                        </AllDayEventLabel>
                      </AllDayEventPill>
                    );
                  })}
                </AllDayEventCell>
              ) : null}
            </TouchableOpacity>
          );
        })}

        {!isDayMode && (
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
                      key={event?.recordId}
                      onPress={() => _onPress(event as any)}
                      style={{
                        width: cellWidth * Number(eventCount) - 1,
                      }}
                      backgroundColor={event?.color}
                    >
                      {event?.fieldType === 'duedatefield' && (
                        <View
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: 4,
                            backgroundColor: '#FFB938',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 4,
                          }}
                        >
                          <Text style={{ color: 'white', fontSize: 10 }}>
                            0
                          </Text>
                        </View>
                      )}

                      <AllDayEventLabel>
                        {event?.recordTitle} • {event?.fieldLabel}
                      </AllDayEventLabel>
                    </AllDayEventPill>
                  ) : (
                    <View style={{ width: cellWidth }} />
                  );
                })}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

export const CalendarHeader = typedMemo(_CalendarHeader);
