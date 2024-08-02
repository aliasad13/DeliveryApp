import {Text, View, TouchableOpacity, StyleSheet,} from 'react-native';
import {useDispatch} from "react-redux";
import StorageService, {removeUserToken} from "../services/StorageService";
import {removeToken} from "../src/actions/GeneralAction";

function HomeScreenComponent() {
    const dispatch = useDispatch()


    return(
        <View style={styles.container}>
            <Text>
                HomeScreen
            </Text>
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