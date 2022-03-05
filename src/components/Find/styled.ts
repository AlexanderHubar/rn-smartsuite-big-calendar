import styled from 'styled-components/native';

export const FindContainer = styled.View``;

export const Find = styled.View<{ color: string }>`
  background-color: ${({ color }) => color};
  border-radius: 4px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: -2px -4px;
`;
