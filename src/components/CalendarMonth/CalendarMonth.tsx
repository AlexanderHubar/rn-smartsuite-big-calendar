import React, { useEffect, useState } from 'react';
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
          dotColor: isSelected ? '#FFFFFF' : '#2E3538',
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
            dayTextColor: '#2E3538',
            textDisabledColor: '#a5a5a5',
            todayTextColor: activeColor,
            calendarBackground: '#FFFFFF',
          }}
          style={styles.calendar}
          onMonthChange={handleOnMonthChanged}
        />
      </CalendarContainer>
      <FlatList
        data={dayEvents}
        style={styles.events}
        {...panResponder.panHandlers}
        keyExtractor={(_, index) => `${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <CalendarEventItem
              event={item}
              onPress={onEventPress}
              ampm={ampm}
            />
          );
        }}
        ListEmptyComponent={<EmptyEventList />}
      />
    </Container>
  );
}

export const CalendarMonth = typedMemo(_CalendarMonth);
