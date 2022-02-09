import React from 'react';
import { HourGuideCell } from '../HourGuideCell';

const Hours: React.FC<{
  hours: number[];
  cellHeight: number;
  dateIndex: number;
}> = ({ hours, cellHeight, dateIndex }) => {
  return (
    <>
      {hours.map((hour, index) => {
        return (
          <HourGuideCell
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
