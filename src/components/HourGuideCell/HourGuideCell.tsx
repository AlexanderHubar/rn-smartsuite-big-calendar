import type dayjs from 'dayjs';
import * as React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { HourGuideCellWrapper } from './styled';

interface HourGuideCellProps {
  cellHeight: number;
  onPress: (d: dayjs.Dayjs) => void;
  date: dayjs.Dayjs;
  hour: number;
  index: number;
  dateIndex: number;
}

export const HourGuideCell = ({
  cellHeight,
  onPress,
  date,
  hour,
  index,
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
