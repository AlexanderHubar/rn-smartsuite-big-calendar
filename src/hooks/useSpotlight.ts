import React, { useContext, useState } from 'react';
import type {
  ICalendarEvent,
  SpotlightItems,
} from 'rn-smartsuite-big-calendar';
import { SpotlightType } from 'rn-smartsuite-big-calendar';
import { useTheme } from 'styled-components';
import { CalendarContext } from '../components/Calendar/CalendarContext';
import { fontColor } from '../theme/color-helper';

export function useSpotlight() {
  const { spotlightItems } = useContext(CalendarContext);
  const theme = useTheme();

  const [spotlight, setSpotlight] = useState<SpotlightItems[]>([]);

  const getSpotlight = (id: string, slug: string) =>
    spotlight.find((_item) =>
      _item.value.includes(_item.type === SpotlightType.record ? id : slug)
    );

  const hasSpotlight = Boolean(spotlightItems.length);

  const color = (event?: ICalendarEvent) => {
    if (!event) {
      return theme.spotlightInactive;
    }
    const item = getSpotlight(event.recordId, event.slug);
    const spotlightColor = item ? item.color : theme.spotlightInactive;

    return hasSpotlight ? spotlightColor : event.color.background;
  };

  const font = (event?: ICalendarEvent) => {
    if (!event) {
      return theme.spotlightInactiveFont;
    }
    const item = getSpotlight(event.recordId, event.slug);
    const spotlightColor = item ? item.color : theme.spotlightInactive;

    return fontColor(hasSpotlight ? spotlightColor : event.color.background);
  };

  React.useEffect(
    () =>
      setSpotlight(
        spotlightItems.sort((a: SpotlightItems, b: SpotlightItems) =>
          b.type > a.type ? 1 : a.type > b.type ? -1 : 0
        )
      ),
    [spotlightItems]
  );

  return {
    hasSpotlight,
    spotlight,
    color,
    font,
  };
}
