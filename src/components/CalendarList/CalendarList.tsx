import React, { useContext, useEffect, useRef } from 'react';
import { ICalendarEvent, typedMemo } from 'rn-smartsuite-big-calendar';

import type { CalendarListProps } from './types';
import { useGroupBy } from '../../hooks/useGroupBy';
import { getDateWithoutTime } from '../../date-utils';
import { SectionList, SectionListData } from 'react-native';
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
  onEventPress,
  onSwipeHorizontal,
  onAddEvent,
}: CalendarListProps<T>) {
  const sectionRef = useRef<SectionList>(null);
  const { groupBy } = useGroupBy();

  const panResponder = usePanResponder({
    onSwipeHorizontal,
  });

  const weekEvents = dateRange
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

  const groupedEventsByDate = groupBy(weekEvents, (event: ICalendarEvent) =>
    getDateWithoutTime(event.toDate?.date ?? event.fromDate?.date)
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

  useEffect(() => scrollToIndex(), [dateRange]);

  const { isLightMode } = useContext(CalendarContext);

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
