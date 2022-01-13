import { Platform } from 'react-native';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';

import 'intl';
import 'intl/locale-data/jsonp/en';

if (Platform.OS === 'android') {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof (Intl as any).__disableRegExpRestore === 'function') {
    (Intl as any).__disableRegExpRestore();
  }

  require('@formatjs/intl-locale/polyfill');
  require('@formatjs/intl-datetimeformat/polyfill');
  require('@formatjs/intl-datetimeformat/locale-data/en');
  require('@formatjs/intl-datetimeformat/add-all-tz');
}

export { Calendar } from './components/Calendar';

dayjs.extend(duration);
dayjs.extend(isBetween);

export * from './components/Calendar';
export * from './components/CalendarBody';
export * from './components/CalendarBodyForMonthView';
export * from './components/CalendarEvents';
export * from './components/CalendarEventForMonthView';
export * from './components/CalendarHeader';
export * from './components/CalendarHeaderForMonthView';
export * from './components/DefaultCalendarEventRenderer';
export * from './components/CalendarEventListItem';

export * from './commonStyles';
export * from './interfaces';
export * from './theme/ThemeContext';
export * from './theme/ThemeInterface';
export * from './theme/lightTheme';
export * from './utils';

export * from './interfaces';
