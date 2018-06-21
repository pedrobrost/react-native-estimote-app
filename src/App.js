import React from 'react';
import { StatusBar, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import Home from './containers/Home';
import Ranging from './containers/Ranging';
import Monitoring from './containers/Monitoring';

const app = () => {
  return (
    <NativeRouter>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#872369" barStyle="light-content" />
        <Route exact path="/" component={Home} />
        <Route path="/ranging" component={Ranging} />
        <Route path="/monitoring" component={Monitoring} />
      </View>
    </NativeRouter>
  );
};

export default app;
