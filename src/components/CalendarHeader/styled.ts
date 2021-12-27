import styled from 'styled-components/native';

export const DayLabel = styled.Text`
  font-size: 12px;
  text-align: center;
  margin-bottom: 2px;
  color: #878b92;
`;

export const ActiveDateCircle = styled.View<{ shouldHighlight: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  margin-bottom: 4px;
  justify-content: center;
  align-items: center;
  background: ${({ shouldHighlight }) =>
    shouldHighlight ? 'rgb(66, 133, 244)' : 'transparent'};
`;

export const CircleLabel = styled.Text<{ shouldHighlight: boolean }>`
  text-align: center;
  font-size: 12px;
  color: ${({ shouldHighlight }) => (shouldHighlight ? 'white' : '#2E3538')};
`;

export const AllDayEventCell = styled.View<{ isFirstDay: boolean }>`
  background-color: white;
  border-top-left-radius: ${({ isFirstDay }) => (isFirstDay ? 4 : 0)}px;
  border-bottom-left-radius: ${({ isFirstDay }) => (isFirstDay ? 4 : 0)}px;
  border-width: 1px;
  flex-grow: 1;
  border-right-width: 0;
  border-color: #eeeeee;
  min-height: 32px;
  margin-bottom: 8px;
  padding-top: 2px;
`;

export const AllDayEventPill = styled.View<{ backgroundColor: string }>`
  padding: 5px 8px;
  height: 24px;
  margin-bottom: 2px;
  border-radius: 4px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: center;
`;

export const AllDayEventLabel = styled.Text`
  font-size: 12px;
  color: white;
`;
