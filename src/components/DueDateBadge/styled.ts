import styled from 'styled-components/native';

export const DueDateContainer = styled.View`
  flex-direction: row;
`;

export const OverdueDaysContainer = styled.View<{ isOverdue?: boolean }>`
  width: 18px;
  height: 16px;
  justify-content: center;
  align-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ isOverdue }) => (isOverdue ? '#FF5757' : '#FFB938')};
`;

export const OverdueDaysText = styled.Text`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: white;
`;
