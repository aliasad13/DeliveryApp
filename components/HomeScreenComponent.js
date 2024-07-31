import {Text, View, TouchableOpacity, StyleSheet,} from 'react-native';
import {useDispatch} from "react-redux";
import StorageService from "../services/StorageService";
import {removeToken} from "../src/actions/GeneralAction";

function HomeScreenComponent() {
    const dispatch = useDispatch()

    const handleLogout = () => {
            dispatch(removeToken())
    };

    return(
        <View style={styles.container}>
            <Text>
                HomeScreen
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreenComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    }
})