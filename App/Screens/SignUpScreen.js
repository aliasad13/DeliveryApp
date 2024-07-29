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
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

import {Colors} from "../../constants/Colors";
import Separator from "../../components/Separator";
import {setHeight, setWidth} from "../../utils/Display";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import {useState} from "react";
import StyledTextInput from "../../components/StyledTextInput";
import RegisterPhone from "../Screens/RegisterPhone";
import {register} from '../../utils/https';
import StorageService from "../../services/StorageService";
import {setAccessToken, setRefreshToken} from "../../src/actions/GeneralAction";
import {useDispatch} from "react-redux";


function SignUpScreen({navigation}) {
    const [passwordHidden, setPasswordVisible] = useState(true)
    const changePasswordVisibility = () => {
        setPasswordVisible(!passwordHidden)
    }


    const signUpClickHandler = async () => {
        try {
            await handleSignUp(); // Call handleSignUp function
        } catch (error) {
            console.error('Error occurred during sign up:', error.message);
            // Handle error, e.g., display error message to the user
        }
    };


    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFocusPassword = () => {
        setIsFocusedPassword(true);
    };
    const handleBlurPassword = () => {
        setIsFocusedPassword(false);
    };
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch()

    const handleSignUp = async () => {
        setErrorMessages([]); // Clear previous error messages
        setErrorMessages([]);
        try {
            const response = await register(username, email, password, confirmPassword);

            if (response){
                StorageService.setUserAccessToken(response.accessToken).then(() => {
                    dispatch(setAccessToken(response.accessToken))
                });

                StorageService.setUserRefreshToken(response.refreshToken).then(() => {
                    dispatch(setRefreshToken(response.refreshToken))
                });
            }

            // Handle successful login (e.g., navigate to home screen)
            // Adjust based on your navigation setup
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessages(Array.isArray(error) ? error : [error.toString()]);
        }
    };;

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
            <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={Platform.OS === "ios" ? -20 : 0} style={styles.loginContainer}>
                <View style={styles.welcomeTo}>
                    <Text style={styles.welcomeText}>JOIN US</Text>
                </View>
                <Separator/>
                <Separator/>
                <View style={styles.welcomeMessage}></View>


                <StyledTextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => {
                        setUsername(text);
                    }}
                    icon={<AntDesign name="user" size={24} color="#B6AE81FF" />}
                />
                <Separator/>

                <StyledTextInput
                    placeholder="Mail"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    keyboardType={"email-address"}

                    icon={<AntDesign name="mail" size={24} color="#B6AE81FF" />}
                />
                <Separator/>

                {/* since there is eye icon I didnt add the styled text input here*/}
                <View style={isFocusedPassword ? styles.passWordInputShadow : styles.passWordInput}>
                    <Ionicons name="lock-closed-outline" size={24} color="#B6AE81FF" style={styles.lockIcon} />
                    <TextInput style={styles.passWordTextInput}
                               placeholder={"Password"}
                               value={password}
                               onChangeText={setPassword}
                               keyboardAppearance={"dark"}
                               secureTextEntry={passwordHidden}
                               onFocus={handleFocusPassword}
                               onBlur={handleBlurPassword}

                    >
                    </TextInput>
                    <TouchableOpacity onPress={changePasswordVisibility}>
                        {passwordHidden ? <Ionicons name="eye-outline" size={18} color="#B6AE81FF" style={styles.eyeIcon} /> : <Ionicons name="eye-off-outline" size={18} color="#B6AE81FF" style={styles.eyeIcon}/> }
                    </TouchableOpacity>

                </View>
                <Separator/>
                <View style={isFocusedPassword ? styles.passWordInputShadow : styles.passWordInput}>
                    <Ionicons name="lock-closed-outline" size={24} color="#B6AE81FF" style={styles.lockIcon} />
                    <TextInput style={styles.passWordTextInput}
                               placeholder={"Confirm Password"}
                               value={confirmPassword}
                               onChangeText={setConfirmPassword}
                               keyboardAppearance={"dark"}
                               secureTextEntry={passwordHidden}
                               onFocus={handleFocusPassword}
                               onBlur={handleBlurPassword}

                    >
                    </TextInput>
                    <TouchableOpacity onPress={changePasswordVisibility}>
                        {passwordHidden ? <Ionicons name="eye-outline" size={18} color="#B6AE81FF" style={styles.eyeIcon} /> : <Ionicons name="eye-off-outline" size={18} color="#B6AE81FF" style={styles.eyeIcon}/> }
                    </TouchableOpacity>

                </View>

                <Separator/>

                {Array.isArray(errorMessages) && errorMessages.length > 0 && (
                    <View style={styles.errorContainer}>
                        {errorMessages.map((message, index) => (
                            <Text key={index} style={styles.errorMessage}>
                                • {message}
                            </Text>
                        ))}
                    </View>
                )}

                <Separator/>

                <View >
                    <TouchableOpacity style={styles.SignUp} onPress={signUpClickHandler}>
                        <Text style={styles.SignUpText}>
                             SIGN UP
                        </Text>
                    </TouchableOpacity>
                </View>
{/*// in the future remove the sign up button with verify mail, send a mail with an OTP and verify that otp here, after that sign up automatically*/}

                <Separator/>
              
                <Separator/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        minHeight: setHeight(60),
        minWidth: setWidth(95),
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 22,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 20,
        backgroundColor: "#d7d591",
        paddingVertical: 20,
        paddingHorizontal: 12,
        flexDirection: "column"
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
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'rubik-Regular',
        width: setWidth(54),
        borderWidth: 1,
        fontSize: 18
    },

    userIcon: {
        top: 19,
        left: 9
    },

    lockIcon: {
        top: 19,
        left: 9
    },

    eyeIcon: {
        top: 21,
        right: 9,
    },

    passWordInput: {
        width: setWidth(80),
      height: setHeight(6.4),
      borderRadius: 5,
      backgroundColor: Colors.colors.DEFAULT_WHITE,

        justifyContent: "space-between",
        flexDirection: "row"

    },

    passWordInputShadow: {
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
    passWordTextInput: {
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'rubik-Regular',
        width: setWidth(51),
        fontSize: 18
    },
    welcomeTo: {},
    welcomeText: {
        fontSize: 35,
        fontFamily: 'rubik-black',
        color: "#0A8791",
    },
    welcomeMessage: {},


    toggleForgotPassword: {
        flexDirection: "row",
        alignItems: "center",
        width: setWidth(70),
        justifyContent: "space-between"
    },
    switchContainer: {
        flexDirection: "row",
        right: 9,
        alignItems: "center",

    },

    errorContainer: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#FFEBEE',
        borderRadius: 5,
        shadowOpacity: .1,
        shadowRadius: 14,
        elevation: 12,
    },
    errorMessage: {
        color: '#D32F2F',
        fontSize: 14,
        marginBottom: 5,
    },

    remember: {
        fontFamily: 'rubik-Regular'
    },
    switch: {
        transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
        shadowColor: "#283128",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 2,
    },
    forgotPassword: {

    },
    SignUp: {
        width: setWidth(70),
        height: setHeight(4.5),
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.colors.DEFAULT_GREEN,
        shadowColor: "#283128",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 12,
    },
    SignUpText: {
        fontFamily: "rubik-Regular",
      color: "white",
      fontSize: 15
    },
    signUpContainer: {
        width: setWidth(70),
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center"
    },
    or: {},
    faceBook: {},
    gmail: {},
    social: {
        width: setWidth(40),
        flexDirection: "row",
        justifyContent: "space-around"
    },

});
