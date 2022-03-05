import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text<{ color: string }>`
  font-size: ${({ theme }) => theme.typography.sm.fontSize}px;
  color: ${({ color }) => color};
`;

export const Time = styled.Text<{ color: string }>`
  font-size: ${({ theme }) => theme.typography.sm.fontSize}px;
  color: ${({ color }) => color};
  font-weight: bold;
`;

export const EventTitle = styled.Text<{ color: string }>`
  font-size: ${({ theme }) => theme.typography.sm.fontSize}px;
  color: ${({ color }) => color};
  font-weight: bold;
`;
