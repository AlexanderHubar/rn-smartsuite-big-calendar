import React from 'react';

import type { HighlightWrapperProps } from './types';

import { FindContainer, Find } from './styled';
import { useFind } from '../../hooks/useFind';

const HighlightWrapper: React.FC<HighlightWrapperProps> = ({
  children,
  event,
  slug,
}) => {
  const { color } = useFind(event);

  return (
    <FindContainer>
      <Find color={color(slug)} />
      {children}
    </FindContainer>
  );
};

export { HighlightWrapper };
