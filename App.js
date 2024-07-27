
import { useFonts } from 'expo-font';
import {Provider} from 'react-redux'

import {Store} from './src/Store'

import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Navigators from "./components/Navigators";

// Keep the splash screen visible while we fetch resources

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'astrix': require('./assets/Fonts/Asterix.ttf'),
    'rubik-black': require('./assets/Fonts/Rubik-Black.ttf'),
    'rubik-blackItalic': require('./assets/Fonts/Rubik-BlackItalic.ttf'),
    'rubik-bold': require('./assets/Fonts/Rubik-Bold.ttf'),
    'rubik-boldItalic': require('./assets/Fonts/Rubik-BoldItalic.ttf'),
    'rubik-medium': require('./assets/Fonts/Rubik-Medium.ttf'),
    'rubik-Regular': require('./assets/Fonts/Rubik-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError){
    return null;
  }

  return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Provider store={Store}>
          <Navigators />
        </Provider>
      </View>
  );
}
