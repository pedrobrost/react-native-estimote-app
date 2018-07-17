import React from 'react';
import { StyleSheet, Text } from 'react-native';

import ColorLabel from './ColorLabel';

const beacon = ({ data }) => {
  return (
    <Text style={styles.text}>
      <ColorLabel uuid={data.uuid} />{'\n'}
      UUID: {data.uuid}{'\n'}
      major: {data.major}{'\n'}
      minor: {data.minor}{'\n'}
      Distance: {data.distance}{'\n'}
      Proximity: {data.proximity}{'\n'}
      rssi: {data.rssi}{'\n'}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default beacon;
