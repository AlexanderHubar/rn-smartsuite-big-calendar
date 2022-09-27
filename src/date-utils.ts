import type { DateData } from 'react-native-calendars/src/types';
import dayjs from 'dayjs';
import { FieldType } from './interfaces';
import { zonedDate } from './utils';

export const getTime = (date: Date, ampm?: boolean) => {
  const dateWithoutFormat = zonedDate(date);

  if (ampm) {
    return dateWithoutFormat.format('h:mm A');
  }

  return dateWithoutFormat.format('HH:mm');
};

export const getRecordTimeRange = (record: any, ampm?: boolean) => {
  const fromDate =
    record.fromDate?.include_time &&
    record.fromDate?.date &&
    new Date(record.fromDate?.date);
  const toDate =
    record.toDate?.include_time &&
    record.toDate?.date &&
    new Date(record.toDate?.date);

  const timeRange = () => {
    if (fromDate && toDate) {
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
    case FieldType.firstcreatedfield:
    case FieldType.lastupdatedfield:
      return startDate();
    case FieldType.daterangefield:
    case FieldType.duedatefield:
      return timeRange();
  }
};

export const getOverdueDays = (record: any) => {
  const statusUpdateDate = getUtcDate(
    record.dueDateStatus.statusResult?.updated_on || new Date()
  );
  const currentDate = new Date();
  const dateStartPoint = record.dueDateStatus.isComplete
    ? statusUpdateDate
    : currentDate;

  // TODO: handle include_time
  const endDate = record.toDate?.date
    ? getUtcDate(record.toDate?.date)
    : getUtcDate(record.fromDate?.date || new Date());
  return dayjs(endDate).diff(dateStartPoint, 'day');
};

export const getUtcDate = (date: string | Date) => zonedDate(date);

export const getDateWithoutTime = (date?: string | null) =>
  zonedDate(date).format('YYYY-MM-DD');

export const updateCurrentMonthDay = (date: Date) => {
  const currentDate = new Date();

  const isCurrentMonth = currentDate.getUTCMonth() === date.getUTCMonth();

  const currentDay = currentDate.getUTCDate();
  const updatedDate = date.setUTCDate(isCurrentMonth ? currentDay : 1);
  return new Date(updatedDate).toISOString();
};

export const scrollDirection = (date: DateData, currentDate?: string) =>
  dayjs(date.dateString).isBefore(currentDate) ? 'RIGHT' : 'LEFT';
