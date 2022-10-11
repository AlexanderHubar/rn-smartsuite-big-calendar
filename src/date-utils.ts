import type { DateData } from 'react-native-calendars/src/types';
import dayjs from 'dayjs';
import { FieldType } from './interfaces';
import { isAllDayEvent } from './utils';

export const getTime = (date: Date, ampm?: boolean) => {
  const dateWithoutFormat = dayjs.utc(date);

  if (ampm) {
    return dateWithoutFormat.format('h:mm A');
  }

  return dateWithoutFormat.format('HH:mm');
};

export const getRecordTimeRange = (record: any, ampm?: boolean) => {
  const fromDate =
    record.fromDate?.include_time &&
    record.fromDate?.date &&
    dayjs.utc(record.fromDate?.date);
  const toDate =
    record.toDate?.include_time &&
    record.toDate?.date &&
    dayjs.utc(record.toDate?.date);

  const timeRange = () => {
    if (fromDate && toDate) {
      const isAllDay = isAllDayEvent(record.fieldType, fromDate, toDate);

      if (isAllDay) {
        return 'All-day';
      }

      return `${getTime(fromDate, ampm)} - ${getTime(toDate, ampm)}`;
    }

    if (toDate || fromDate) {
      return toDate ? getTime(toDate, ampm) : getTime(fromDate, ampm);
    }
    return 'All-day';
  };

  const startDate = () => {
    if (fromDate) {
      return getTime(fromDate, ampm);
    }
    return 'All-day';
  };

  switch (record.fieldType as FieldType) {
    case FieldType.datefield:
      return startDate();
    case FieldType.daterangefield:
    case FieldType.duedatefield:
    case FieldType.firstcreatedfield:
    case FieldType.lastupdatedfield:
      return timeRange();
  }
};

export const getOverdueDays = (record: any) => {
  const statusUpdateDate = dayjs.utc(
    record.dueDateStatus.statusResult?.updated_on
  );

  const startDate = record.dueDateStatus.isComplete
    ? statusUpdateDate
    : dayjs().utc();

  const endDate = record.toDate?.date
    ? dayjs.utc(record.toDate?.date)
    : dayjs.utc(record.fromDate?.date);

  return dayjs(getDateWithoutTime(endDate)).diff(
    getDateWithoutTime(startDate),
    'day'
  );
};

export const getDateWithoutTime = (date?: string | dayjs.Dayjs | null) =>
  dayjs.utc(date).format('YYYY-MM-DD');

export const updateCurrentMonthDay = (date: Date) => {
  const currentDate = new Date();

  const isCurrentMonth = currentDate.getUTCMonth() === date.getUTCMonth();

  const currentDay = currentDate.getUTCDate();
  const updatedDate = date.setUTCDate(isCurrentMonth ? currentDay : 1);
  return new Date(updatedDate).toISOString();
};

export const scrollDirection = (date: DateData, currentDate?: string) =>
  dayjs.utc(date.dateString).isBefore(currentDate) ? 'RIGHT' : 'LEFT';
