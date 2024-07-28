import {Provider} from 'react-redux'
import {Store} from './src/Store'
import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import Navigators from "./components/Navigators";

export default function App() {

  return (
      <View style={{ flex: 1 }} >
        <Provider store={Store}>
          <Navigators />
        </Provider>
      </View>
  );
}
