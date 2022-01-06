import React from 'react';
import { ICalendarEvent, typedMemo } from 'rn-smartsuite-big-calendar';

import type { CalendarListProps } from './types';
import { useGroupBy } from '../../hooks/useGroupBy';
import { getDateWithoutTime } from '../../date-utils';
import { SectionList } from 'react-native';
import { CalendarEventItem } from '../CalendarEventListItem';
import { ListHeader } from './CalendarListHeader';

import { styleSheet, ListContainer } from './styled';
import { usePanResponder } from '../../hooks/usePanResponder';
import dayjs from 'dayjs';
import { EmptyEventList } from './EmptyList';

function _CalendarList<T>({
  events,
  dateRange,
  activeColor,
  onEventPress,
  onSwipeHorizontal,
  onAddEvent,
}: CalendarListProps<T>) {
  const scrollView = React.useRef(null);
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

  return (
    <ListContainer>
      <SectionList
        sections={sections}
        contentContainerStyle={styleSheet.scrollView}
        ref={scrollView}
        {...panResponder.panHandlers}
        stickySectionHeadersEnabled={false}
        scrollEventThrottle={32}
        nestedScrollEnabled
        renderItem={({ item: data }) => (
          <CalendarEventItem event={data} onPress={onEventPress} />
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
