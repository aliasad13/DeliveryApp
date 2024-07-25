import { StyleSheet, Text, View, Image } from 'react-native'
import {setHeight, setWidth} from '../../utils/Display'

import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function SplashScreen() {
  return (
    <View style={styles.container}>
    <StatusBar barStyle="light-content" />
      <Image source={require('../../assets/images/splashScreen.jpg')}
                style={styles.overlay}
                
            />
            <Text style={styles.text}>EmptyBrain.com</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignContent: 'center'
      },
      image: {
        width: '100%',
        height: '100%',
      },
      overlay: {
        width: setWidth(70),
        height: setHeight(70),
        resizeMode: 'contain',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 10
    }
})