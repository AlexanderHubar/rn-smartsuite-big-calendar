import styled from 'styled-components/native';

export const DueDateContainer = styled.View`
  flex-direction: row;
`;

export const OverdueDaysContainer = styled.View<{ isOverdue?: boolean }>`
  min-width: 20px;
  min-height: 20px;
  justify-content: center;
  border-radius: 50px;
  background-color: ${({ isOverdue }) => (isOverdue ? '#FF5757' : '#FFB938')};
`;

export const OverdueDaysText = styled.Text`
  font-weight: 700;
  font-size: 14px;
  color: white;
  padding: 0 4px;
  line-height: 16px;
`;
