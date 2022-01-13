import * as React from 'react';
import type { TextStyle } from 'react-native';

import { formatHour } from '../../utils';
import { objHasContent } from '../../utils';
import { useTheme } from 'styled-components';
import { HourGuideColumnLabel, HourGuideColumnWrapper } from './styled';

interface HourGuideColumnProps {
  cellHeight: number;
  hour: number;
  ampm: boolean;
  index: number;
  hourStyle: TextStyle;
}

const _HourGuideColumn = ({
  cellHeight,
  hour,
  ampm,
  hourStyle = {},
}: HourGuideColumnProps) => {
  const theme = useTheme();

  const textStyle = {
    color: theme.typography.color.onSurface,
    fontSize: theme.typography.xs.fontSize,
  };

  return (
    <HourGuideColumnWrapper height={cellHeight}>
      <HourGuideColumnLabel
        style={objHasContent(hourStyle) ? hourStyle : textStyle}
      >
        {formatHour(hour, ampm)}
      </HourGuideColumnLabel>
    </HourGuideColumnWrapper>
  );
};

export const HourGuideColumn = React.memo(_HourGuideColumn, () => true);
