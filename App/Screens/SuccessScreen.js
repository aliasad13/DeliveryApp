import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../utils/https'; // Adjust the import path as needed
import SignInScreen from "../Screens/SignInScreen";

function SuccessScreen() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        await logout();
        navigation.navigate('SignInScreen'); // Or wherever you want to redirect after logout
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>SuccessScreen</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

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

export default SuccessScreen;