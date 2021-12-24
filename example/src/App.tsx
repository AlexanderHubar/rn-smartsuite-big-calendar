import React from 'react';
import { Dimensions, SafeAreaView, StatusBar } from 'react-native';

import { Calendar } from 'rn-smartsuite-big-calendar';

export const App = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor: '#FAFAFA' }}>
        <Calendar
          height={Dimensions.get('window').height}
          events={[]}
          mode={'list'}
        />
      </SafeAreaView>
    </React.Fragment>
  );
};
