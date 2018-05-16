import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { DeviceEventEmitter } from "react-native";
import Beacons from "react-native-beacons-manager";

class BeaconsList extends Component {
  state = {
    beacons: []
  };

  async componentDidMount() {
    // Tells the library to detect iBeacons
    Beacons.detectIBeacons();

    // Start detecting all iBeacons in the nearby
    try {
      await Beacons.startRangingBeaconsInRegion("REGION1");
      console.log(`Beacons ranging started succesfully!`);
    } catch (err) {
      console.log(`Beacons ranging not started, error: ${error}`);
    }

    DeviceEventEmitter.addListener("beaconsDidRange", data => {
      this.setState(prevState => {
        const newArray = [...prevState.beacons];
        for (var beacon in data.beacons) {
          if (!newArray.find(bc => bc.uuid === data.beacons[beacon].uuid)) {
            newArray.push(data.beacons[beacon]);
            return { beacons: newArray };
          }
        }
      });
      console.log("Found beacons!", this.state.beacons);
    });
  }

  findColor = uuid => {
    switch (uuid) {
      case "bbbe":
        return "pink";
      case "adef":
        return "white";
      case "cbf5":
        return "#C70039";
      case "98d1":
        return "yellow";
      default:
        return "#DAF7A6";
    }
    return "red";
  };

  render() {
    const beacons = this.state.beacons.map(beacon => (
      <Text
        key={beacon.uuid}
        style={{
          backgroundColor: this.findColor(beacon.uuid.substring(0, 4)),
          fontSize: 20,
          margin: 10
        }}
      >
        Beacon {beacon.uuid.substring(0, 4)} is {beacon.distance}
      </Text>
    ));

    return (
      <View style={styles.container}>
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
    backgroundColor: "#F5FCFF"
  },
  empty: {
    fontSize: 20,
    marginTop: 200,
    textAlign: "center",
    margin: 10
  }
});

export default BeaconsList;
