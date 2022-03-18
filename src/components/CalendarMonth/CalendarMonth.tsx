import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ICalendarEvent,
  isFocusElement,
  typedMemo,
} from 'rn-smartsuite-big-calendar';

import { Calendar } from 'react-native-calendars';
import { Animated, Easing, FlatList, View } from 'react-native';
import type { CalendarMonthProps, MarkedDatesType } from './types';
import dayjs from 'dayjs';
import {
  getDateWithoutTime,
  updateCurrentMonthDay,
  scrollDirection,
} from '../../date-utils';

import { Container, styles, CalendarContainer } from './styled';
import { CalendarEventItem } from '../CalendarEventListItem';
import { EmptyEventList } from '../CalendarList/EmptyList';
import { usePanResponder } from '../../hooks/usePanResponder';
import type { DateData } from 'react-native-calendars/src/types';
import { useTheme } from 'styled-components';
import { CalendarContext } from '../Calendar/CalendarContext';
import { useSpotlight } from '../../hooks/useSpotlight';

function _CalendarMonth<T>({
  ampm,
  calendarRef,
  events,
  dateRange,
  targetDate,
  todayDate,
  focusEvent,
  activeColor,
  onEventPress,
  onSwipeHorizontal,
  onFocusEventEnd,
}: CalendarMonthProps<T>) {
  const theme = useTheme();
  const { isLightMode } = useContext(CalendarContext);
  const eventsListRef = useRef<FlatList>(null);
  const { color } = useSpotlight();

  const [currentDate, setCurrentDate] = useState(
    getDateWithoutTime(targetDate.toISOString())
  );

  const animatedValue = new Animated.Value(0);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 0],
  });

  const highlightItem = Animated.timing(animatedValue, {
    toValue: 1,
    duration: 1000,
    easing: Easing.ease,
    useNativeDriver: false,
  });

  const panResponder = usePanResponder({
    onSwipeHorizontal,
  });

  const monthEvents = dateRange
    .map((date) =>
      events.filter((event) =>
        dayjs(date).isBetween(
          event.fromDate.date,
          event.toDate?.date,
          'day',
          '[]'
        )
      )
    )
    .flat(2);

  const dayEvents = events.filter((event) =>
    dayjs(getDateWithoutTime(event.toDate?.date)).isSame(currentDate)
  );

  const markedDotes: MarkedDatesType = monthEvents.reduce(
    (acc, curr: ICalendarEvent) => {
      const date = getDateWithoutTime(curr.toDate?.date)?.toString() ?? '';
      const isSelected = dayjs(date).isSame(currentDate);

      return {
        ...acc,
        [date]: {
          selected: isSelected,
          marked: true,
          dotColor: isSelected ? '#FFFFFF' : theme.monthCalendar.dotColor,
          selectedColor: isSelected ? activeColor : '#FFFFFF',
        },
      };
    },
    {}
  );

  const changeDirection = (date: DateData) =>
    onSwipeHorizontal && onSwipeHorizontal(scrollDirection(date, currentDate));

  const handleOnMonthChanged = (date: DateData) => {
    setCurrentDate(
      getDateWithoutTime(updateCurrentMonthDay(new Date(date.dateString)))
    );
  };

  const handleOnDayPress = (date: DateData) => {
    if (dayjs(date.dateString).month() !== dayjs(currentDate).month()) {
      changeDirection(date);
    }
    setCurrentDate(date.dateString);
  };

  const focusElementIndex = () => {
    new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
      if (focusEvent && eventsListRef.current) {
        const dEvents = events.filter((event) =>
          dayjs(getDateWithoutTime(event.toDate?.date)).isSame(
            dayjs(getDateWithoutTime(focusEvent.toDate?.date))
          )
        );
        const eventIndex = dEvents.findIndex(
          (event) =>
            event.slug === focusEvent.slug &&
            event.recordId &&
            focusEvent.recordId
        );
        if (eventIndex !== -1) {
          eventsListRef.current.scrollToIndex({
            index: eventIndex,
            animated: true,
          });

          animatedValue.setValue(0);
          setTimeout(() => highlightItem.start(onFocusEventEnd), 100);
        }
      }
    });
  };

  useEffect(() => {
    setCurrentDate(getDateWithoutTime(todayDate.toISOString()));
  }, [todayDate]);

  useEffect(() => focusElementIndex(), [focusEvent?.uniqueId]);

  return (
    <Container>
      <CalendarContainer {...panResponder.panHandlers}>
        <Calendar
          ref={(ref) => {
            calendarRef.current = ref;
          }}
          current={currentDate}
          onDayPress={handleOnDayPress}
          hideArrows
          firstDay={1}
          renderHeader={() => <View />}
          markedDates={{
            ...markedDotes,
            [`${currentDate}`]: {
              ...markedDotes[`${currentDate}`],
              selected: true,
              selectedColor: activeColor,
            },
          }}
          theme={{
            ...theme.monthCalendar,
            todayTextColor: activeColor,
          }}
          style={{
            ...styles.calendar,
            borderColor: theme.monthCalendar.borderColor,
          }}
          onMonthChange={handleOnMonthChanged}
        />
      </CalendarContainer>
      <FlatList
        ref={eventsListRef}
        style={{ flex: 1, backgroundColor: theme.background }}
        data={dayEvents}
        contentContainerStyle={styles.events}
        {...panResponder.panHandlers}
        keyExtractor={(_, index) => `${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: event }) => (
          <CalendarEventItem
            isLightMode={isLightMode}
            event={event}
            opacity={opacity}
            isFocusElement={isFocusElement(event, focusEvent)}
            onPress={onEventPress}
            ampm={ampm}
            color={color(event)}
          />
        )}
        ListEmptyComponent={<EmptyEventList />}
      />
    </Container>
  );
}

export const CalendarMonth = typedMemo(_CalendarMonth);
