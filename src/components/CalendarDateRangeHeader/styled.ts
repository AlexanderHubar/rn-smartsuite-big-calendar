import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  width: 100%;
  height: 32px;
  background: #f2f2f2;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
`;

export const TodayButtonContainer = styled.TouchableOpacity``;

export const DateRangeContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ArrowContainer = styled.TouchableOpacity`
  padding: 8px;
`;

export const ViewModeContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const HeaderText = styled.Text`
  color: #878b92;
`;
