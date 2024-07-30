import {Text, View, TouchableOpacity, StyleSheet,} from 'react-native';

function ProfileScreenComponent() {
    return(
        <View style={styles.container}>
            <Text>
                My Profile
            </Text>
        </View>
    )
}

export default ProfileScreenComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    }
})