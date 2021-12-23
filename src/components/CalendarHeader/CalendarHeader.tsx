import dayjs from 'dayjs';
import * as React from 'react';
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
import { useRef } from 'react';

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
  const eventsCoords = useRef({}).current;

  const _onPress = React.useCallback(
    (date: Date) => {
      onPressDateHeader && onPressDateHeader(date);
    },
    [onPressDateHeader]
  );

  const theme = useTheme();

  const borderColor = { borderColor: theme.palette.gray['200'] };
  const arr = [
    [true, true, true],
    [false, true, true],
    [false, true, false],
  ];

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
                        style={{ opacity: 0 }}
                        onLayout={(e) => console.log(e.nativeEvent.layout)}
                        backgroundColor={event.color}
                        key={event.recordId}
                      >
                        <AllDayEventLabel>
                          {event.title} • {event.fieldLabel}
                        </AllDayEventLabel>
                      </AllDayEventPill>
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
            height: 30,
            width: '100%',
            flex: 1,
            position: 'absolute',
          }}
        >
          {arr.map((event) => (
            <View style={{ flexDirection: 'row' }}>
              {event.map((hasEvent) =>
                hasEvent ? (
                  <AllDayEventPill
                    style={{ flex: 1 }}
                    backgroundColor={'wheat'}
                  >
                    <AllDayEventLabel />
                  </AllDayEventPill>
                ) : (
                  <View style={{ width: 114 }} />
                )
              )}
            </View>
          ))}
          {/*<View style={{ flexDirection: 'row' }}>*/}
          {/*<View style={{ flexDirection: 'row' }}>*/}
          {/*  <View style={{ width: 113 }} />*/}
          {/*  <AllDayEventPill style={{ width: 113 }} backgroundColor={'red'}>*/}
          {/*    <AllDayEventLabel />*/}
          {/*  </AllDayEventPill>*/}
          {/*  <View style={{ width: 113 }} />*/}
          {/*</View>*/}
        </View>
      </View>
    </View>
  );
}

export const CalendarHeader = typedMemo(_CalendarHeader);
