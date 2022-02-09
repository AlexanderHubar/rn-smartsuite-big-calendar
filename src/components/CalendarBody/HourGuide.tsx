import React from 'react';
import { HourGuideCell } from '../HourGuideCell';
import type { Dayjs } from 'dayjs';

const Hours: React.FC<{
  hours: number[];
  cellHeight: number;
  dateIndex: number;
  onPress: (date: Dayjs) => void;
  date: Dayjs;
}> = ({ onPress, hours, cellHeight, dateIndex, date }) => {
  return (
    <>
      {hours.map((hour, index) => {
        return (
          <HourGuideCell
            date={date}
            hour={hour}
            onPress={onPress}
            key={hour}
            cellHeight={cellHeight}
            index={index}
            dateIndex={dateIndex}
          />
        );
      })}
    </>
  );
};

export { Hours };
