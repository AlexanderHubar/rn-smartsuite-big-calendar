import styled from 'styled-components/native';

export const DayLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.sm.fontSize}px;
  text-align: center;
  margin-bottom: 2px;
  color: ${({ theme }) => theme.typography.color.onSurface};
  text-transform: capitalize;
`;

export const ActiveDateCircle = styled.View<{
  shouldHighlight: boolean;
  color: string;
}>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  margin-bottom: 4px;
  justify-content: center;
  align-items: center;
  background: ${({ shouldHighlight, color }) =>
    shouldHighlight ? color : 'transparent'};
`;

export const CircleLabel = styled.Text<{ shouldHighlight: boolean }>`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.sm.fontSize}px;
  color: ${({ shouldHighlight, theme }) =>
    shouldHighlight ? 'white' : theme.typography.color.primary};
`;

export const AllDayEventCell = styled.TouchableOpacity<{ isFirstDay: boolean }>`
  background-color: ${({ theme }) => theme.onSurface};
  border-top-left-radius: ${({ isFirstDay }) => (isFirstDay ? 4 : 0)}px;
  border-bottom-left-radius: ${({ isFirstDay }) => (isFirstDay ? 4 : 0)}px;
  border-width: 1px;
  flex-grow: 1;
  border-right-width: 0;
  border-color: ${({ theme }) => theme.onPrimary};
  min-height: 32px;
  margin-bottom: 8px;
  padding-top: 2px;
`;

export const AllDayEventPill = styled.TouchableOpacity<{
  backgroundColor?: string;
}>`
  overflow: hidden;
  padding: 5px 8px;
  height: 24px;
  margin-bottom: 2px;
  border-radius: 4px;
  background-color: ${({ backgroundColor }) => backgroundColor || 'red'};
  align-items: center;
  flex-direction: row;
`;

export const AllDayEventLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.sm.fontSize}px;
  color: white;
  font-weight: 400;
`;

export const AllDayEventBoldLabel = styled(AllDayEventLabel)`
  font-weight: 500;
  line-height: 14px;
`;

export const WeekTimeLine = styled.View`
  top: 53.4px;
  border-radius: 4px;
  flex: 1;
  right: 1px;
  left: 1px;
  background-color: transparent;
  position: absolute;
`;

export const CalendarHeaderWrapper = styled.View`
  padding-top: 8px;
  background: ${({ theme }) => theme.background};
  flex-direction: ${({ theme }) => (theme.isRTL ? 'row-reverse' : 'row')};
`;
