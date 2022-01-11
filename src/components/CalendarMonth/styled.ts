import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  height: 100%;
`;

export const CalendarContainer = styled.View``;

export const styles = StyleSheet.create({
  events: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },

  calendar: {
    borderBottomWidth: 1,
    borderColor: '#E9E9E9',
    paddingBottom: 8,
  },
});
