import React, { createContext } from 'react';

export const CalendarContext = createContext({
  t: (key: string) => key,
  isLightMode: true,
});

export function CalendarContextProvider({
  value,
  children,
}: {
  children: React.ReactElement;
  value: any;
}) {
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
