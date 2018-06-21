import React from 'react';
import { StyleSheet, Text } from 'react-native';

const header = ({ text }) => {
  return <Text style={styles.header}>{text}</Text>;
};

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 40,
    backgroundColor: '#872369',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30
  }
});

export default header;
