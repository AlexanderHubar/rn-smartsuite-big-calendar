import React, { forwardRef } from 'react';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import { ThemeProvider } from 'styled-components';

import { lightTheme } from '../../theme/lightTheme';
import { darkTheme } from '../../theme/darkTheme';
import { ThemeContext } from '../../theme/ThemeContext';
import type { ThemeInterface } from '../../theme/ThemeInterface';
import {
  CalendarContainer,
  CalendarContainerProps,
} from '../CalendarContainer';
import type { SpotlightItems, WeekNum } from 'rn-smartsuite-big-calendar';
import { CalendarContextProvider } from './CalendarContext';
import type { CalendarRef } from 'rn-smartsuite-big-calendar';

require('dayjs/locale/en');
require('dayjs/locale/ru');
require('dayjs/locale/pl');
require('dayjs/locale/uk');
require('dayjs/locale/bg');
require('dayjs/locale/fr');
require('dayjs/locale/it');
require('dayjs/locale/nl');
require('dayjs/locale/ro');
require('dayjs/locale/es');
require('dayjs/locale/sv');
require('dayjs/locale/pt');
require('dayjs/locale/ja');
require('dayjs/locale/zh-cn');

dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(localeData);

const dayjsLocales: Record<string, string> = {
  'en': 'en',
  'bg': 'bg',
  'fr': 'fr',
  'de': 'de',
  'it': 'it',
  'nl': 'nl',
  'pl': 'pl',
  'pt': 'pt',
  'ro': 'ro',
  'ru': 'ru',
  'es': 'es',
  'sv': 'sv',
  'uk': 'uk',
  'hi': 'hi',
  'ja': 'ja',
  'zh-hans': 'zh-cn',
};

export interface CalendarProps<T> extends CalendarContainerProps<T> {
  theme?: ThemeInterface;
  locale?: string;
  t: (key: string) => string;
  isLightMode?: boolean;
  spotlightItems?: SpotlightItems[];
}

function _Calendar<T>(
  {
    theme = lightTheme,
    locale = 'ru',
    t,
    isLightMode = true,
    spotlightItems = [],
    ...props
  }: CalendarProps<T>,
  ref?: React.Ref<CalendarRef> | null
) {
  const dayjsLocale = dayjsLocales[locale] || 'en';

  dayjs.locale(dayjsLocale);

  const globalLocaleData = dayjs.localeData();
  const firstDayOfWeek = globalLocaleData.firstDayOfWeek() as WeekNum;

  return (
    <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      <CalendarContextProvider value={{ t: t, isLightMode, spotlightItems }}>
        <ThemeContext.Provider value={theme}>
          <CalendarContainer
            ref={ref}
            {...props}
            locale={dayjsLocale}
            weekStartsOn={firstDayOfWeek}
          />
        </ThemeContext.Provider>
      </CalendarContextProvider>
    </ThemeProvider>
  );
}

export const Calendar = forwardRef(_Calendar);
