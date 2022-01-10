import React, { useContext } from 'react';
import { typedMemo } from 'rn-smartsuite-big-calendar';
import { CalendarContext } from '../../Calendar/CalendarContext';

import { Container, Message } from './styled';

function _EmptyEventList() {
  const { t } = useContext(CalendarContext);

  return (
    <Container>
      <Message>{t('calendar.library.empty')}</Message>
    </Container>
  );
}

export const EmptyEventList = typedMemo(_EmptyEventList);
