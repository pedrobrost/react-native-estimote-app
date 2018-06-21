import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';

import Header from '../components/UI/Header';
import Button from '../components/UI/Button';

class BeaconsList extends Component {
  state = {
    inRegion: false
  };

  async componentDidMount() {
    this._mounted = true;
    Beacons.detectIBeacons();

    try {
      Beacons.setForegroundScanPeriod(1500);
      await Beacons.startMonitoringForRegion({
        identifier: 'REGION1',
        uuid: 'CBF53FBE-B334-BBA2-F7FB-75DF2D783AAD'
      });
      console.log(`Beacons moniitoring started succesfully!`);
    } catch (err) {
      console.log(`Beacons moniitoring not started, error: ${err}`);
    }

    DeviceEventEmitter.addListener('regionDidEnter', data => {
      console.log('Entra', data);
      if (this._mounted) {
        this.setState({ inRegion: true });
      }
    });

    DeviceEventEmitter.addListener('regionDidExit', data => {
      console.log('Sale', data);
      if (this._mounted) {
        this.setState({ inRegion: false });
      }
    });
  }

  async componentWillUnmount() {
    this._mounted = false;
    DeviceEventEmitter.removeListener('regionDidEnter');
    DeviceEventEmitter.removeListener('regionDidExit');
    await Beacons.stopMonitoringForRegion({
      identifier: 'REGION1',
      uuid: 'CBF53FBE-B334-BBA2-F7FB-75DF2D783AAD'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="Monitor Beacons" />
        <Button
          onPress={async () => this.props.history.push('/')}
          text="Stop Monitoring"
          color="#5c58a7"
        />
        <View style={styles.centerContainer}>
          <Image
            blurRadius={this.state.inRegion ? 0 : 1}
            tintColor={this.state.inRegion ? null : 'rgba(128, 128, 128, 0.5)'}
            source={require('./beacon.png')}
          />
          <Text>
            {this.state.inRegion ? 'Inside Region' : 'Outside Region'}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF'
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
  empty: {
    fontSize: 20,
    marginTop: 200,
    textAlign: 'center',
    margin: 10
  }
});

export default BeaconsList;
