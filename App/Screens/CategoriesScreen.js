import {Text, View, TouchableOpacity, StyleSheet,} from 'react-native';

function CategoriesScreen() {
    return(
        <View style={styles.container}>
            <Text>
                CategoriesScreen
            </Text>
        </View>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})