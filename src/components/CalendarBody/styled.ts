import styled from 'styled-components/native';

export const NowIndicatorTriangle = styled.View`
  width: 0;
  height: 0;
  background-color: transparent;
  border-style: solid;
  border-right-width: 8px;
  border-top-width: 8px;
  elevation: 10000;
  border-right-color: transparent;
  border-top-color: #ff5757;
`;

export const NowIndicator = styled.View<{ top: number }>`
  position: absolute;
  z-index: 10000;
  elevation: 10000;
  height: 1px;
  width: 100%;
  background-color: #ff5757;
  top: ${({ top }) => top}%;
`;
