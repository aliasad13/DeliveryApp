import {Text, View, TouchableOpacity, StyleSheet,} from 'react-native';

function HomeScreenComponent() {
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
        justifyContent: "center"
    }
})