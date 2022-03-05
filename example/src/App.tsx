import React from 'react';
import { Dimensions, SafeAreaView, StatusBar } from 'react-native';

import { Calendar } from 'rn-smartsuite-big-calendar';
import { events } from './performanceCheckData';

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
          // mode={'timeThreeDays'}
          mode={'timeGridWeek'}
          // mode={'listWeek'}
          // mode={'dayGridMonth'}
          activeColor={'#127ee8'}
          onPressCell={(date) => console.log(date)}
          isLightMode={false}
          showDaysHeader={true}
          locale={'en'}
          ampm={true}
          height={Dimensions.get('window').height}
          spotlightItems={[]}
          findItems={[]}
          onViewModePress={(mode) => console.log(mode)}
          onPressEvent={(event) => console.log(event)}
          onAddEvent={(date) => console.log(date)}
        />
      </SafeAreaView>
    </React.Fragment>
  );
};
