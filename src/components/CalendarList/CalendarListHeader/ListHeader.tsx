import React from 'react';

import { HeaderContainer, PlusButton, DateTitle, DayTitle } from './styled';

import Plus from '../../../ui/assets/svg/plus.svg';
import dayjs from 'dayjs';

const iconSize = { height: 14, width: 14 };

const ListHeader: React.FC<{ date: string }> = ({ date }) => {
  const day = dayjs(date).format('dddd');
  const month = dayjs(date).format('MMM DD, YYYY');

  return (
    <HeaderContainer>
      <DateTitle>
        <DayTitle>{day}</DayTitle>, <DateTitle>{month}</DateTitle>
      </DateTitle>
      <PlusButton>
        <Plus
          width={iconSize.width}
          height={iconSize.height}
          fill={'#12CCCC'}
        />
      </PlusButton>
    </HeaderContainer>
  );
};

export { ListHeader };
