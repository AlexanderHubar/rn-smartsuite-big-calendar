import React, { useContext, useState } from 'react';
import type { SpotlightItems } from 'rn-smartsuite-big-calendar';
import { useTheme } from 'styled-components';
import { CalendarContext } from '../components/Calendar/CalendarContext';

export function useSpotlight() {
  const { spotlightItems } = useContext(CalendarContext);
  const theme = useTheme();

  const [spotlight, setSpotlight] = useState<SpotlightItems[]>([]);

  const getSpotlight = (id: string) =>
    spotlight.find((item) => item.value.includes(id));

  const hasSpotlight = Boolean(spotlightItems.length);

  const color = (id: string, eventColor?: string) => {
    const item = getSpotlight(id);
    const spotlightColor = item ? item.color : theme.spotlightInactive;
    const eColor = eventColor ?? theme.spotlightInactive;

    return hasSpotlight ? spotlightColor : eColor;
  };

  const font = (id: string, fontColor?: string) => {
    const item = getSpotlight(id);
    const defaultColor = fontColor ?? theme.spotlightInactiveFont;
    const spotlightColor = item ? defaultColor : theme.spotlightInactiveFont;

    return hasSpotlight ? spotlightColor : defaultColor;
  };

  React.useEffect(() => setSpotlight(spotlightItems), [spotlightItems]);

  return {
    hasSpotlight,
    spotlight,
    color,
    font,
  };
}
