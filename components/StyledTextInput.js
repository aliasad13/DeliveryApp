import React, { useState } from 'react';
import {View, TextInput, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {setHeight, setWidth} from "../utils/Display";
import {Colors} from "../constants/Colors";

const StyledTextInput = ({
                             placeholder,
                             secureTextEntry,
                             icon,
                             keyboardType,
                             prefix,
                             prefixImage
                         }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <View style={isFocused ? styles.usernameInputShadow : styles.usernameInput}>
            <View style={styles.userIconContainer}>
                {icon && React.cloneElement(icon, { style: styles.userIcon })}
            </View>
            <TextInput
                style={styles.userNameTextInput}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardAppearance="dark"
                onFocus={handleFocus}
                onBlur={handleBlur}
                keyboardType={keyboardType}
            />
        </View>
    );
};

export default StyledTextInput;

const styles = StyleSheet.create({
    usernameInput: {
        width: setWidth(80),
      height: setHeight(6.4),
      borderRadius: 5,
      backgroundColor: Colors.colors.DEFAULT_WHITE,

        justifyContent: "space-between",
        flexDirection: "row"
    },


    prefixImageContainer: {
        width: setWidth(9),
        height: setHeight(4.5),
        left: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.colors.DEFAULT_WHITE,
        borderRadius: 6,
        shadowColor: "#151515",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 2,
    },
    prefixTextContainer: {
        width: setWidth(7),
        height: setHeight(4.5),
        left: 21,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    prefixText: {
        fontFamily: 'rubik-Regular',
        fontSize: 20
    },
    usernameInputShadow: {
        width: setWidth(80),
        height: setHeight(6.4),
        borderRadius: 5,
        backgroundColor: Colors.colors.DEFAULT_WHITE,
        shadowColor: "#151515",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 2,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    userNameTextInput: {
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'rubik-Regular',
        width: setWidth(65),
        fontSize: 20,

    },
    userIconContainer: {

    },
    userIcon: {
        top: 9,
        left: 9
    },

    lockIcon: {
        top: 9,
        left: 9
    },

    eyeIcon: {
        top: 11,
        right: 9,
    },
})