import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LoginScreen from './App/Screens/SignInScreen';
import * as SplashScreen from 'expo-splash-screen';
import WelcomeScreen from './App/Screens/WelcomeScreen';
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {setHeight, setWidth} from './utils/Display'
import { useFonts } from 'expo-font';
import {useEffect, useState} from "react";
import SignInScreen from './App/Screens/SignInScreen';
import SignUpScreen from './App/Screens/SignUpScreen';
import { Colors } from './constants/Colors';
import SuccessScreen from "./App/Screens/SuccessScreen";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {

  const [loaded, error] = useFonts({
    'astrix': require('./assets/Fonts/Asterix.ttf'),
    'rubik-black': require('./assets/Fonts/Rubik-Black.ttf'),
    'rubik-blackItalic': require('./assets/Fonts/Rubik-BlackItalic.ttf'),
    'rubik-bold': require('./assets/Fonts/Rubik-Bold.ttf'),
    'rubik-boldItalic': require('./assets/Fonts/Rubik-BoldItalic.ttf'),
    'rubik-medium': require('./assets/Fonts/Rubik-Medium.ttf'),
    'rubik-Regular': require('./assets/Fonts/Rubik-Regular.ttf'),
  });


  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: styles.contentStyle
            }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  contentStyle: {
    backgroundColor: Colors.colors.DEFAULT_WHITE,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
