import {Text, View, TouchableOpacity, StyleSheet,} from 'react-native';

function ProfileScreen() {
    return(
        <View style={styles.container}>
            <Text>
                ProfileScreen
            </Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})