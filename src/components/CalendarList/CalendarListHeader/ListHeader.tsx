import React from 'react';

import { HeaderContainer, PlusButton, DateTitle, DayTitle } from './styled';

import Plus from '../../../ui/assets/svg/plus.svg';
import dayjs from 'dayjs';
import type { ListHeaderProps } from './types';

const iconSize = { height: 14, width: 14 };

const ListHeader: React.FC<ListHeaderProps> = ({ date, color, onAddEvent }) => {
  const day = dayjs(date).format('dddd');
  const month = dayjs(date).format('MMM DD, YYYY');

  return (
    <HeaderContainer>
      <DateTitle>
        <DayTitle>{day}</DayTitle>, <DateTitle>{month}</DateTitle>
      </DateTitle>
      <PlusButton onPress={() => onAddEvent(new Date(date))}>
        <Plus width={iconSize.width} height={iconSize.height} fill={color} />
      </PlusButton>
    </HeaderContainer>
  );
};

export { ListHeader };
