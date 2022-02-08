import * as React from 'react';

import { HourGuideCellWrapper } from './styled';

interface HourGuideCellProps {
  cellHeight: number;
  index: number;
  dateIndex: number;
}

export const HourGuideCell = ({
  cellHeight,
  index,
  dateIndex,
}: HourGuideCellProps) => {
  const borderRadius = dateIndex === 0 ? 4 : 0;

  return (
    <HourGuideCellWrapper
      borderRadius={borderRadius}
      cellHeight={cellHeight}
      isFirst={index === 0}
      isLast={index === 23}
    />
  );
};
