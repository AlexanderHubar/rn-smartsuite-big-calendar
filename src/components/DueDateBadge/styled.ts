import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const DueDateContainer = styled.View`
  flex-direction: row;
`;

export const OverdueDaysContainer = styled.View<{ isOverdue?: boolean }>`
  min-width: 20px;
  padding: 0 4px;
  min-height: 20px;
  justify-content: center;
  border-radius: 50px;
  background-color: ${({ isOverdue }) => (isOverdue ? '#FF5757' : '#FFB938')};
`;

export const OverdueDaysText = styled.Text`
  font-size: ${Platform.OS === 'android' ? 10 : 14}px;
  text-align: center;
  color: white;
`;
