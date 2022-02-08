import styled, { css } from 'styled-components/native';

export const HourGuideCellWrapper = styled.View<{
  cellHeight: number;
  borderRadius: number;
  isFirst: boolean;
  isLast: boolean;
}>`
  border-left-width: 1px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.onPrimary};
  background-color: ${({ theme }) => theme.onSurface};
  height: ${({ cellHeight }) => cellHeight}px;
  border-radius: 0;
  ${({ isFirst, borderRadius }) =>
    isFirst &&
    css`
      border-top-width: 1px;
      border-top-left-radius: ${borderRadius}px;
    `}
  ${({ isLast, borderRadius }) =>
    isLast &&
    css`
      border-bottom-left-radius: ${borderRadius}px;
    `}
`;
