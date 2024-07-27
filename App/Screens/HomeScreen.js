import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 // Adjust the import path as needed
import {removeToken, setToken} from '../../src/actions/GeneralAction';
import {connect} from "react-redux";
import StorageService, {removeUserToken} from "../../services/StorageService";
import {useDispatch} from "react-redux";
import Separator from "../../components/Separator";
import {getUserData} from "../../utils/https";

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
        <View style={styles.container}>
            <Text style={styles.text}>HomeScreen</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity style={styles.button} onPress={getUserInfo}>
                <Text style={styles.buttonText}>UserInfo</Text>
            </TouchableOpacity>
        </View>
    );
}



export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});
