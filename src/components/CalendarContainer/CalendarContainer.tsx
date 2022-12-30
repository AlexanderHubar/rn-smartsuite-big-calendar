import dayjs, { Dayjs } from 'dayjs';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
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
} from '../../utils';
import { CalendarBody } from '../CalendarBody';
import { CalendarHeader } from '../CalendarHeader';
import { CalendarList } from '../CalendarList';
import { CalendarDateRangeHeader } from '../CalendarDateRangeHeader';
import { CalendarMonth } from '../CalendarMonth';
import XDate from 'xdate';
import type { FocusEventData } from '../../interfaces';
import type { CalendarRef } from '../../interfaces';
import { noop } from '../noop';
import { toZonedEvent } from '../Calendar/helpers';

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
  timeZone?: string;
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
  onShowAllDayEvents?: (date: Date) => void;
  onAddEvent?: (date: Date) => void;
  onDateRangePress?: () => void;
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

function _CalendarContainer<T>(
  {
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
    onShowAllDayEvents = noop,
    onAddEvent = noop,
    onDateRangePress,
    renderEvent,
    renderHeader: HeaderComponent = CalendarHeader,
    weekEndsOn = 6,
    activeDate,
    headerComponentStyle = {},
    hourStyle = {},
    showAllDayEventCell = true,
    showDaysHeader = true,
    activeColor,
  }: CalendarContainerProps<T>,
  ref?: React.Ref<CalendarRef> | null
) {
  const [targetDate, setTargetDate] = React.useState(dayjs(date));
  const [todayDate, setTodayDate] = React.useState(dayjs(date));
  const [focusEvent, setFocusEvent] = useState<ICalendarEvent<T> | null>(null);
  const calendarRef = useRef<any | null>(null);

  const getHighlightedEvent = (selectedEvent: FocusEventData | null) => {
    const event = events.find(
      (_event) =>
        _event.recordId === selectedEvent?.recordId &&
        _event.slug === selectedEvent?.eventSlug
    );

    if (event) {
      updateTargetCalendarDate(dayjs(event.fromDate.date));
      setFocusEvent({ ...event, uniqueId: Math.random().toString() });
    }
  };

  useImperativeHandle(ref, () => ({
    focusEvent: (event: FocusEventData) => getHighlightedEvent(event),
  }));

  React.useEffect(() => {
    if (date) {
      updateTargetCalendarDate(dayjs(date));
    }
  }, [date]);

  const updateTargetCalendarDate = (_targetDay: Dayjs) => {
    setTargetDate(_targetDay);
    setTodayDate(_targetDay);
    if (calendarRef.current) {
      calendarRef.current.updateMonth(
        new XDate(_targetDay.year(), _targetDay.month(), _targetDay.day()),
        true
      );
    }
  };

  const allDayEvents = React.useMemo(
    () =>
      events.map(toZonedEvent).filter((event) =>
        // @ts-ignore
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
        setTargetDate(targetDate.add(modeToNum(mode, targetDate, direction), 'day'));
        calendarRef.current?.onSwipeLeft();
      } else {
        setTargetDate(targetDate.add(-modeToNum(mode, targetDate, direction), 'day'));
        calendarRef.current?.onSwipeRight();
      }
    },
    [swipeEnabled, targetDate, mode, theme.isRTL]
  );

  const onTodayPress = () => updateTargetCalendarDate(dayjs());

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
          onDateRangePress={onDateRangePress}
        />
        <CalendarMonth
          ampm={ampm}
          calendarRef={calendarRef}
          events={events}
          dateRange={dateRange}
          targetDate={targetDate}
          todayDate={todayDate}
          focusEvent={focusEvent}
          activeColor={activeColor}
          onEventPress={onPressEvent}
          onSwipeHorizontal={onSwipeHorizontal}
          onFocusEventEnd={() => setFocusEvent(null)}
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
          onDateRangePress={onDateRangePress}
        />
        <CalendarList
          ampm={ampm}
          events={events}
          dateRange={dateRange}
          activeColor={activeColor}
          focusEvent={focusEvent}
          onEventPress={onPressEvent}
          onSwipeHorizontal={onSwipeHorizontal}
          onAddEvent={onAddEvent}
          onFocusEventEnd={() => setFocusEvent(null)}
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
        onDateRangePress={onDateRangePress}
      />
      {/* @ts-ignore */}
      <HeaderComponent
        {...headerProps}
        showDaysHeader={showDaysHeader}
        mode={mode}
        onPressEvent={onPressEvent}
        onShowAllDayEvents={onShowAllDayEvents}
        focusEvent={focusEvent}
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
        headerComponentStyle={headerComponentStyle}
        hourStyle={hourStyle}
        focusEvent={focusEvent}
      />
    </React.Fragment>
  );
}

export const CalendarContainer = forwardRef<
  CalendarRef,
  CalendarContainerProps<any>
>(_CalendarContainer);
