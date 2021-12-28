import type { Mode } from 'rn-smartsuite-big-calendar';
import type dayjs from 'dayjs';
import type { HorizontalDirection } from 'rn-smartsuite-big-calendar';

export interface CalendarDateRangeHeaderProps {
  mode: Mode;
  dateRange: dayjs.Dayjs[];
  onToday?: () => void;
  onChangeRange: (direction: HorizontalDirection) => void;
  onChangeMode?: (mode: Mode) => void;
}

export interface HeaderDateFormat {
  startDateFormat: string;
  endDateFormat: string;
}
