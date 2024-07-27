import {
    ActivityIndicator, FlatList, Image,
    KeyboardAvoidingView,
    Platform, Pressable,
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
import { Feather } from '@expo/vector-icons';
import React, {useState} from "react";
import StyledTextInput from "../../components/StyledTextInput";
// import StaticImageService from "../../services/StaticImageService";
import CountryCode from "../../constants/CountryCode";
import OtpVerification from "./OtpVerification";
import StaticImageService from "../../services/StaticImageService";

const getDropDownStyle = ({position}) => ({...styles.countryDropDown, top: position.y +140, right: position.x + 82})

function RegisterPhone({navigation}) {

    const [SignUpClicked, setSignUpClicked] = useState(false)
    const sendOtpHandler = () => {
        navigation.navigate("OtpVerification",{
            phoneNumber: RegPhoneNumber
        })
    }

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const [country, setCountry] = useState(CountryCode.find(country => (country.name === 'India')))

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const toggleDropdown = () => {
        setIsVisible(!isVisible);
    };
    const closeDropdown = () => {
        setIsVisible(false);
    };

    const handleItemPress = (item) => {
        setCountry(item)
        setIsVisible(false);
    };
    const handleLayout = (event) => {
        const { x, y } = event.nativeEvent.layout;
        setPosition({ x, y });
    };

    const [RegPhoneNumber, setRegPhoneNumber] = useState("")

    const renderCountry = ({ item: country }) => {
        return (
            <TouchableOpacity onPress={() => handleItemPress(country)} style={styles.countryList}>
                <View style={{width:20}}>
                    <Image source={{uri: StaticImageService.getFlagIcon(country.code)}} style={styles.flagIconDropDown}/>
                </View>
                <View style={{width:100, justifyContent: "center", left: 10}}>
                    <Text style={{fontFamily: 'rubik-medium'}}>{country.name}</Text>
                </View>
                <View style={{width:40, justifyContent: "center", left: 10}}>
                    <Text style={{fontFamily: 'rubik-medium'}}>{country.dial_code}</Text>
                </View>

            </TouchableOpacity>
        );
    };

    return(
        <SafeAreaView style={styles.container} >
            {isVisible && (
                <Pressable style={styles.overlay} onPress={isVisible && closeDropdown} />
            )}
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor={Colors.colors.DEFAULT_WHITE}
                translucent={true}
                showHideTransition
                networkActivityIndicatorVisible={true}
            />
            <Separator/>
            <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}  style={styles.loginContainer}>
                {isVisible && (
                    <Pressable style={styles.overlay2} onPress={isVisible && closeDropdown} />
                )}
                <View style={styles.welcomeTo}>
                    <Text style={styles.welcomeText}>REGISTER PHONE</Text>
                </View>

                <View style={styles.welcomeMessage}>
                    <Text style={styles.resetPasswordText}>
                        Enter your registered phone number to log in.
                    </Text>
                </View>
                <Separator/>

                <View
                    style={isFocused ? styles.usernameInputShadow : styles.usernameInput}
                >
                    <View style={styles.phoneContainer}>
                        <Feather name="phone" size={24} color="#B6AE81FF"/>
                    </View>
                    <View style={styles.prefixImageContainer}
                          onLayout={handleLayout}>
                        <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={toggleDropdown}>
                            <Image source={{uri: StaticImageService.getFlagIcon(country.code)}} style={styles.flagIcon}/>
                            <AntDesign name="down" size={10} color="grey" style={{}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.prefixTextContainer}>
                        <Text style={styles.prefixText}>{country.dial_code}</Text>
                    </View>
                    <TextInput
                        icon={<Feather name="phone" size={24} color="#B6AE81FF"/>}
                        keyboardType={"number-pad"}
                        style={styles.userNameTextInput}
                        keyboardAppearance="dark"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={"Phone Number"}
                        onChangeText={(text) => setRegPhoneNumber(country?.dial_code + text)}

                    />
                </View>
                {isVisible && <View style={getDropDownStyle({position})}>
                    <FlatList
                        data={CountryCode}
                        keyExtractor={(item) => item.code}
                        renderItem={renderCountry}
                        ItemSeparatorComponent={<View style={styles.separator}/>}
                    />
                </View>}

                <Separator/>
                <View >
                    <TouchableOpacity style={styles.SignUp} onPress={sendOtpHandler}>
                        <Text style={styles.SignUpText}>
                            {SignUpClicked ? <ActivityIndicator color={"white"}/> : "SEND OTP"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Separator/>
                <Separator/>
                <Separator/>




            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterPhone

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: 'center',
    },

    countryList: {
        paddingRight: 20,
        paddingLeft: 10,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: setWidth(100),
        height: setHeight(100)
    },

    overlay2: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    separator: {
        borderBottomColor: '#12725f',
        borderBottomWidth: .7,
        marginBottom: 10, // Adjust the margin as needed
    },

    countryDropDown: {
        backgroundColor: Colors.colors.LIGHT_GREY,
        position:"absolute",
        width: setWidth(43),
        maxHeight: setHeight(30),
        borderWidth: .2,
        zIndex: 10,
        borderRadius: 10,


    },

    phoneContainer: {
        width: setWidth(9),
        height: setHeight(4.5),

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

    flagContainer: {
        borderWidth: 1
    },
    prefixImageContainer: {
        width: setWidth(9),
        height: setHeight(4.5),
        left: 3,
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
        left: 6,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    flagIcon: {
        height: 30,
        width: 30,
        top: 5
    },
    flagIconDropDown: {
        height: 20,
        width: 20,
    },
    usernameInput: {
        width: setWidth(70),
        height: setHeight(4.5),
        borderRadius: 5,
        backgroundColor: Colors.colors.DEFAULT_WHITE,

        justifyContent: "space-between",
        flexDirection: "row"
    },
    usernameInputShadow: {
        width: setWidth(70),
        height: setHeight(4.5),
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
        width: setWidth(42),
        fontSize: 18,
        marginLeft: 4

    },

    prefixText: {
        fontFamily: 'rubik-Regular',
        fontSize:  Platform.OS == "ios" ? 18 : 15,
    },

    loginContainer: {
        width: setWidth(95),
        shadowColor: "#151515",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 50,
        backgroundColor: "#d7d591",
        paddingVertical: 30,

    },

    welcomeTo:{
        width: setWidth(70),
        justifyContent: "flex-start",

    },

    resetPasswordText: {
        width: setWidth(63),
        fontFamily: 'rubik-Regular',
        justifyContent: "flex-start",

    },



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
