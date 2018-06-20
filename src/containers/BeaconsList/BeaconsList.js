import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';

import Beacon from '../../components/Beacon/Beacon';

class BeaconsList extends Component {
  state = {
    beacons: []
  };

  async componentDidMount() {
    // Tells the library to detect iBeacons
    Beacons.detectIBeacons();

    // Start detecting all iBeacons in the nearby
    try {
      Beacons.setForegroundScanPeriod(1500);
      await Beacons.startRangingBeaconsInRegion('REGION1');
      console.log(`Beacons ranging started succesfully!`);
    } catch (err) {
      console.log(`Beacons ranging not started, error: ${error}`);
    }

    DeviceEventEmitter.addListener('beaconsDidRange', data => {
      this.setState({
        beacons: data.beacons.sort((a, b) => a.uuid.localeCompare(b.uuid))
      });
      console.log('Found beacons!', this.state.beacons);
    });
  }

  render() {
    const beacons = this.state.beacons.map(beacon => (
      <Beacon key={beacon.uuid} data={beacon} />
    ));

    return (
      <View style={styles.container}>
        <Button
          onPress={async () =>
            await Beacons.stopRangingBeaconsInRegion('REGION1')
          }
          title="Stop Ranging"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        {this.state.beacons.length ? (
          beacons
        ) : (
          <Text style={styles.empty}>No se ha encontrado ningún beacon</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  empty: {
    fontSize: 20,
    marginTop: 200,
    textAlign: 'center',
    margin: 10
  }
});

export default BeaconsList;
