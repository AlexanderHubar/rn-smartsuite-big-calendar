import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin: auto;
`;

export const Message = styled.Text`
  font-size: ${({ theme }) => theme.typography.l.fontSize}px;
  color: ${({ theme }) => theme.typography.color.onSurface};
`;
