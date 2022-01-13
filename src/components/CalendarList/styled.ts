import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const ListContainer = styled.View`
  height: 100%;
  background: ${({ theme }) => theme.background};
`;

export const styleSheet = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
  },
});
