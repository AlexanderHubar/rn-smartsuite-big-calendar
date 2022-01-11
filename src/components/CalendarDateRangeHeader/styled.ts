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

export const TodayButtonContainer = styled.TouchableOpacity.attrs({
  hitSlop: {
    bottom: 5,
    left: 5,
    right: 5,
    top: 5,
  },
})`
  flex: 0.3;
`;

export const DateRangeContainer = styled.View`
  flex-shrink: 1;

  flex-direction: row;
  align-items: center;
`;

export const ArrowContainer = styled.TouchableOpacity`
  padding: 8px;
`;

export const ViewModeContainer = styled.TouchableOpacity.attrs({
  hitSlop: {
    bottom: 5,
    left: 5,
    right: 5,
    top: 5,
  },
})`
  flex: 0.3;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const HeaderDateContainer = styled.TouchableOpacity``;

export const HeaderText = styled.Text`
  color: #878b92;
  text-transform: capitalize;
`;
