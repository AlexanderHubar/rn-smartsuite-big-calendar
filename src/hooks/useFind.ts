import { useContext } from 'react';
import { CalendarContext } from '../components/Calendar/CalendarContext';
import type { ICalendarEvent } from 'rn-smartsuite-big-calendar';
import { textShouldBeDarker } from '../theme/color-helper';

export function useFind(event?: ICalendarEvent) {
  const { findItems } = useContext(CalendarContext);

  const hasFind = (slug?: string) => {
    if (!event) {
      return false;
    }

    const searchId =
      slug === 'title'
        ? 'title' + event?.recordId
        : event?.slug + event?.recordId;

    return (findItems as string[]).includes(searchId);
  };

  const color = (slug?: string) => {
    if (!event) {
      return 'transparent';
    }

    const highlightColor = textShouldBeDarker(event?.color.background)
      ? 'rgba(110,166,255,0.30)'
      : 'rgba(178,201,221,0.60)';

    return hasFind(slug) ? highlightColor : 'transparent';
  };

  return {
    hasFind,
    color,
  };
}
