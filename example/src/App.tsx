import React from 'react';
import { Dimensions, SafeAreaView, StatusBar } from 'react-native';

import { Calendar } from 'rn-smartsuite-big-calendar';

export const App = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor: '#FAFAFA' }}>
        <Calendar
          events={[]}
          mode={'timeGridWeek'}
          activeColor={'#127ee8'}
          height={Dimensions.get('window').height}
          onViewModePress={(mode) => console.log(mode)}
        />
      </SafeAreaView>
    </React.Fragment>
  );
};
