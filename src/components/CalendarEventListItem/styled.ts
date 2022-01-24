import styled from 'styled-components/native';
import { Animated } from 'react-native';

const theme = {
  light: {
    background: '#FFFFFF',
    color: '#2E3538',
    periodColor: '#2E3538',
    borderColor: '#E9E9E9',
  },
  dark: {
    background: '#38393B',
    color: '#FFFFFF',
    periodColor: '#FFFFFF',
    borderColor: 'transparent',
  },
};

export const ItemContainer = styled.TouchableOpacity<{ isLightMode: boolean }>`
  min-height: 52px;
  background: ${({ isLightMode }) =>
    isLightMode ? theme.light.background : theme.dark.background};
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ isLightMode }) =>
    isLightMode ? theme.light.borderColor : theme.dark.borderColor};
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

export const FieldTitle = styled.Text<{ isLightMode: boolean }>`
  color: ${({ isLightMode }) =>
    isLightMode ? theme.light.color : theme.dark.color};
`;

export const EventTitle = styled.Text<{ isLightMode: boolean }>`
  font-weight: 500;
  color: ${({ isLightMode }) =>
    isLightMode ? theme.light.color : theme.dark.color};
`;

export const PeriodText = styled.Text<{ isLightMode: boolean }>`
  color: ${({ isLightMode }) =>
    isLightMode ? theme.light.periodColor : theme.dark.periodColor};
`;

export const HighLightBox = styled(Animated.View)<{ color?: string }>`
  background-color: ${({ color }) => (color ? color : 'transparent')};
  border-radius: 4px;
  flex-direction: row;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;
