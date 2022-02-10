import * as React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { HourGuideCellWrapper } from './styled';
import type dayjs from 'dayjs';

interface HourGuideCellProps {
  onPress: (d: dayjs.Dayjs) => void;
  date: dayjs.Dayjs;
  hour: number;
  cellHeight: number;
  index: number;
  dateIndex: number;
}

export const HourGuideCell = ({
  cellHeight,
  index,
  onPress,
  hour,
  date,
  dateIndex,
}: HourGuideCellProps) => {
  const borderRadius = dateIndex === 0 ? 4 : 0;

  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(date.hour(hour).minute(0))}
    >
      <HourGuideCellWrapper
        borderRadius={borderRadius}
        cellHeight={cellHeight}
        isFirst={index === 0}
        isLast={index === 23}
      />
    </TouchableWithoutFeedback>
  );
};
