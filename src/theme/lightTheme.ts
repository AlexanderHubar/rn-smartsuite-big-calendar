import type { ThemeInterface } from './ThemeInterface';

export const lightTheme: ThemeInterface = {
  isRTL: false,
  palette: {
    primary: {
      main: 'rgb(66, 133, 244)',
      contrastText: '#fff',
    },
    nowIndicator: 'red',
    gray: {
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      500: '#878B92',
      800: '#2E3538',
    },
  },
  onPrimary: '#E9E9E9',
  onSurface: '#FFFFFF',
  background: '#FAFAFA',
  spotlightInactive: '#DEDEDE',
  eventCellOverlappings: [
    { main: '#E26245', contrastText: '#fff' },
    { main: '#4AC001', contrastText: '#fff' },
    { main: '#5934C7', contrastText: '#fff' },
  ],
  dateRangeHeader: {
    background: '#F2F2F2',
    color: '#878B92',
  },
  monthCalendar: {
    dayTextColor: '#2E3538',
    textDisabledColor: '#a5a5a5',
    calendarBackground: '#FFFFFF',
    borderColor: '#E9E9E9',
    dotColor: '#2E3538',
    selectedDotColor: '#ffffff',
    textSectionTitleColor: '#878B92',
  },
  typography: {
    color: {
      primary: '#2E3538',
      onSurface: '#878B92',
    },
    xs: {
      fontSize: 10,
    },
    sm: {
      fontSize: 12,
    },
    m: {
      fontSize: 14,
    },
    l: {
      fontSize: 16,
    },
  },
};
