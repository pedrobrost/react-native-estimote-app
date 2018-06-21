import React from 'react';
import { Text } from 'react-native';

const beacon = ({ data }) => {
  findColor = uuid => {
    switch (uuid) {
      case 'bbbe':
        return 'pink';
      case 'adef':
        return 'white';
      case 'cbf5':
        return '#C70039';
      case '98d1':
        return 'yellow';
      default:
        return 'limegreen';
    }
  };

  const color = findColor(data.uuid.substring(0, 4));
  return (
    <Text
      style={{
        fontSize: 17,
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      Color:{' '}
      <Text
        style={{
          color,
          textShadowColor: 'black',
          textShadowOffset: { width: 0.1, height: 0.1 },
          textShadowRadius: 8,
        }}
      >
        ●
      </Text>
      {'\n'}
      UUID: {data.uuid}
      {'\n'}
      major: {data.major}
      {'\n'}
      minor: {data.minor}
      {'\n'}
      Distance: {data.distance}
      {'\n'}
      Proximity: {data.proximity}
      {'\n'}
      rssi: {data.rssi}
      {'\n'}
    </Text>
  );
};

export default beacon;
