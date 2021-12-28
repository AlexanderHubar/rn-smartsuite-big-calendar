import React from 'react';
import { typedMemo } from 'rn-smartsuite-big-calendar';

import { Container, Message } from './styled';

function _EmptyEventList() {
  return (
    <Container>
      <Message>{'You do not have any records for this day'}</Message>
    </Container>
  );
}

export const EmptyEventList = typedMemo(_EmptyEventList);
