import React, { useState } from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, ScrollView} from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from "../../constants/Colors";
import HeaderComponent from '../../components/HeaderComponent'; // Import the HeaderComponent
import HomeScreenComponent from '../../components/HomeScreenComponent';
import TodayScreenComponent from '../../components/TodayScreenComponent';
import CartScreenComponent from '../../components/CartScreenComponent';
import CategoriesScreenComponent from '../../components/CategoriesScreenComponent';
import ProfileScreenComponent from '../../components/ProfileScreenComponent';
import {setHeight, setWidth} from "../../utils/Display";

function BaseScreen() {
    const screen = useSelector(state => state.generalState.screen); // Assuming you have this in your Redux state

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor={Colors.colors.DEFAULT_GREEN}
                translucent={true}
                showHideTransition
                networkActivityIndicatorVisible={true}
            />
            <HeaderComponent />
            <View contentContainerStyle={styles.scrollContainer}>
                <View style={styles.screenComponents}>
                    {screen === 'home' && <HomeScreenComponent />}
                    {screen === 'today' && <TodayScreenComponent />}
                    {screen === 'cart' && <CartScreenComponent />}
                    {screen === 'categories' && <CategoriesScreenComponent />}
                    {screen === 'profile' && <ProfileScreenComponent />}
                </View>
            </View>
        </SafeAreaView>
    );
}



export default BaseScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.SECONDARY_WHITE,
        minWidth: '100%'
    },

    screenComponents: {
        flex: 1,
        minWidth: '100%',
        backgroundColor: Colors.colors.SECONDARY_WHITE,
        marginTop: setHeight(1),
    },
});
