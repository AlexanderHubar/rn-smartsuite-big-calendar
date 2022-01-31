import React from 'react';
import { Dimensions, SafeAreaView, StatusBar } from 'react-native';

import { Calendar } from 'rn-smartsuite-big-calendar';
import { events } from './data';

export const App = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor: '#38393B' }}>
        <Calendar
          t={(key) => key}
          onShowAllDayEvents={(date) => console.log(date)}
          events={events as any}
          // mode={'timeGrid'}
          mode={'timeThreeDays'}
          // mode={'listWeek'}
          // mode={'dayGridMonth'}
          activeColor={'#127ee8'}
          isLightMode={false}
          showDaysHeader={true}
          locale={'en'}
          ampm={true}
          height={Dimensions.get('window').height}
          spotlightItems={[]}
          onViewModePress={(mode) => console.log(mode)}
          onPressEvent={(event) => console.log(event)}
          onAddEvent={(date) => console.log(date)}
        />
      </SafeAreaView>
    </React.Fragment>
  );
};
