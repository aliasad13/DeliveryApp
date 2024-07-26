
import { useFonts } from 'expo-font';
import {Provider} from 'react-redux'

import Store from './src/Store'

import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import Navigators from "./components/Navigators";
import { setToken } from './src/actions/GeneralAction';
import StorageService from "./services/StorageService"; // Adjust the import path as needed

// Keep the splash screen visible while we fetch resources

export default function App() {
  console.log("initial getFirstTimeUse", StorageService.getFirstTimeUse())
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'astrix': require('./assets/Fonts/Asterix.ttf'),
    'rubik-black': require('./assets/Fonts/Rubik-Black.ttf'),
    'rubik-blackItalic': require('./assets/Fonts/Rubik-BlackItalic.ttf'),
    'rubik-bold': require('./assets/Fonts/Rubik-Bold.ttf'),
    'rubik-boldItalic': require('./assets/Fonts/Rubik-BoldItalic.ttf'),
    'rubik-medium': require('./assets/Fonts/Rubik-Medium.ttf'),
    'rubik-Regular': require('./assets/Fonts/Rubik-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Check for token in SecureStore
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          // If token exists, dispatch action to set it in Redux store
          Store.dispatch(setToken(token));
        }
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && (fontsLoaded || fontError)) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded, fontError]);

  if (!appIsReady || (!fontsLoaded && !fontError)) {
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
