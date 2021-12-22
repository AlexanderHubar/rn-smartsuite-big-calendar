import type dayjs from 'dayjs';
import * as React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { u } from '../commonStyles';
import { useTheme } from '../theme/ThemeContext';
import { isPair } from '../utils';

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
  const theme = useTheme();

  const evenCellBg = theme.palette.evenCellBg;
  const oddCellBg = theme.palette.oddCellBg;

  const borderRadius = dateIndex === 0 ? 4 : 0;

  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(date.hour(hour).minute(0))}
    >
      <View
        style={[
          u['border-l'],
          u['border-b'],
          { borderColor: theme.palette.gray['200'] },
          { height: cellHeight },
          { backgroundColor: isPair(index) ? evenCellBg : oddCellBg },
          index === 0 && {
            borderTopWidth: 1,
            borderTopLeftRadius: borderRadius,
          },
          index === 23 && {
            borderBottomLeftRadius: borderRadius,
          },
        ]}
      />
    </TouchableWithoutFeedback>
  );
};
