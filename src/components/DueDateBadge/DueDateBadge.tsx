import React from 'react';

import {
  DueDateContainer,
  OverdueDaysContainer,
  OverdueDaysText,
} from './styled';
import type { DueDateBadgeProps } from './types';

import Checkmark from '../../ui/assets/svg/check.svg';
import CheckmarkRedDot from '../../ui/assets/svg/check_red_dot.svg';
import SadIcon from '../../ui/assets/svg/icon_sad.svg';
import SmileIcon from '../../ui/assets/svg/icon_smile.svg';
import { Spacer } from '../Spacer';
import { Space } from '../Spacer/types';

const iconSize = { width: 20, height: 20 };

const EmotionIcon: React.FC<{ isOverdue: boolean }> = ({ isOverdue }) =>
  isOverdue ? (
    <SadIcon width={iconSize.width} height={iconSize.height} />
  ) : (
    <SmileIcon width={iconSize.width} height={iconSize.height} />
  );

function DueDateBadge({ overdueDays, isComplete }: DueDateBadgeProps) {
  const isOverdue = overdueDays < 0;
  const displayDays = Math.abs(overdueDays);

  if (isComplete) {
    return (
      <DueDateContainer>
        {isOverdue ? (
          <CheckmarkRedDot width={iconSize.width} height={iconSize.height} />
        ) : (
          <Checkmark width={iconSize.width} height={iconSize.height} />
        )}
        <Spacer ml={Space.XS} />
      </DueDateContainer>
    );
  }

  return (
    <DueDateContainer>
      {displayDays <= 60 ? (
        <OverdueDaysContainer isOverdue={isOverdue}>
          <OverdueDaysText>{displayDays}</OverdueDaysText>
        </OverdueDaysContainer>
      ) : (
        <EmotionIcon isOverdue={isOverdue} />
      )}
      <Spacer ml={Space.XS} />
    </DueDateContainer>
  );
}

export { DueDateBadge };
