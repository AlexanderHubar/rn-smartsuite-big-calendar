import React from 'react';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import { merge } from 'merge-anything';
import { ThemeProvider } from 'styled-components';

import { lightTheme } from '../../theme/lightTheme';
import { darkTheme } from '../../theme/darkTheme';
import { ThemeContext } from '../../theme/ThemeContext';
import type { ThemeInterface } from '../../theme/ThemeInterface';
import type { DeepPartial } from '../../utility-types';
import { typedMemo } from '../../utils';
import {
  CalendarContainer,
  CalendarContainerProps,
} from '../CalendarContainer';
import type { WeekNum } from 'rn-smartsuite-big-calendar';
import { CalendarContextProvider } from './CalendarContext';

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
  theme?: DeepPartial<ThemeInterface>;
  isRTL?: boolean;
  t: (key: string) => string;
  isLightMode?: boolean;
}

function _Calendar<T>({
  theme = lightTheme,
  locale = 'ru',
  isRTL,
  t,
  isLightMode = true,
  ...props
}: CalendarProps<T>) {
  const _theme = merge(lightTheme, theme, { isRTL }) as ThemeInterface;

  const dayjsLocale = dayjsLocales[locale] || 'en';

  dayjs.locale(dayjsLocale);

  const globalLocaleData = dayjs.localeData();
  const firstDayOfWeek = globalLocaleData.firstDayOfWeek() as WeekNum;

  return (
    <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      <CalendarContextProvider value={{ t: t, isLightMode }}>
        <ThemeContext.Provider value={_theme}>
          <CalendarContainer
            {...props}
            locale={dayjsLocale}
            weekStartsOn={firstDayOfWeek}
          />
        </ThemeContext.Provider>
      </CalendarContextProvider>
    </ThemeProvider>
  );
}

export const Calendar = typedMemo(_Calendar);
