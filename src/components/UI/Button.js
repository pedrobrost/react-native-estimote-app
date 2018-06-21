import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { withRouter } from 'react-router-native';

const button = props => {
  const { text, color, onPress } = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ backgroundColor: color }}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    padding: 30,
    color: 'white'
  }
});

export default withRouter(button);
