import styled from 'styled-components/native';

export const ItemContainer = styled.TouchableOpacity`
  min-height: 52px;
  background-color: white;
  border-radius: 4px;
  border-width: 1px;
  border-color: #e9e9e9;
  flex-direction: row;
  margin-bottom: 8px;
`;

export const DetailsContainer = styled.View`
  width: 100%;
  justify-content: space-between;
`;

export const ItemColor = styled.View<{ color: string }>`
  height: 100%;
  width: 6px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  background-color: ${({ color }) => color};
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  margin-left: 8px;
  margin-right: 16px;
  margin-top: 4px;
`;

export const TimeContainer = styled.View`
  flex-direction: row;
  margin: 4px 8px;
  align-items: center;
`;

export const FieldTitle = styled.Text``;

export const EventTitle = styled.Text`
  font-weight: 500;
`;

export const PeriodText = styled.Text``;
