import {Text, View, TouchableOpacity, StyleSheet,} from 'react-native';

function CartScreenComponent() {
    return(
        <View style={styles.container}>
            <Text>
                CartScreen
            </Text>
        </View>
    )
}

export default CartScreenComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})