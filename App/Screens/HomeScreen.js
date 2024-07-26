import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../utils/https'; // Adjust the import path as needed
import {removeToken, setToken} from '../../src/actions/GeneralAction';
import {connect} from "react-redux";
import StorageService, {removeUserToken} from "../../services/StorageService";
import {useDispatch} from "react-redux";

function HomeScreen() {

    const dispatch = useDispatch()

    const handleLogout = () => {
        StorageService.removeUserToken().then(() => {
            dispatch(removeToken())
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>HomeScreen</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
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
