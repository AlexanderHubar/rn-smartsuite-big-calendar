import dayjs from 'dayjs';
import * as React from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { u } from '../commonStyles';
import type { ICalendarEvent } from '../interfaces';
import { useTheme } from '../theme/ThemeContext';
import { isToday, stringHasContent, typedMemo } from '../utils';

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
  dayHeaderHighlightColor = '',
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
  const primaryBg = { backgroundColor: theme.palette.primary.main };

  return (
    <View style={[theme.isRTL ? u['flex-row-reverse'] : u['flex-row'], style]}>
      <View style={[u['z-10'], u['w-50'], borderColor]} />

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
              <Text
                style={[
                  theme.typography.sm,
                  u['text-center'],
                  {
                    color: theme.palette.gray['500'],
                    marginBottom: 2,
                  },
                ]}
              >
                {date.format('dd')}
              </Text>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  marginBottom: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: shouldHighlight
                    ? primaryBg.backgroundColor
                    : 'transparent',
                }}
              >
                <Text
                  style={[
                    {
                      color: shouldHighlight
                        ? stringHasContent(dayHeaderHighlightColor)
                          ? dayHeaderHighlightColor
                          : theme.palette.primary.contrastText
                        : theme.palette.gray['800'],
                    },
                    theme.typography.sm,
                    u['text-center'],
                  ]}
                >
                  {date.format('D')}
                </Text>
              </View>
            </View>
            {showAllDayEventCell ? (
              <View
                style={[
                  {
                    backgroundColor: 'white',
                    borderTopLeftRadius: isFirstDay ? 4 : 0,
                    borderBottomLeftRadius: isFirstDay ? 4 : 0,
                    borderWidth: 1,
                    borderRightWidth: 0,
                    borderColor: theme.palette.gray['200'],
                    minHeight: 32,
                    marginBottom: 8,
                  },
                ]}
              >
                {allDayEvents.map((event) => {
                  if (
                    !dayjs(date).isBetween(event.start, event.end, 'day', '[]')
                  ) {
                    return null;
                  }
                  return (
                    <View
                      style={[primaryBg, u['mt-2']]}
                      key={`${event.start}${event.title}`}
                    >
                      <Text
                        style={{
                          fontSize: theme.typography.sm.fontSize,
                          color: theme.palette.primary.contrastText,
                        }}
                      >
                        {event.title}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export const CalendarHeader = typedMemo(_CalendarHeader);
