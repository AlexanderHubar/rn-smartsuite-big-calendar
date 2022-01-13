import styled from 'styled-components/native';

export const HourGuideColumnWrapper = styled.View<{ height: number }>`
  height: ${({ height }) => height}px;
`;

export const HourGuideColumnLabel = styled.Text`
  text-align: center;
  margin-top: -2px;
`;
