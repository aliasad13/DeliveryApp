import {Provider} from 'react-redux'
import {Store} from './src/Store'
import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import Navigators from "./components/Navigators";
import { RootSiblingParent } from 'react-native-root-siblings';

// RootSiblingParent is for toast message

export default function App() {

  return (
      <RootSiblingParent>
          <View style={{ flex: 1 }} >
            <Provider store={Store}>
              <Navigators />
            </Provider>
          </View>
      </RootSiblingParent>
  );
}
