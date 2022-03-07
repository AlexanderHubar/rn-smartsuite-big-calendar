import type { ReactNode } from 'react';
import type { ICalendarEvent } from 'rn-smartsuite-big-calendar';

export interface HighlightWrapperProps {
  children: ReactNode;
  slug?: string;
  event?: ICalendarEvent;
}
