import { utcToZonedTime } from 'date-fns-tz';
import differenceInDays from 'date-fns/differenceInCalendarDays';

export const getTime = (date: Date) =>
  date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

export const getRecordTimeRange = (record: any) => {
  const fromDate =
    record.fromDate?.include_time &&
    record.fromDate?.date &&
    new Date(record.fromDate?.date);
  const toDate =
    record.toDate?.include_time &&
    record.toDate?.date &&
    new Date(record.toDate?.date);

  if (fromDate && toDate) {
    return `${getTime(fromDate)} - ${getTime(toDate)}`;
  }

  if (toDate || fromDate) {
    return toDate ? getTime(toDate) : getTime(fromDate);
  }
  return 'All-day';
};

export const getOverdueDays = (record: any) => {
  const statusUpdateDate = getUtcDate(
    record.dueDateStatus.statusResult?.updated_on || new Date()
  );
  const currentDate = new Date();
  const dateStartPoint = record.dueDateStatus.isComplete
    ? statusUpdateDate
    : currentDate;

  const endDate = record.toDate?.date
    ? getUtcDate(record.toDate?.date, record.toDate?.include_time)
    : getUtcDate(
        record.fromDate?.date || new Date(),
        record.fromDate?.include_time
      );
  return differenceInDays(endDate, dateStartPoint);
};

export const getUtcDate = (date: string | Date, timezone: string = 'UTC') =>
  utcToZonedTime(date, timezone);

export const getDateWithoutTime = (date?: string | null) => date?.split('T')[0];

export const updateCurrentMonthDay = (date: Date) => {
  const currentDate = new Date();

  const isCurrentMonth = currentDate.getUTCMonth() === date.getUTCMonth();

  const currentDay = currentDate.getUTCDate();
  const updatedDate = date.setUTCDate(isCurrentMonth ? currentDay : 1);
  return new Date(updatedDate).toISOString();
};
