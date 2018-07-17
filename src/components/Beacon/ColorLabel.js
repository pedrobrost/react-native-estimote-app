import React, { Fragment } from 'react';
import { Text } from 'react-native';

const ColorLabel = ({ uuid }) => {
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

  const color = findColor(uuid.substring(0, 4));
  return (
    <Fragment>
      Color:{' '}
      <Text
        style={{
          color,
          textShadowColor: 'black',
          textShadowOffset: { width: 0.1, height: 0.1 },
          textShadowRadius: 8
        }}
      >
        ●
      </Text>
    </Fragment>
  );
};

export default ColorLabel;
