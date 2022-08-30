import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const DueDateContainer = styled.View`
  flex-direction: row;
`;

export const OverdueDaysContainer = styled.View<{ isOverdue?: boolean }>`
  min-width: 20px;
  min-height: 20px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${({ isOverdue }) => (isOverdue ? '#FF5757' : '#FFB938')};
`;

export const OverdueDaysText = styled.Text`
  font-weight: ${Platform.OS === 'ios' ? 700 : 400};
  font-size: 14px;
  color: white;
  padding: 0 4px;
  line-height: 16px;
`;
