import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';

import Beacon from '../components/Beacon/Beacon';
import Header from '../components/UI/Header';
import Button from '../components/UI/Button';

class BeaconsList extends Component {
  state = {
    beacons: [],
    isRanging: true
  };

  async componentDidMount() {
    this._mounted = true;
    Beacons.detectIBeacons();

    try {
      Beacons.setForegroundScanPeriod(2000);
      await Beacons.startRangingBeaconsInRegion('REGION1');
      console.log(`Beacons ranging started succesfully!`);
    } catch (err) {
      console.log(`Beacons ranging not started, error: ${error}`);
    }

    DeviceEventEmitter.addListener('beaconsDidRange', data => {
      if (this._mounted) {
        this.setState({
          beacons: data.beacons.sort((a, b) => a.uuid.localeCompare(b.uuid))
        });
        console.log('Found beacons!', this.state.beacons);
      }
    });
  }

  async componentWillUnmount() {
    this._mounted = false;
    DeviceEventEmitter.removeListener('beaconsDidRange');
    await Beacons.stopRangingBeaconsInRegion('REGION1');
  }

  async handleStopRanging() {
    this.setState({ isRanging: false });
    await Beacons.stopRangingBeaconsInRegion('REGION1');
  }

  render() {
    const beacons = this.state.beacons.map(beacon => (
      <Beacon key={beacon.uuid} data={beacon} />
    ));

    return (
      <View style={styles.container}>
        <Header text="Range Beacons" />
        {this.state.isRanging ? (
          <Button
            onPress={async () => this.handleStopRanging()}
            text="Stop Ranging"
            color="#5c58a7"
          />
        ) : (
          <Button
            onPress={async () => this.props.history.push('/')}
            text="Back"
            color="#5c58a7"
          />
        )}
        {this.state.beacons.length ? (
          <ScrollView style={{ marginTop: 20 }}>{beacons}</ScrollView>
        ) : (
          <Text style={styles.empty}>No se ha encontrado ningún beacon</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  empty: {
    fontSize: 20,
    marginTop: 200,
    textAlign: 'center',
    margin: 10
  }
});

export default BeaconsList;
