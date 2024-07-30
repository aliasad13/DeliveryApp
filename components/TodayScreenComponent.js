import {Text, View, TouchableOpacity, StyleSheet,} from 'react-native';

function TodayScreenComponent() {
    return(
        <View style={styles.container}>
            <Text>
                TodayScreen
            </Text>
        </View>
    )
}

export default TodayScreenComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})