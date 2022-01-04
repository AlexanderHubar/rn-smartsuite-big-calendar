import React from 'react';
import { Dimensions, SafeAreaView, StatusBar } from 'react-native';

import { Calendar } from 'rn-smartsuite-big-calendar';

const events = [
  {
    color: '#B3EFFE',
    dueDateStatus: { isComplete: false, statusResult: [Object] },
    fieldLabel: 'Due Date',
    fieldType: 'duedatefield',
    fromDate: { date: '2021-12-29T22:00:00.000Z', include_time: false },
    recordId: '61add71f447922d060265f12',
    recordTitle: 'Kyiv',
    slug: 'due_date',
    toDate: { date: '2021-12-29T23:00:00Z', include_time: true },
  },
  {
    color: '#B3EFFE',
    dueDateStatus: { isComplete: true, statusResult: [Object] },
    fieldLabel: 'Due Date',
    fieldType: 'duedatefield',
    fromDate: { date: '2021-12-05T23:00:00.000Z', include_time: false },
    recordId: '61add7511665e135f54f33a3',
    recordTitle: 'Cherkasy',
    slug: 'due_date',
    toDate: { date: '2021-12-06T00:00:00Z', include_time: false },
  },
  {
    color: '#B3EFFE',
    dueDateStatus: { isComplete: false, statusResult: [Object] },
    fieldLabel: 'Due Date',
    fieldType: 'duedatefield',
    fromDate: { date: '2021-12-28T23:00:00.000Z', include_time: false },
    recordId: '61cae86887dd0daa2cdb05e0',
    recordTitle: 'Due Date',
    slug: 'due_date',
    toDate: { date: '2021-12-29T00:00:00Z', include_time: false },
  },
  {
    color: '#B3EFFE',
    dueDateStatus: { isComplete: false, statusResult: [Object] },
    fieldLabel: 'Due Date',
    fieldType: 'duedatefield',
    fromDate: { date: '2022-01-04T00:00:00Z', include_time: false },
    recordId: '61d2cf352d72e8aa3829a63f',
    recordTitle: 'due date with time',
    slug: 'due_date',
    toDate: { date: '2022-01-03T22:45:00Z', include_time: true },
  },
  {
    color: '#B7E3FB',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Date',
    fieldType: 'datefield',
    fromDate: { date: '2021-12-20T22:00:00Z', include_time: true },
    recordId: '61add71f447922d060265f12',
    recordTitle: 'Kyiv',
    slug: 's915b51739',
    toDate: { date: '2021-12-20T23:00:00.000Z', include_time: true },
  },
  {
    color: '#B7E3FB',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Date',
    fieldType: 'datefield',
    fromDate: { date: '2021-12-21T02:30:00.467Z', include_time: true },
    recordId: '61c32d96fcad1b0521bc4fc7',
    recordTitle: '111',
    slug: 's915b51739',
    toDate: { date: '2021-12-21T03:30:00.467Z', include_time: true },
  },
  {
    color: '#B7E3FB',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Date',
    fieldType: 'datefield',
    fromDate: { date: '2022-01-03T05:00:00Z', include_time: true },
    recordId: '61d2caaf107a3c40fa1fb044',
    recordTitle: 'test',
    slug: 's915b51739',
    toDate: { date: '2022-01-03T06:00:00.000Z', include_time: true },
  },
  {
    color: '#B7E3FB',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Date',
    fieldType: 'datefield',
    fromDate: { date: new Date(2022, 0, 4), include_time: false },
    recordId: '61d2cb1b772a16c081b48d2da',
    recordTitle: 'date without time',
    slug: 's915b51739',
    toDate: { date: new Date(2022, 0, 4), include_time: false },
  },
  {
    color: '#CDEECE',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Date Range',
    fieldType: 'daterangefield',
    fromDate: { date: '2021-12-23T00:00:00Z', include_time: false },
    recordId: '61add71f447922d060265f12',
    recordTitle: 'Kyiv',
    slug: 's42bce8347',
    toDate: { date: '2021-12-22T22:30:00Z', include_time: true },
  },
  {
    color: '#CDEECE',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Date Range',
    fieldType: 'daterangefield',
    fromDate: { date: '2021-12-19T00:00:00Z', include_time: false },
    recordId: '61add7511665e135f54f33a3',
    recordTitle: 'Cherkasy',
    slug: 's42bce8347',
    toDate: { date: '2021-12-23T00:00:00Z', include_time: false },
  },
  {
    color: '#CDEECE',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Date Range',
    fieldType: 'daterangefield',
    fromDate: { date: '2021-12-25T00:00:00Z', include_time: false },
    recordId: '61c492627aa151cd7b4b8938',
    recordTitle: '1111',
    slug: 's42bce8347',
    toDate: { date: '2021-12-25T00:00:00Z', include_time: false },
  },
  {
    color: '#CDEECE',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Date Range',
    fieldType: 'daterangefield',
    fromDate: { date: '2021-12-27T06:55:03Z', include_time: true },
    recordId: '61c4928c3a242b288499df37',
    recordTitle: '12',
    slug: 's42bce8347',
    toDate: { date: '2021-12-27T09:54:51.103Z', include_time: true },
  },
  {
    color: '#CDEECE',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Date Range',
    fieldType: 'daterangefield',
    fromDate: { date: '2021-12-19T00:00:00Z', include_time: false },
    recordId: '61c492a9996422c82bb50d49',
    recordTitle: 'ddd',
    slug: 's42bce8347',
    toDate: { date: '2021-12-21T00:00:00Z', include_time: false },
  },
  {
    color: '#CDEECE',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Date Range',
    fieldType: 'daterangefield',
    fromDate: { date: '2021-12-24T00:00:00Z', include_time: false },
    recordId: '61c49361b56e4d4dc40dd615',
    recordTitle: '123123',
    slug: 's42bce8347',
    toDate: { date: '2021-12-24T00:00:00Z', include_time: false },
  },
  {
    color: '#CDEECE',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Date Range',
    fieldType: 'daterangefield',
    fromDate: { date: '2022-01-02T22:30:00Z', include_time: true },
    recordId: '61d2cb9d1c63c842945ae7d9',
    recordTitle: 'date range with time',
    slug: 's42bce8347',
    toDate: { date: '2022-01-02T23:30:00Z', include_time: true },
  },
  {
    color: '#FEBDC7',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'First Created',
    fieldType: 'firstcreatedfield',
    fromDate: { date: '2021-12-06T09:25:51.852Z', include_time: true },
    recordId: '61add71f447922d060265f12',
    recordTitle: 'Kyiv',
    slug: 'first_created',
    toDate: { date: '2021-12-06T10:25:51.852Z', include_time: true },
  },
  {
    color: '#FEBDC7',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'First Created',
    fieldType: 'firstcreatedfield',
    fromDate: { date: '2021-12-06T09:26:41.303Z', include_time: true },
    recordId: '61add7511665e135f54f33a3',
    recordTitle: 'Cherkasy',
    slug: 'first_created',
    toDate: { date: '2021-12-06T10:26:41.303Z', include_time: true },
  },
  {
    color: '#FEBDC7',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'First Created',
    fieldType: 'firstcreatedfield',
    fromDate: { date: '2021-12-22T13:52:22.126Z', include_time: true },
    recordId: '61c32d96fcad1b0521bc4fc7',
    recordTitle: '111',
    slug: 'first_created',
    toDate: { date: '2021-12-22T14:52:22.126Z', include_time: true },
  },
  {
    color: '#FEBDC7',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'First Created',
    fieldType: 'firstcreatedfield',
    fromDate: { date: '2021-12-23T15:14:42.960Z', include_time: true },
    recordId: '61c492627aa151cd7b4b8938',
    recordTitle: '1111',
    slug: 'first_created',
    toDate: { date: '2021-12-23T16:14:42.960Z', include_time: true },
  },
  {
    color: '#FEBDC7',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'First Created',
    fieldType: 'firstcreatedfield',
    fromDate: { date: '2021-12-23T15:15:24.948Z', include_time: true },
    recordId: '61c4928c3a242b288499df37',
    recordTitle: '12',
    slug: 'first_created',
    toDate: { date: '2021-12-23T16:15:24.948Z', include_time: true },
  },
  {
    color: '#FEBDC7',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'First Created',
    fieldType: 'firstcreatedfield',
    fromDate: { date: '2021-12-23T15:15:53.693Z', include_time: true },
    recordId: '61c492a9996422c82bb50d49',
    recordTitle: 'ddd',
    slug: 'first_created',
    toDate: { date: '2021-12-23T16:15:53.693Z', include_time: true },
  },
  {
    color: '#FEBDC7',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'First Created',
    fieldType: 'firstcreatedfield',
    fromDate: { date: '2021-12-23T15:18:57.211Z', include_time: true },
    recordId: '61c49361b56e4d4dc40dd615',
    recordTitle: '123123',
    slug: 'first_created',
    toDate: { date: '2021-12-23T16:18:57.211Z', include_time: true },
  },
  {
    color: '#FEBDC7',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'First Created',
    fieldType: 'firstcreatedfield',
    fromDate: { date: '2021-12-28T10:35:20.712Z', include_time: true },
    recordId: '61cae86887dd0daa2cdb05e0',
    recordTitle: 'Due Date',
    slug: 'first_created',
    toDate: { date: '2021-12-28T11:35:20.712Z', include_time: true },
  },
  {
    color: '#FEBDC7',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'First Created',
    fieldType: 'firstcreatedfield',
    fromDate: { date: new Date(2022, 0, 3, 10, 6), include_time: true },
    recordId: '61d2caaf107a3c40fa1fb044',
    recordTitle: 'test',
    slug: 'first_created',
    toDate: { date: new Date(2022, 0, 3, 11, 6), include_time: true },
  },
  {
    color: '#FEBDC7',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'First Created',
    fieldType: 'firstcreatedfield',
    fromDate: { date: new Date(2022, 0, 3), include_time: false },
    recordId: '61d2cb1b772a16c081b48d2d',
    recordTitle: 'date without time',
    slug: 'first_created',
    toDate: { date: new Date(2022, 0, 3), include_time: false },
  },
  {
    color: '#FEBDC7',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'First Created',
    fieldType: 'firstcreatedfield',
    fromDate: { date: '2022-01-03T10:10:37.151Z', include_time: true },
    recordId: '61d2cb9d1c63c842945ae7d9',
    recordTitle: 'date range with time',
    slug: 'first_created',
    toDate: { date: '2022-01-03T11:10:37.151Z', include_time: true },
  },
  {
    color: '#FEBDC7',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'First Created',
    fieldType: 'firstcreatedfield',
    fromDate: { date: '2022-01-03T10:25:57.924Z', include_time: true },
    recordId: '61d2cf352d72e8aa3829a63f',
    recordTitle: 'due date with time',
    slug: 'first_created',
    toDate: { date: '2022-01-03T11:25:57.924Z', include_time: true },
  },
  {
    color: '#FFD5B3',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Last Updated',
    fieldType: 'lastupdatedfield',
    fromDate: { date: '2021-12-22T13:07:12.425Z', include_time: true },
    recordId: '61add71f447922d060265f12',
    recordTitle: 'Kyiv',
    slug: 'last_updated',
    toDate: { date: '2021-12-22T14:07:12.425Z', include_time: true },
  },
  {
    color: '#FFD5B3',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Last Updated',
    fieldType: 'lastupdatedfield',
    fromDate: { date: '2021-12-23T15:17:18.695Z', include_time: true },
    recordId: '61add7511665e135f54f33a3',
    recordTitle: 'Cherkasy',
    slug: 'last_updated',
    toDate: { date: '2021-12-23T16:17:18.695Z', include_time: true },
  },
  {
    color: '#FFD5B3',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Last Updated',
    fieldType: 'lastupdatedfield',
    fromDate: { date: '2021-12-22T13:53:30.813Z', include_time: true },
    recordId: '61c32d96fcad1b0521bc4fc7',
    recordTitle: '111',
    slug: 'last_updated',
    toDate: { date: '2021-12-22T14:53:30.813Z', include_time: true },
  },
  {
    color: '#FFD5B3',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Last Updated',
    fieldType: 'lastupdatedfield',
    fromDate: { date: '2021-12-23T15:14:42.960Z', include_time: true },
    recordId: '61c492627aa151cd7b4b8938',
    recordTitle: '1111',
    slug: 'last_updated',
    toDate: { date: '2021-12-23T16:14:42.960Z', include_time: true },
  },
  {
    color: '#FFD5B3',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Last Updated',
    fieldType: 'lastupdatedfield',
    fromDate: { date: '2021-12-30T09:55:16.437Z', include_time: true },
    recordId: '61c4928c3a242b288499df37',
    recordTitle: '12',
    slug: 'last_updated',
    toDate: { date: '2021-12-30T10:55:16.437Z', include_time: true },
  },
  {
    color: '#FFD5B3',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Last Updated',
    fieldType: 'lastupdatedfield',
    fromDate: { date: '2021-12-23T15:15:53.693Z', include_time: true },
    recordId: '61c492a9996422c82bb50d49',
    recordTitle: 'ddd',
    slug: 'last_updated',
    toDate: { date: '2021-12-23T16:15:53.693Z', include_time: true },
  },
  {
    color: '#FFD5B3',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Last Updated',
    fieldType: 'lastupdatedfield',
    fromDate: { date: '2021-12-23T15:19:01.258Z', include_time: true },
    recordId: '61c49361b56e4d4dc40dd615',
    recordTitle: '123123',
    slug: 'last_updated',
    toDate: { date: '2021-12-23T16:19:01.258Z', include_time: true },
  },
  {
    color: '#FFD5B3',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Last Updated',
    fieldType: 'lastupdatedfield',
    fromDate: { date: '2021-12-28T10:35:23.647Z', include_time: true },
    recordId: '61cae86887dd0daa2cdb05e0',
    recordTitle: 'Due Date',
    slug: 'last_updated',
    toDate: { date: '2021-12-28T11:35:23.647Z', include_time: true },
  },
  {
    color: '#FFD5B3',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Last Updated',
    fieldType: 'lastupdatedfield',
    fromDate: { date: '2022-01-03T10:06:39.895Z', include_time: true },
    recordId: '61d2caaf107a3c40fa1fb044',
    recordTitle: 'test',
    slug: 'last_updated',
    toDate: { date: '2022-01-03T11:06:39.895Z', include_time: true },
  },
  {
    color: '#FFD5B3',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Last Updated',
    fieldType: 'lastupdatedfield',
    fromDate: { date: '2022-01-03T10:08:27.981Z', include_time: true },
    recordId: '61d2cb1b772a16c081b48d2d',
    recordTitle: 'date without time',
    slug: 'last_updated',
    toDate: { date: '2022-01-03T11:08:27.981Z', include_time: true },
  },
  {
    color: '#FFD5B3',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Last Updated',
    fieldType: 'lastupdatedfield',
    fromDate: { date: '2022-01-03T10:16:50.359Z', include_time: true },
    recordId: '61d2cb9d1c63c842945ae7d9',
    recordTitle: 'date range with time',
    slug: 'last_updated',
    toDate: { date: '2022-01-03T11:16:50.359Z', include_time: true },
  },
  {
    color: '#FFD5B3',
    dueDateStatus: { isComplete: undefined, statusResult: undefined },
    fieldLabel: 'Last Updated',
    fieldType: 'lastupdatedfield',
    fromDate: { date: '2022-01-03T10:32:06.123Z', include_time: true },
    recordId: '61d2cf352d72e8aa3829a63f',
    recordTitle: 'due date with time',
    slug: 'last_updated',
    toDate: { date: '2022-01-03T11:32:06.123Z', include_time: true },
  },
];

export const App = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor: '#FAFAFA' }}>
        <Calendar
          onShowAllDayEvents={(date) => console.log(date)}
          events={events as any}
          // mode={'timeThreeDays'}
          mode={'timeGrid'}
          // mode={'timeGridWeek'}
          activeColor={'#127ee8'}
          height={Dimensions.get('window').height}
          onViewModePress={(mode) => console.log(mode)}
          onPressEvent={(event) => console.log(event)}
        />
      </SafeAreaView>
    </React.Fragment>
  );
};
