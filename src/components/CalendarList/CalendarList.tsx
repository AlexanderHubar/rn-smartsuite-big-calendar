import React from 'react';
import { ICalendarEvent, typedMemo } from 'rn-smartsuite-big-calendar';

import type { CalendarListProps } from './types';
import { useGroupBy } from '../../hooks/useGroupBy';
import { getDateWithoutTime } from '../../date-utils';
import { SectionList } from 'react-native';
import { CalendarEventItem } from '../CalendarEventListItem';
import { ListHeader } from './CalendarListHeader';

import { ScrollViewContainer, styleSheet } from './styled';
import { usePanResponder } from '../../hooks/usePanResponder';
import dayjs from 'dayjs';
import { EmptyEventList } from './EmptyList';

function _CalendarList<T>({
  events,
  dateRange,
  onSwipeHorizontal,
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
    <ScrollViewContainer
      ref={scrollView}
      contentContainerStyle={styleSheet.scrollView}
      scrollEventThrottle={32}
      {...panResponder.panHandlers}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
    >
      <SectionList
        stickySectionHeadersEnabled={false}
        sections={sections}
        renderItem={({ item: data }) => (
          <CalendarEventItem event={data} onPress={() => {}} />
        )}
        renderSectionHeader={({ section: { section } }) => (
          <ListHeader date={section} />
        )}
        ListEmptyComponent={<EmptyEventList />}
      />
    </ScrollViewContainer>
  );
}

export const CalendarList = typedMemo(_CalendarList);
