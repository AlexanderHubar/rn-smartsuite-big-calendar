import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 20px;
`;

export const PlusButton = styled.TouchableOpacity.attrs({
  hitSlop: {
    bottom: 7,
    left: 7,
    right: 7,
    top: 7,
  },
})``;

export const DayTitle = styled.Text`
  font-weight: 700;
  color: #878b92;
  text-transform: capitalize;
`;

export const DateTitle = styled.Text`
  font-weight: 400;
  color: #878b92;
`;
