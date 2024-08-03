import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {Colors} from "../../constants/Colors";
import Separator from "../../components/Separator";
import {setHeight, setWidth} from "../../utils/Display";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import React, {useRef, useState} from "react";
import StyledTextInput from "../../components/StyledTextInput";


function OtpVerification({route, navigation}) {
    const regPhoneNumber = route.params.phoneNumber
    const firstInput = useRef()
    const secondInput = useRef()
    const thirdInput = useRef()
    const forthInput = useRef()
    const [otp, setOtp] = useState({1: "", 2: "", 3: "", 4: ""})

    console.log("route.params: " + JSON.stringify(route.params, null, 2))
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor={Colors.colors.DEFAULT_WHITE}
                translucent={true}
                showHideTransition
                networkActivityIndicatorVisible={true}
            />
            <Separator/>
            <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={styles.loginContainer}>
                <View style={styles.welcomeTo}>
                    <Text style={styles.welcomeText}>PHONE VERIFICATION</Text>
                </View>
                <Separator/>
                <View style={styles.welcomeMessage}>

                    {regPhoneNumber &&
                        <Text style={styles.resetPasswordText}>
                            Enter the OTP send to <Text style={{color: "#855703"}}>{regPhoneNumber}</Text>
                        </Text>
                    }

                </View>

                <View style={styles.OtpContainer}>
                    <View style={styles.OtpBox}>
                        <TextInput
                            style={styles.OtpText}
                            maxLength={1}
                            keyboardType='number-pad'
                            ref={firstInput}
                            onChangeText={(text) => {
                                setOtp({...otp, 1: text})
                                text && secondInput.current.focus()
                            }}
                        />
                    </View>
                    <View style={styles.OtpBox}>
                        <TextInput
                            style={styles.OtpText}
                            maxLength={1}
                            keyboardType='number-pad'
                            ref={secondInput}
                            onChangeText={(text) => {
                                setOtp({...otp, 2: text})
                                text ? thirdInput.current.focus() : firstInput.current.focus()
                            }}
                        />
                    </View>
                    <View style={styles.OtpBox}>
                        <TextInput
                            style={styles.OtpText}
                            maxLength={1}
                            keyboardType='number-pad'
                            ref={thirdInput}
                            onChangeText={(text) => {
                                setOtp({...otp, 3: text})
                                text ? forthInput.current.focus() : secondInput.current.focus()
                            }}
                        />
                    </View>
                    <View style={styles.OtpBox}>
                        <TextInput
                            style={styles.OtpText}
                            maxLength={1}
                            keyboardType='number-pad'
                            ref={forthInput}
                            onChangeText={(text) => {
                                setOtp({...otp, 4: text})
                                !text && thirdInput.current.focus()
                            }}
                        />
                    </View>
                </View>

                <Separator/>

                <View >
                    <TouchableOpacity style={styles.SignUp} onPress={() => console.log("OTP:", otp)}>
                        <Text style={styles.SignUpText}>
                            VERIFY
                        </Text>
                    </TouchableOpacity>
                </View>

                <Separator/><Separator/>



            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default OtpVerification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        width: setWidth(98),
        shadowColor: "#151515",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 12,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 50,
        backgroundColor: "#d7d591",
        paddingVertical: 30,
    },

    OtpContainer: {
        marginVertical: 20,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 6
    },

    OtpBox: {
        borderRadius: 6,
        borderColor: Colors.colors.DEFAULT_GREEN,
        marginHorizontal: 2,
    },

    OtpText: {
        fontSize: 25,
        color: Colors.colors.DEFAULT_BLACK,
        padding: 0,
        textAlign: "center",
        paddingHorizontal: 18,
        paddingVertical: 10,
        backgroundColor: Colors.colors.DEFAULT_WHITE,
        borderRadius: 6,
        shadowColor: "#151515",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },


    usernameInput: {
        width: setWidth(80),
        height: setHeight(6.4),
        borderRadius: 5,
        backgroundColor: Colors.colors.DEFAULT_WHITE,

        justifyContent: "space-between",
        flexDirection: "row"
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
        elevation: 12,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    userNameTextInput: {

        fontFamily: 'rubik-Regular',
        color: "#7c7575",
        width: setWidth(64),
        fontSize: 18
    },

    welcomeTo: {},
    welcomeText: {
        fontSize: 35,
        fontFamily: 'rubik-black',
        color: "#0A8791",
    },
    welcomeMessage: {
        width: setWidth(70),
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },

    resetPasswordText: {
        width: setWidth(63),
        fontFamily: 'rubik-Regular',
        justifyContent: "flex-start",

    },


    SignUp: {
        width: setWidth(70),
        height: setHeight(4.5),
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.colors.DEFAULT_GREEN,
        shadowColor: "#283128",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 2,
    },
    SignUpText: {
        fontFamily: "rubik-Regular",
        color: "white",
        fontSize: 20
    },
    signUpContainer: {
        width: setWidth(70),
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center"
    },


});
