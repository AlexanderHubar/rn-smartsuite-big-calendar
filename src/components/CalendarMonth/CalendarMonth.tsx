import React, { useContext, useEffect, useState } from 'react';
import { ICalendarEvent, typedMemo } from 'rn-smartsuite-big-calendar';

import { Calendar } from 'react-native-calendars';
import { FlatList, View } from 'react-native';
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
  activeColor,
  onEventPress,
  onSwipeHorizontal,
}: CalendarMonthProps<T>) {
  const theme = useTheme();
  const { color } = useSpotlight();

  const [currentDate, setCurrentDate] = useState(
    getDateWithoutTime(targetDate.toISOString())
  );

  useEffect(() => {
    setCurrentDate(getDateWithoutTime(todayDate.toISOString()));
  }, [todayDate]);

  const panResponder = usePanResponder({
    onSwipeHorizontal,
  });

  const monthEvents = dateRange
    .map((date) =>
      events.filter((event) =>
        dayjs(event.toDate?.date ?? event.fromDate?.date).isBetween(
          date.startOf('day'),
          date.endOf('day'),
          null,
          '[)'
        )
      )
    )
    .flat(2);

  const dayEvents = events.filter((event) =>
    dayjs(
      getDateWithoutTime(event.toDate?.date ?? event.fromDate?.date)
    ).isSame(currentDate)
  );

  const markedDotes: MarkedDatesType = monthEvents.reduce(
    (acc, curr: ICalendarEvent) => {
      const date =
        getDateWithoutTime(
          curr.toDate?.date ?? curr.fromDate?.date
        )?.toString() ?? '';
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

  const { isLightMode } = useContext(CalendarContext);

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
        style={{ flex: 1, backgroundColor: theme.background }}
        data={dayEvents}
        contentContainerStyle={styles.events}
        {...panResponder.panHandlers}
        keyExtractor={(_, index) => `${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: event }) => {
          const eventItemColor = color(
            event.recordId + event.slug,
            event.color.background
          );

          return (
            <CalendarEventItem
              isLightMode={isLightMode}
              event={event}
              onPress={onEventPress}
              ampm={ampm}
              color={eventItemColor}
            />
          );
        }}
        ListEmptyComponent={<EmptyEventList />}
      />
    </Container>
  );
}

export const CalendarMonth = typedMemo(_CalendarMonth);
