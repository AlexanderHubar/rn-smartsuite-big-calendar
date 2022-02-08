import type { ThemeInterface } from './ThemeInterface';

export const darkTheme: ThemeInterface = {
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
  onPrimary: '#494A4D',
  onSurface: '#38393B',
  background: '#202123',
  spotlightInactive: '#4E5055',
  spotlightInactiveFont: '#FFFFFF',
  eventBoxBorder: '#38393B',
  eventCellOverlappings: [
    { main: '#E26245', contrastText: '#fff' },
    { main: '#4AC001', contrastText: '#fff' },
    { main: '#5934C7', contrastText: '#fff' },
  ],
  dateRangeHeader: {
    background: '#3F4042',
    color: '#9096A0',
  },
  monthCalendar: {
    textDisabledColor: 'rgba(255, 255, 255, 0.4)',
    calendarBackground: '#38393B',
    dayTextColor: '#FFFFFF',
    textSectionTitleColor: '#9096A0',
    borderColor: '#494A4D',
    dotColor: '#ffffff',
    selectedDotColor: '#ffffff',
  },
  typography: {
    color: {
      primary: '#FFFFFF',
      onSurface: '#9096A0',
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
