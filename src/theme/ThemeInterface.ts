// We don't use Material UI, but this theme structure is inspired by the theme.
//
// https://material-ui.com/customization/default-theme/#default-theme
import type { TextStyle } from 'react-native';

import type { DeepPartial } from '../utility-types';

export interface Palette {
  main: string;
  contrastText: string;
}

export type Typography = Pick<
  TextStyle,
  'fontFamily' | 'fontWeight' | 'fontSize' | 'lineHeight' | 'letterSpacing'
>;

export interface ThemeInterface {
  background: string;
  onPrimary: string;
  onSurface: string;
  dateRangeHeader: {
    background: string;
    color: string;
  };
  monthCalendar: {
    textDisabledColor: string;
    calendarBackground: string;
    dayTextColor: string;
    textSectionTitleColor: string;
    borderColor: string;
    dotColor: string;
    selectedDotColor: string;
  };
  palette: {
    primary: Palette;
    nowIndicator: string;
    gray: {
      100: string;
      200: string;
      300: string;
      500: string;
      800: string;
    };
  };
  isRTL: boolean;
  typography: {
    color: {
      primary: string;
      onSurface: string;
    };
    fontFamily?: string;
    xs: Typography;
    sm: Typography;
    m: Typography;
    l: Typography;
  };
  eventCellOverlappings: readonly Palette[];
  spotlightInactive: string;
}

export type PartialTheme = DeepPartial<ThemeInterface>;
