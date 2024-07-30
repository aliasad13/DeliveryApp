import {Text, View, TouchableOpacity, StyleSheet,} from 'react-native';

function TodayScreen() {
    return(
        <View style={styles.container}>
            <Text>
                TodayScreen
            </Text>
        </View>
    )
}

export default TodayScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})