import React from 'react';
import { Dimensions, SafeAreaView, StatusBar } from 'react-native';

import { Calendar } from 'rn-smartsuite-big-calendar';

const events = [
  {
    start: new Date(2021, 11, 25, 0, 0),
    end: new Date(2021, 11, 27, 0, 0),
    color: '#ec911b',
    fieldLabel: 'Date',
    fieldType: 'datefield',
    fromDate: {
      date: new Date(2021, 11, 22, 13, 0),
      include_time: false,
    },
    is_overdue: null,
    recordId: '61a4be445622b50278992a14',
    title: 'Ev',
    slug: 's4f9aed784',
    toDate: null,
  },
  {
    start: new Date(2021, 11, 23, 0, 0),
    end: new Date(2021, 11, 24, 0, 0),
    color: '#80ec1b',
    fieldLabel: 'Date',
    fieldType: 'datefield',
    fromDate: {
      date: new Date(2021, 11, 22, 13, 0),
      include_time: false,
    },
    is_overdue: null,
    recordId: '61a4be445622b50278992a149',
    title: 'Eve',
    slug: 's4f9aed784',
    toDate: null,
  },
  {
    start: new Date(2021, 11, 21, 0, 0),
    end: new Date(2021, 11, 22, 0, 0),
    color: '#80ec1b',
    fieldLabel: 'Date',
    fieldType: 'datefield',
    fromDate: {
      date: new Date(2021, 11, 22, 13, 0),
      include_time: false,
    },
    is_overdue: null,
    recordId: '61a4be445622b50278992a149v',
    title: 'Eve',
    slug: 's4f9aed784',
    toDate: null,
  },
  {
    start: new Date(2021, 11, 19, 0, 0),
    end: new Date(2021, 11, 21, 0, 0),
    color: '#80ec1b',
    fieldLabel: 'Date',
    fieldType: 'datefield',
    fromDate: {
      date: new Date(2021, 11, 22, 13, 0),
      include_time: false,
    },
    is_overdue: null,
    recordId: '61a4be445622b50278992a14d',
    title: 'Eve',
    slug: 's4f9aed784',
    toDate: null,
  },
  {
    start: new Date(2021, 11, 25, 0, 0),
    end: new Date(2021, 11, 25, 0, 0),
    color: '#0C41F3',
    fieldLabel: 'Date Range',
    fieldType: 'daterangefield',
    fromDate: {
      date: new Date(2021, 11, 22, 0, 0),
      include_time: false,
    },
    is_overdue: null,
    recordId: '61a4be445622b50278992a15',
    title: 'Event 1',
    slug: 's7580ffd43',
    toDate: {
      date: new Date(2021, 11, 22, 13, 0),
      include_time: false,
    },
  },
  {
    start: new Date(2021, 11, 25, 0, 0),
    end: new Date(2021, 11, 26, 0, 0),
    color: '#673DB6',
    fieldLabel: 'Due Date',
    fieldType: 'duedatefield',
    fromDate: {
      date: null,
      include_time: false,
    },
    is_overdue: false,
    recordId: '61a4be445622b50278992a13',
    title: 'Event 1',
    slug: 'due_date',
    toDate: {
      date: new Date(2021, 11, 22, 1, 0),
      include_time: true,
    },
  },
  {
    start: new Date(2021, 11, 22, 0, 0),
    end: new Date(2021, 11, 24, 0, 0),
    color: '#2D2D2D',
    fieldLabel: 'First Created',
    fieldType: 'datefield',
    fromDate: {
      date: new Date(2021, 11, 22, 14, 0),
      include_time: true,
    },
    is_overdue: null,
    recordId: '61a4be445622b50278992a12',
    title: 'Event 1',
    slug: 'first_created',
    toDate: null,
  },
  {
    start: new Date(2021, 11, 22, 15, 0),
    end: new Date(2021, 11, 22, 17, 0),
    color: '#CD286A',
    fieldLabel: 'Last Updated',
    fieldType: 'datefield',
    fromDate: {
      date: new Date(2021, 11, 22, 15, 0),
      include_time: true,
    },
    is_overdue: null,
    recordId: '61a4be445622b50278992a11',
    title: 'Event 1',
    slug: 'last_updated',
    toDate: null,
  },
];

export const App = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor: '#FAFAFA' }}>
        <Calendar
          height={Dimensions.get('window').height}
          events={events}
          mode={'3days'}
        />
      </SafeAreaView>
    </React.Fragment>
  );
};
