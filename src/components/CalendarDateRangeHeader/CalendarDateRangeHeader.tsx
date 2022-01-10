import React, { useContext } from 'react';
import { Mode, typedMemo } from 'rn-smartsuite-big-calendar';
import type { CalendarDateRangeHeaderProps, HeaderDateFormat } from './types';

import {
  ArrowContainer,
  DateRangeContainer,
  HeaderContainer,
  HeaderText,
  TodayButtonContainer,
  ViewModeContainer,
} from './styled';

import ArrowLeft from '../../ui/assets/svg/arrow-left.svg';
import ArrowRight from '../../ui/assets/svg/arrow-right.svg';
import ArrowDown from '../../ui/assets/svg/arrow-down.svg';
import dayjs from 'dayjs';
import { CalendarContext } from '../Calendar/CalendarContext';

const getModeLabel = (mode: Mode): string => {
  switch (mode) {
    case 'timeGrid':
      return 'calendar.library.timeGrid';
    case 'timeThreeDays':
      return 'calendar.library.timeThreeDays';
    case 'timeGridWeek':
      return 'calendar.library.timeGridWeek';
    case 'dayGridMonth':
      return 'calendar.library.dayGridMonth';
    case 'listWeek':
      return 'calendar.library.listWeek';
    default:
      return 'calendar.library.week';
  }
};

const isCurrentYear = (date: dayjs.Dayjs) =>
  dayjs(date).year() === dayjs().year();

const headerDateFormat = (
  mode: Mode,
  isStartCurrYear: boolean,
  isEndCurrYear: boolean
): HeaderDateFormat => {
  if (mode === 'timeGrid') {
    return {
      startDateFormat: isStartCurrYear ? 'dddd, MMM D' : 'dddd, MMM D, YYYY',
      endDateFormat: '',
    };
  } else if (mode === 'dayGridMonth') {
    return {
      startDateFormat: isStartCurrYear ? 'MMMM' : 'MMMM YYYY',
      endDateFormat: '',
    };
  } else {
    if (isStartCurrYear && isEndCurrYear) {
      return { startDateFormat: 'MMM D', endDateFormat: 'MMM D' };
    } else if (isStartCurrYear && !isEndCurrYear) {
      return { startDateFormat: 'MMM D, YYYY', endDateFormat: 'MMM D, YYYY' };
    } else {
      return { startDateFormat: 'MMM D, YYYY', endDateFormat: 'MMM D' };
    }
  }
};

const getDateRange = (mode: Mode, dateRange: dayjs.Dayjs[]): string => {
  if (mode === 'timeGrid' || mode === 'dayGridMonth') {
    const { startDateFormat } = headerDateFormat(
      mode,
      isCurrentYear(dateRange[0]),
      false
    );
    return dayjs(dateRange[0]).format(startDateFormat);
  } else {
    const { startDateFormat, endDateFormat } = headerDateFormat(
      mode,
      isCurrentYear(dateRange[0]),
      isCurrentYear(dateRange[dateRange.length - 1])
    );
    const startDate = dayjs(dateRange[0]).format(startDateFormat);
    const endDate = dayjs(dateRange[dateRange.length - 1]).format(
      endDateFormat
    );
    return `${startDate} - ${endDate}`;
  }
};

function _CalendarDateRangeHeader({
  mode,
  dateRange,
  onToday,
  onChangeRange,
  onChangeMode,
}: CalendarDateRangeHeaderProps) {
  const { t } = useContext(CalendarContext);

  return (
    <HeaderContainer>
      <TodayButtonContainer onPress={onToday}>
        <HeaderText numberOfLines={1}>{t('calendar.library.today')}</HeaderText>
      </TodayButtonContainer>
      <DateRangeContainer>
        <ArrowContainer onPress={() => onChangeRange('RIGHT')}>
          <ArrowLeft />
        </ArrowContainer>
        <HeaderText>{getDateRange(mode, dateRange)}</HeaderText>
        <ArrowContainer onPress={() => onChangeRange('LEFT')}>
          <ArrowRight />
        </ArrowContainer>
      </DateRangeContainer>
      <ViewModeContainer onPress={() => onChangeMode && onChangeMode(mode)}>
        <HeaderText numberOfLines={1}>{t(getModeLabel(mode))}</HeaderText>
        <ArrowContainer disabled>
          <ArrowDown />
        </ArrowContainer>
      </ViewModeContainer>
    </HeaderContainer>
  );
}

export const CalendarDateRangeHeader = typedMemo(_CalendarDateRangeHeader);
