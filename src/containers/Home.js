import React from 'react';
import { View } from 'react-native';

import Header from '../components/UI/Header';
import Button from '../components/UI/Button';

const home = props => {
  return (
    <View>
      <Header text="Beacons Finder" />
      <Button
        text="Range Beacons"
        onPress={() => props.history.push('/ranging')}
        color="#5c58a7"
      />
      <Button
        text="Monitor Beacons"
        onPress={() => props.history.push('/monitoring')}
        color="#e98ab4"
      />
    </View>
  );
};

export default home;
