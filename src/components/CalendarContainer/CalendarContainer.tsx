import dayjs from 'dayjs';
import React, { useRef } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';

import { MIN_HEIGHT } from '../../commonStyles';
import type {
  DateRangeHandler,
  EventCellStyle,
  EventRenderer,
  HeaderRenderer,
  HorizontalDirection,
  ICalendarEvent,
  Mode,
  MonthHeaderRenderer,
  WeekNum,
} from '../../interfaces';
import { useTheme } from '../../theme/ThemeContext';
import {
  getDatesInMonth,
  getDatesInNextCustomDays,
  getDatesInNextOneDay,
  getDatesInNextThreeDays,
  getDatesInWeek,
  isAllDayEvent,
  modeToNum,
  typedMemo,
} from '../../utils';
import { CalendarBody } from '../CalendarBody';
import { CalendarHeader } from '../CalendarHeader';
import { CalendarList } from '../CalendarList';
import { CalendarDateRangeHeader } from '../CalendarDateRangeHeader';
import { CalendarMonth } from '../CalendarMonth';

export interface CalendarContainerProps<T> {
  /**
   * Events to be rendered. This is a required prop.
   */
  events: ICalendarEvent<T>[];

  /**
   * The height of calendar component. This is a required prop.
   */
  height: number;

  /**
   * The height of each hour row.
   */
  hourRowHeight?: number;

  /**
   * Adjusts the indentation of events that occur during the same time period. Defaults to 20 on web and 8 on mobile.
   */
  overlapOffset?: number;

  // Custom style
  eventCellStyle?: EventCellStyle<T>;
  calendarContainerStyle?: ViewStyle;
  headerContainerStyle?: ViewStyle;
  headerContentStyle?: ViewStyle;
  dayHeaderStyle?: ViewStyle;
  dayHeaderHighlightColor?: string;
  weekDayHeaderHighlightColor?: string;
  bodyContainerStyle?: ViewStyle;

  // Custom renderer
  renderEvent?: EventRenderer<T>;
  renderHeader?: HeaderRenderer<T>;
  renderHeaderForMonthView?: MonthHeaderRenderer;

  ampm?: boolean;
  date?: Date;
  locale?: string;
  hideNowIndicator?: boolean;
  mode?: Mode;
  scrollOffsetMinutes?: number;
  showTime?: boolean;

  swipeEnabled?: boolean;
  weekStartsOn?: WeekNum;
  onChangeDate?: DateRangeHandler;
  onPressCell?: (date: Date) => void;
  onPressDateHeader?: (date: Date) => void;
  onPressEvent?: (event: ICalendarEvent<T>) => void;
  onViewModePress?: (mode: Mode) => void;
  onShowAllDayEvents: (date: Date) => void;
  weekEndsOn?: WeekNum;
  maxVisibleEventCount?: number;
  eventMinHeightForMonthView?: number;
  activeDate?: Date;
  headerComponent?: React.ReactElement | null;
  headerComponentStyle?: ViewStyle;
  hourStyle?: TextStyle;
  showAllDayEventCell?: boolean;
  showDaysHeader?: boolean;
  activeColor: string;
}

function _CalendarContainer<T>({
  events,
  height,
  hourRowHeight,
  ampm = false,
  date,
  eventCellStyle,
  locale = 'en',
  hideNowIndicator = false,
  mode = 'timeGridWeek',
  overlapOffset,
  scrollOffsetMinutes = 0,
  showTime = true,
  headerContainerStyle = {},
  headerContentStyle = {},
  dayHeaderStyle = {},
  dayHeaderHighlightColor = '',
  weekDayHeaderHighlightColor = '',
  bodyContainerStyle = {},
  swipeEnabled = true,
  weekStartsOn = 0,
  onChangeDate,
  onPressCell,
  onPressDateHeader,
  onPressEvent,
  onViewModePress,
  onShowAllDayEvents,
  renderEvent,
  renderHeader: HeaderComponent = CalendarHeader,
  weekEndsOn = 6,
  activeDate,
  headerComponent = null,
  headerComponentStyle = {},
  hourStyle = {},
  showAllDayEventCell = true,
  showDaysHeader = true,
  activeColor,
}: CalendarContainerProps<T>) {
  const [targetDate, setTargetDate] = React.useState(dayjs(date));
  const calendarRef = useRef<any | null>(null);

  React.useEffect(() => {
    if (date) {
      setTargetDate(dayjs(date));
    }
  }, [date]);

  const allDayEvents = React.useMemo(
    () =>
      events.filter((event) =>
        isAllDayEvent(event.fieldType, event.fromDate, event.toDate)
      ),
    [events]
  );

  const daytimeEvents = React.useMemo(
    () =>
      events.filter(
        (event) => !isAllDayEvent(event.fieldType, event.fromDate, event.toDate)
      ),
    [events]
  );

  const dateRange = React.useMemo(() => {
    switch (mode) {
      case 'timeGrid':
        return getDatesInNextOneDay(targetDate, locale);
      case 'timeThreeDays':
        return getDatesInNextThreeDays(targetDate, locale);
      case 'timeGridWeek':
        return getDatesInWeek(targetDate, weekStartsOn, locale);
      case 'dayGridMonth':
        return getDatesInMonth(targetDate, locale);
      case 'listWeek':
        return getDatesInWeek(targetDate, weekStartsOn, locale);
      case 'custom':
        return getDatesInNextCustomDays(
          targetDate,
          weekStartsOn,
          weekEndsOn,
          locale
        );
      default:
        throw new Error(
          `[react-native-big-calendar] The mode which you specified "${mode}" is not supported.`
        );
    }
  }, [mode, targetDate, locale, weekEndsOn, weekStartsOn]);

  React.useEffect(() => {
    if (onChangeDate) {
      onChangeDate([dateRange[0].toDate(), dateRange.slice(-1)[0].toDate()]);
    }
  }, [dateRange, onChangeDate]);

  const cellHeight = React.useMemo(
    () => hourRowHeight || Math.max(height - 30, MIN_HEIGHT) / 24,
    [height, hourRowHeight]
  );

  const theme = useTheme();

  const onSwipeHorizontal = React.useCallback(
    (direction: HorizontalDirection) => {
      if (!swipeEnabled) {
        return;
      }
      if (
        (direction === 'LEFT' && !theme.isRTL) ||
        (direction === 'RIGHT' && theme.isRTL)
      ) {
        setTargetDate(targetDate.add(modeToNum(mode, targetDate), 'day'));
        calendarRef.current?.onSwipeLeft();
      } else {
        setTargetDate(targetDate.add(-modeToNum(mode, targetDate), 'day'));
        calendarRef.current?.onSwipeRight();
      }
    },
    [swipeEnabled, targetDate, mode, theme.isRTL]
  );

  const onTodayPress = () => setTargetDate(dayjs(date));

  const commonProps = {
    cellHeight,
    dateRange,
    mode,
  };

  if (mode === 'dayGridMonth') {
    return (
      <React.Fragment>
        <CalendarDateRangeHeader
          mode={mode}
          dateRange={dateRange}
          onToday={onTodayPress}
          onChangeRange={onSwipeHorizontal}
          onChangeMode={onViewModePress}
        />
        <CalendarMonth
          calendarRef={calendarRef}
          events={events}
          dateRange={dateRange}
          targetDate={targetDate}
          activeColor={activeColor}
          onSwipeHorizontal={onSwipeHorizontal}
        />
      </React.Fragment>
    );
  }

  if (mode === 'listWeek') {
    return (
      <React.Fragment>
        <CalendarDateRangeHeader
          mode={mode}
          dateRange={dateRange}
          onToday={onTodayPress}
          onChangeRange={onSwipeHorizontal}
          onChangeMode={onViewModePress}
        />
        <CalendarList
          events={events}
          dateRange={dateRange}
          activeColor={activeColor}
          onEventPress={onPressEvent}
          onSwipeHorizontal={onSwipeHorizontal}
        />
      </React.Fragment>
    );
  }

  const headerProps = {
    ...commonProps,
    style: headerContainerStyle,
    allDayEvents: allDayEvents,
    onPressDateHeader: onPressDateHeader,
    activeDate,
    headerContentStyle: headerContentStyle,
    dayHeaderStyle: dayHeaderStyle,
    dayHeaderHighlightColor: dayHeaderHighlightColor,
    weekDayHeaderHighlightColor: weekDayHeaderHighlightColor,
    showAllDayEventCell: showAllDayEventCell,
    activeColor: activeColor,
  };

  return (
    <React.Fragment>
      <CalendarDateRangeHeader
        mode={mode}
        dateRange={dateRange}
        onToday={onTodayPress}
        onChangeRange={onSwipeHorizontal}
        onChangeMode={onViewModePress}
      />
      <HeaderComponent
        {...headerProps}
        showDaysHeader={showDaysHeader}
        mode={mode}
        onPressEvent={onPressEvent}
        onShowAllDayEvents={onShowAllDayEvents}
      />
      <CalendarBody
        {...commonProps}
        style={bodyContainerStyle}
        containerHeight={height}
        events={daytimeEvents}
        eventCellStyle={eventCellStyle}
        hideNowIndicator={hideNowIndicator}
        overlapOffset={overlapOffset}
        scrollOffsetMinutes={scrollOffsetMinutes}
        ampm={ampm}
        showTime={showTime}
        onPressCell={onPressCell}
        onPressEvent={onPressEvent}
        onSwipeHorizontal={onSwipeHorizontal}
        renderEvent={renderEvent}
        headerComponent={headerComponent}
        headerComponentStyle={headerComponentStyle}
        hourStyle={hourStyle}
      />
    </React.Fragment>
  );
}

export const CalendarContainer = typedMemo(_CalendarContainer);
