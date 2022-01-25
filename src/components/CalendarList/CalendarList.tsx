import React, { useContext, useEffect, useRef } from 'react';
import { ICalendarEvent, typedMemo } from 'rn-smartsuite-big-calendar';

import type { CalendarListProps } from './types';
import { useGroupBy } from '../../hooks/useGroupBy';
import { getDateWithoutTime } from '../../date-utils';
import { Animated, SectionList, SectionListData, Easing } from 'react-native';
import { CalendarEventItem } from '../CalendarEventListItem';
import { ListHeader } from './CalendarListHeader';

import { styleSheet, ListContainer } from './styled';
import { usePanResponder } from '../../hooks/usePanResponder';
import dayjs from 'dayjs';
import { EmptyEventList } from './EmptyList';
import { CalendarContext } from '../Calendar/CalendarContext';

function _CalendarList<T>({
  ampm,
  events,
  dateRange,
  activeColor,
  focusEvent,
  onEventPress,
  onSwipeHorizontal,
  onAddEvent,
  onFocusEventEnd,
}: CalendarListProps<T>) {
  const sectionRef = useRef<SectionList>(null);
  const { groupBy } = useGroupBy();
  const { isLightMode } = useContext(CalendarContext);

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

  const weekEvents = dateRange
    .map((date) =>
      events.filter((event) =>
        dayjs(event.fromDate?.date).isBetween(
          date.startOf('day'),
          date.endOf('day'),
          null,
          '[)'
        )
      )
    )
    .flat(2);

  const groupedEventsByDate = groupBy(weekEvents, (event: ICalendarEvent) =>
    getDateWithoutTime(event.fromDate?.date)
  );
  const sections = [...groupedEventsByDate].reduce((acc: any, curr) => {
    return [...acc, { section: curr[0], data: curr[1] }];
  }, []);

  const scrollToLocation = () => {
    const currDate = getDateWithoutTime(dayjs().toISOString());
    const index = sections.findIndex(
      (item: SectionListData<any>) => item.section === currDate
    );

    if (sections.length) {
      sectionRef.current?.scrollToLocation({
        sectionIndex: index === -1 ? 0 : index,
        itemIndex: 0,
      });
    }
  };

  const scrollToIndex = () => {
    new Promise((resolve) => setTimeout(resolve, 100)).then(scrollToLocation);
  };

  const focusElementIndex = () => {
    new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
      if (focusEvent && sectionRef.current) {
        const eventDate = getDateWithoutTime(
          dayjs(focusEvent.fromDate?.date).toISOString()
        );
        const sectionIndex = sections.findIndex(
          (item: SectionListData<any>) => item.section === eventDate
        );
        const itemIndex = sections[sectionIndex].data.findIndex(
          (section: ICalendarEvent) =>
            section.recordId === focusEvent.recordId &&
            section.slug === focusEvent.slug
        );

        sectionRef.current?.scrollToLocation({
          sectionIndex: sectionIndex === -1 ? 0 : sectionIndex,
          itemIndex: itemIndex === -1 ? 0 : itemIndex + 1,
        });

        animatedValue.setValue(0);
        setTimeout(() => highlightItem.start(onFocusEventEnd), 100);
      }
    });
  };

  const isFocusElement = (data: any): boolean =>
    Boolean(
      focusEvent &&
        focusEvent.slug === data.slug &&
        focusEvent.recordId === data.recordId
    );

  useEffect(() => {
    if (!focusEvent) {
      scrollToIndex();
    }
  }, [dateRange]);

  useEffect(() => focusElementIndex(), [focusEvent?.uniqueId]);

  return (
    <ListContainer>
      <SectionList
        style={{ flex: 1 }}
        sections={sections}
        onScrollToIndexFailed={scrollToIndex}
        contentContainerStyle={styleSheet.scrollView}
        ref={sectionRef}
        {...panResponder.panHandlers}
        stickySectionHeadersEnabled={false}
        scrollEventThrottle={32}
        nestedScrollEnabled
        renderItem={({ item: data }) => (
          <CalendarEventItem
            isLightMode={isLightMode}
            event={data}
            opacity={opacity}
            isFocusElement={isFocusElement(data)}
            onPress={onEventPress}
            ampm={ampm}
          />
        )}
        renderSectionHeader={({ section: { section } }) => (
          <ListHeader
            date={section}
            color={activeColor}
            onAddEvent={onAddEvent}
          />
        )}
        ListEmptyComponent={<EmptyEventList />}
      />
    </ListContainer>
  );
}

export const CalendarList = typedMemo(_CalendarList);
