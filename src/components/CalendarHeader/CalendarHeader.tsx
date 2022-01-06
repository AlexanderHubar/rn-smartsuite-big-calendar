import dayjs from 'dayjs';
import React, { useState } from 'react';
import { find } from 'remeda';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { u } from '../../commonStyles';
import type { ICalendarEvent } from '../../interfaces';
import { useTheme } from '../../theme/ThemeContext';
import { isToday, typedMemo } from '../../utils';
import {
  ActiveDateCircle,
  AllDayEventBoldLabel,
  AllDayEventCell,
  AllDayEventLabel,
  AllDayEventPill,
  CircleLabel,
  DayLabel,
  WeekTimeLine,
} from './styled';
import {
  getEventsByDay,
  getEventsByRangeArray,
  getWeekTimeLine,
} from './helpers';
import type { Mode } from '../../interfaces';
import { DueDateBadge } from '../DueDateBadge';
import { getOverdueDays } from '../../date-utils';

export interface CalendarHeaderProps<T> {
  dateRange: dayjs.Dayjs[];
  cellHeight: number;
  style: ViewStyle;
  allDayEvents: ICalendarEvent<T>[];
  onPressDateHeader?: (date: Date) => void;
  onPressEvent?: (event: ICalendarEvent<T>) => void;
  activeDate?: Date;
  headerContentStyle?: ViewStyle;
  dayHeaderStyle?: ViewStyle;
  dayHeaderHighlightColor?: string;
  weekDayHeaderHighlightColor?: string;
  showAllDayEventCell?: boolean;
  showDaysHeader?: boolean;
  mode: Mode;
  activeColor: string;
  onShowAllDayEvents: (date: Date) => void;
}

function _CalendarHeader<T>({
  dateRange,
  style,
  allDayEvents,
  onPressDateHeader,
  onPressEvent,
  activeDate,
  mode,
  showAllDayEventCell = true,
  activeColor,
  onShowAllDayEvents,
  showDaysHeader,
}: CalendarHeaderProps<T>) {
  const [cellWidth, setCellWidth] = useState(0);

  const _onPress = React.useCallback(
    (date: Date) => {
      onPressDateHeader && onPressDateHeader(date);
    },
    [onPressDateHeader]
  );

  const onAllDayEventPress = (event: ICalendarEvent<T>) => {
    onPressEvent && onPressEvent(event);
  };

  const handleShowAllDayEvents = (date: Date) => {
    onShowAllDayEvents && onShowAllDayEvents(date);
  };

  const theme = useTheme();

  const borderColor = { borderColor: theme.palette.gray['200'] };

  const eventsByDay = getEventsByDay(allDayEvents, dateRange);

  const eventsByRangeArray = getEventsByRangeArray(
    eventsByDay,
    mode === 'timeGridWeek' ? 7 : 3
  );

  const weekTimeLine = getWeekTimeLine(eventsByRangeArray);

  const isDayMode = mode === 'timeGrid';

  const renderAllDayEvents = (date: any) => {
    const eventsArr = [];

    for (let i = 0; i < allDayEvents.length; i++) {
      const event = allDayEvents[i];

      const isDateBetweenEvent = dayjs(date).isBetween(
        event.fromDate.date,
        event.toDate?.date,
        'day',
        '[]'
      );

      if (eventsArr.length > 2) {
        const countOfEventPerDay = allDayEvents.filter((_event) =>
          dayjs(date).isBetween(
            _event.fromDate.date,
            _event.toDate?.date,
            'day',
            '[]'
          )
        ).length;

        const eventsLeft = countOfEventPerDay - 3;

        if (eventsLeft > 0) {
          eventsArr.push(
            <AllDayEventPill
              onPress={() => handleShowAllDayEvents(date)}
              backgroundColor={'#E9E9E9'}
              key={`${event.slug}-${event.recordId}`}
            >
              <AllDayEventLabel style={{ color: 'black' }}>
                + {eventsLeft}
              </AllDayEventLabel>
            </AllDayEventPill>
          );
        }
        break;
      }

      if (isDateBetweenEvent) {
        eventsArr.push(
          <AllDayEventPill
            onPress={() => onAllDayEventPress(event)}
            style={{ opacity: isDayMode ? 1 : 0 }}
            backgroundColor={event.color}
            key={`${event.slug}.${event.recordId}`}
          >
            {event?.fieldType === 'duedatefield' && (
              <DueDateBadge
                overdueDays={getOverdueDays(event)}
                isComplete={event.dueDateStatus?.isComplete || false}
              />
            )}
            <AllDayEventBoldLabel>
              {event?.recordTitle} •{' '}
              <AllDayEventLabel>{event?.fieldLabel}</AllDayEventLabel>
            </AllDayEventBoldLabel>
          </AllDayEventPill>
        );
      }
    }

    return eventsArr;
  };

  return (
    <View
      style={[
        theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
        style,
        { paddingTop: 8 },
      ]}
    >
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
              style={[
                u['flex-1'],
                u['pt-2'],
                { marginTop: showDaysHeader ? 0 : 8 },
              ]}
              onPress={() => _onPress(date.toDate())}
              disabled={onPressDateHeader === undefined}
              key={date.toString()}
            >
              {showDaysHeader && (
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
              )}

              {showAllDayEventCell ? (
                <>
                  <AllDayEventCell isFirstDay={isFirstDay}>
                    {renderAllDayEvents(date).map((event) =>
                      event ? event : null
                    )}
                  </AllDayEventCell>
                </>
              ) : null}
            </TouchableOpacity>
          );
        })}

        {!isDayMode && (
          <WeekTimeLine>
            {weekTimeLine.map((timeLine, index) => (
              <View style={{ flexDirection: 'row' }}>
                {timeLine.map((dayLine) => {
                  const [eventId, eventCount] =
                    typeof dayLine === 'string' ? dayLine.split('|') : [];

                  const [recordId, fieldSlug] =
                    typeof eventId === 'string' ? eventId.split('-') : [];

                  const event = find(
                    allDayEvents,
                    (_event) =>
                      _event.recordId === recordId && _event.slug === fieldSlug
                  );

                  return dayLine && index < 3 ? (
                    <AllDayEventPill
                      key={`${dayLine}.${dateRange[0]}`}
                      onPress={() => onAllDayEventPress(event!)}
                      style={{
                        width: cellWidth * Number(eventCount) - 1,
                      }}
                      backgroundColor={event?.color}
                    >
                      {event?.fieldType === 'duedatefield' && (
                        <DueDateBadge
                          overdueDays={getOverdueDays(event)}
                          isComplete={event.dueDateStatus?.isComplete || false}
                        />
                      )}

                      <AllDayEventBoldLabel>
                        {event?.recordTitle} •{' '}
                        <AllDayEventLabel>{event?.fieldLabel}</AllDayEventLabel>
                      </AllDayEventBoldLabel>
                    </AllDayEventPill>
                  ) : (
                    <View style={{ width: cellWidth }} />
                  );
                })}
              </View>
            ))}
          </WeekTimeLine>
        )}
      </View>
    </View>
  );
}

export const CalendarHeader = typedMemo(_CalendarHeader);
