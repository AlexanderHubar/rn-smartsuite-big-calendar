import dayjs from 'dayjs';
import * as React from 'react';
import {
  Animated,
  Easing,
  Platform,
  ScrollView,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { u } from '../../commonStyles';
import { useNow } from '../../hooks/useNow';
import { usePanResponder } from '../../hooks/usePanResponder';
import type {
  EventCellStyle,
  EventRenderer,
  HorizontalDirection,
  ICalendarEvent,
} from '../../interfaces';
import {
  getOrderOfEvent,
  getRelativeTopInDay,
  hours,
  isFocusElement,
  isToday,
  typedMemo,
} from '../../utils';
import { CalendarEvent } from '../CalendarEvents';
import { HourGuideColumn } from '../HourGuideColumn';

import { NowIndicatorTriangle, NowIndicator } from './styled';
import { useTheme } from 'styled-components';
import { useEffect } from 'react';
import { Events } from './Events';
import { Hours } from './HourGuide';

interface CalendarBodyProps<T> {
  cellHeight: number;
  containerHeight: number;
  dateRange: dayjs.Dayjs[];
  events: ICalendarEvent<T>[];
  scrollOffsetMinutes: number;
  ampm: boolean;
  showTime: boolean;
  style: ViewStyle;
  eventCellStyle?: EventCellStyle<T>;
  hideNowIndicator?: boolean;
  overlapOffset?: number;
  onPressCell?: (date: Date) => void;
  onPressEvent?: (event: ICalendarEvent<T>) => void;
  onSwipeHorizontal?: (d: HorizontalDirection) => void;
  renderEvent?: EventRenderer<T>;
  headerComponent?: React.ReactElement | null;
  headerComponentStyle?: ViewStyle;
  hourStyle?: TextStyle;
  focusEvent?: ICalendarEvent<T> | any;
}

function _CalendarBody<T>({
  containerHeight,
  cellHeight,
  dateRange,
  style,
  events,
  onPressEvent,
  eventCellStyle,
  ampm,
  showTime,
  scrollOffsetMinutes,
  onSwipeHorizontal,
  hideNowIndicator,
  overlapOffset,
  renderEvent,
  hourStyle = {},
  focusEvent,
}: CalendarBodyProps<T>) {
  const scrollView = React.useRef<ScrollView>(null);
  const { now } = useNow(!hideNowIndicator);
  const theme = useTheme();

  const animatedValue = new Animated.Value(0);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, 1, 0],
  });

  const highlightItem = Animated.timing(animatedValue, {
    toValue: 1,
    duration: 1000,
    easing: Easing.ease,
    useNativeDriver: false,
  });

  React.useEffect(() => {
    if (scrollView.current && scrollOffsetMinutes && Platform.OS !== 'ios') {
      // We add delay here to work correct on React Native
      // see: https://stackoverflow.com/questions/33208477/react-native-android-scrollview-scrollto-not-working
      setTimeout(
        () => {
          if (scrollView && scrollView.current) {
            scrollView.current.scrollTo({
              y: (cellHeight * scrollOffsetMinutes) / 60,
              animated: false,
            });
          }
        },
        Platform.OS === 'web' ? 0 : 10
      );
    }
  }, [scrollView, scrollOffsetMinutes, cellHeight]);

  const panResponder = usePanResponder({
    onSwipeHorizontal,
  });

  const focusElementIndex = () => {
    new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
      if (focusEvent && scrollView.current) {
        if (!focusEvent.fromDate.include_time) {
          return;
        }
        const eventHours = dayjs(focusEvent.fromDate.date).hour();
        const scrollY = cellHeight * eventHours;

        scrollView?.current.scrollTo({ x: 0, y: scrollY, animated: true });
        animatedValue.setValue(0);
        setTimeout(() => highlightItem.start(), 300);
      }
    });
  };

  useEffect(() => focusElementIndex(), [focusEvent?.uniqueId]);

  const _renderMappedEvent = (event: ICalendarEvent<T>) => (
    <CalendarEvent
      key={`${event.fromDate.date}${event.recordTitle}${event.toDate?.date}`}
      event={event}
      onPressEvent={onPressEvent}
      eventCellStyle={eventCellStyle}
      showTime={showTime}
      eventOrder={getOrderOfEvent(event, events)}
      overlapOffset={overlapOffset}
      renderEvent={renderEvent}
      ampm={ampm}
      opacity={opacity}
      isFocusElement={isFocusElement(event, focusEvent)}
    />
  );

  return (
    <React.Fragment>
      <ScrollView
        style={[
          {
            height: containerHeight - cellHeight * 3,
            backgroundColor: theme.background,
          },
          style,
        ]}
        ref={scrollView}
        scrollEventThrottle={32}
        {...(Platform.OS !== 'web' ? panResponder.panHandlers : {})}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentOffset={
          Platform.OS === 'ios'
            ? { x: 0, y: scrollOffsetMinutes }
            : { x: 0, y: 0 }
        }
      >
        <View
          style={[
            u['flex-1'],
            theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
          ]}
          {...(Platform.OS === 'web' ? panResponder.panHandlers : {})}
        >
          <View style={[u['z-20'], u['w-50']]}>
            {hours.map((hour, index) => (
              <HourGuideColumn
                key={hour}
                cellHeight={cellHeight}
                hour={hour}
                ampm={ampm}
                index={index}
                hourStyle={hourStyle}
              />
            ))}
          </View>
          {dateRange.map((date, dateIndex) => {
            return (
              <View
                style={[u['flex-1'], u['overflow-hidden']]}
                key={date.toString()}
              >
                <Hours
                  hours={hours}
                  cellHeight={cellHeight}
                  dateIndex={dateIndex}
                />

                {/* Render events of this date */}
                {/* M  T  (W)  T  F  S  S */}
                {/*       S-E             */}
                <Events
                  events={events}
                  _renderMappedEvent={_renderMappedEvent}
                  date={date}
                />

                {isToday(date) && !hideNowIndicator && (
                  <NowIndicator top={getRelativeTopInDay(now)}>
                    <NowIndicatorTriangle
                      style={{
                        transform: [
                          { rotate: '135deg' },
                          { translateX: 1 },
                          { translateY: 6 },
                        ],
                      }}
                    />
                  </NowIndicator>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </React.Fragment>
  );
}

export const CalendarBody = typedMemo(_CalendarBody);
