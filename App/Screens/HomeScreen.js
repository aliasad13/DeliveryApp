import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {removeToken, setToken} from '../../src/actions/GeneralAction';
import {connect} from "react-redux";
import StorageService, {removeUserToken} from "../../services/StorageService";
import {useDispatch} from "react-redux";
import Separator from "../../components/Separator";
import {getUserData} from "../../utils/https";
import {Colors} from "../../constants/Colors";
import {Feather, Ionicons} from '@expo/vector-icons';

function HomeScreen() {

    const dispatch = useDispatch()

    const handleLogout = () => {
        StorageService.removeUserToken().then(() => {
            dispatch(removeToken())
        });
    };

    const getUserInfo = async () => {
        const response = await getUserData()
        console.log("userInfo", response)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor={Colors.colors.DEFAULT_GREEN}
                translucent={true}
                showHideTransition
                networkActivityIndicatorVisible={true}
            />
            <View style={styles.headerCurvedContainer}></View>
            <View style={styles.headerContainer}>
                <View style={styles.locationNotificationContainer}>
                    <View style={styles.locationContainer}>
                        <Ionicons name="location-outline" size={28} color="#B6AE81FF" style={styles.locationIcon} />
                        <Text style={styles.landMark}>Landmark,</Text>
                        <Text style={styles.town}>Town</Text>
                    </View>
                    <View style={styles.notificationContainer}>
                        <Ionicons name="notifications-outline" size={28} color="B6AE81FF" style={styles.bellIcon}/>
                        <View style={styles.alertBadge}><Text style={styles.bellText}>12</Text></View>
                    </View>
                </View>
                <View style={styles.searchContainer}></View>
            </View>


            {/*<Text style={styles.text}>HomeScreen</Text>*/}
            {/*<TouchableOpacity style={styles.button} onPress={handleLogout}>*/}
            {/*    <Text style={styles.buttonText}>Logout</Text>*/}
            {/*</TouchableOpacity>*/}
            {/*<Separator />*/}
            {/*<TouchableOpacity style={styles.button} onPress={getUserInfo}>*/}
            {/*    <Text style={styles.buttonText}>UserInfo</Text>*/}
            {/*</TouchableOpacity>*/}
        </SafeAreaView>
    );
}



export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minWidth: "100%",
        backgroundColor: Colors.colors.SECONDARY_WHITE
    },

    containerDark: {
        flex: 1,
        minWidth: "100%",
        backgroundColor: Colors.colors.DARK_TWO
    },

    headerContainer: {
        padding: 17,
        paddingTop: 10
    },

    locationNotificationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center"
    },

    searchContainer: {

    },
    landMark: {
        color: 'white',
        marginLeft: 3,
        fontFamily: 'rubik-Regular'
    },
    town: {
        marginLeft: 2,
        fontSize: 16,
        color: '#c4ba6f',
        fontFamily: 'rubik-medium'

    },

    headerCurvedContainer: {
        backgroundColor: Colors.colors.DEFAULT_GREEN,
        height: "237%",
        position: "absolute",
        top: "-209%",
        minWidth: "485%",
        borderRadius: "1700%",
        alignSelf: "center",
        zIndex: -1,
        shadowColor: "#151515", // put the shadow same as the green at top or neon so it looks like the light bleeds into dark
        shadowOffset: {width: 12, height: 6},
        shadowOpacity: 0.5,
        shadowRadius: 17,
        elevation: 15,

    },

    notificationContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 11
    },

    bellIcon: {
        color: '#B6AE81FF'
    },

    locationIcon: {
        color: '#B6AE81FF'
    },

    text: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#B6AE81FF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    alertBadge: {
        position: "absolute",
        zIndex: 2,
        borderRadius: 32,
        backgroundColor: Colors.colors.DEFAULT_YELLOW,
        justifyContent: "center",
        alignItems: "center",
        right: 5,
        padding: 3,
        bottom: 15,
        minHeight: 19,
        minWidth: 19
    },
    bellText: {
        fontFamily: 'rubik-bold',
        fontSize: 12,
    },

});
