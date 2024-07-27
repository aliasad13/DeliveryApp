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
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {useState} from "react";
import SignUpScreen from "./SignUpScreen";
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import {login} from "../../utils/https";
// import ResetPassword from "./ResetPassword";
import HomeScreen from "./HomeScreen";
import {connect, useDispatch, useSelector} from "react-redux";
import {setIsFirstTimeUse, setToken} from '../../src/actions/GeneralAction';
import StorageService from "../../services/StorageService";



function SignInScreen({navigation}) {
  const [passwordHidden, setPasswordVisible] = useState(true)
  const changePasswordVisibility = () => {
          setPasswordVisible(!passwordHidden)
  }
  const [rememberMe, setRememberMe] = useState(false)
  const changeRememberMe = () => {
      setRememberMe(!rememberMe)
  }



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

  const [signInClicked, setSignInClicked] = useState(false)
  const changeSignInClicked = () => {
      setSignInClicked(!signInClicked)
  }
    const dispatch = useDispatch()


    // const makeFirstTimeUseTrue = () => {
    //     StorageService.setFirstTimeUse().then(() => {
    //         dispatch(setIsFirstTimeUse())
    //     })
    // }

    const handleLogin = async () => {
        setSignInClicked(true);
        setErrorMessages([]);
        try {
            const response = await login(email, password);
            console.log('Login successful:', response);
            const existingToken = await SecureStore.getItemAsync('token');
            console.log('seure store token:', existingToken);


            if (response){
                StorageService.setUserToken(response["token"]).then(() => {
                    console.log('response["token"]', response["token"]);

                    dispatch(setToken(response["token"]))
                });
            }

            // Handle successful login (e.g., navigate to home screen)
             // Adjust based on your navigation setup
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessages(Array.isArray(error) ? error : [error.toString()]);
        } finally {
            setSignInClicked(false);
        }
    };


  const [isFocusedUser, setIsFocusedUser] = useState(false);
  const handleFocusUser = () => {
      setIsFocusedUser(true);
  };
  const handleBlurUser = () => {
      setIsFocusedUser(false);
  };

  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const handleFocusPassword = () => {
      setIsFocusedPassword(true);
  };
  const handleBlurPassword = () => {
      setIsFocusedPassword(false);
  };

    useEffect(() => {
        const checkLoginStatus = async () => {
            const userToken = await SecureStore.getItemAsync('token');
            if (userToken) {
                // User is already logged in
            }
        };

        checkLoginStatus();
    }, []);

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
      <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={Platform.OS === "ios" ? -130 : 0} style={styles.loginContainer}>
          <View style={styles.welcomeTo}>
              <Text style={styles.welcomeText}>WELCOME</Text>
          </View>
          <Separator/>
          <Separator/>
          <View style={styles.welcomeMessage}></View>
          <View style={isFocusedUser ? styles.usernameInputShadow : styles.usernameInput}>
              <AntDesign name="user" size={24} color="#B6AE81FF" style={styles.userIcon}/>
              <TextInput style={styles.userNameTextInput}
                         placeholder={"Username"}
                         keyboardAppearance={"dark"}
                         onFocus={handleFocusUser}
                         onBlur={handleBlurUser}
                         onChangeText={(text) => {
                             console.log(text)
                             setEmail(text)
                         }}
              >
              </TextInput>

          </View>
          <Separator/>
          <View style={isFocusedPassword ? styles.passWordInputShadow : styles.passWordInput}>
              <Ionicons name="lock-closed-outline" size={24} color="#B6AE81FF" style={styles.lockIcon} />
              <TextInput style={styles.passWordTextInput}
                         placeholder={"Password"}
                         keyboardAppearance={"dark"}
                         secureTextEntry={passwordHidden}
                         onFocus={handleFocusPassword}
                         onBlur={handleBlurPassword}
                         onChangeText={(text) => {
                             console.log(text)
                             setPassword(text)
                         }}

              >
              </TextInput>
              <TouchableOpacity onPress={changePasswordVisibility}>
                  {passwordHidden ? <Ionicons name="eye-outline" size={18} color="#B6AE81FF" style={styles.eyeIcon} /> : <Ionicons name="eye-off-outline" size={18} color="#B6AE81FF" style={styles.eyeIcon}/> }
              </TouchableOpacity>

          </View>
          <Separator/>
          <Separator/>

          <View style={styles.toggleForgotPassword}>
              <View style={styles.switchContainer}>
              <Switch
                  style={styles.switch}
                  value={rememberMe}
                  trackColor={{ true: "#0A8791"}}
                  thumbColor={rememberMe ? 'white' : 'dimgrey'}
                  onValueChange={changeRememberMe}
              />
                  <Text style={styles.remember}>REMEMBER ME</Text>
              </View>
              <View style={styles.forgotPassword}>
                  <TouchableOpacity onPress={() => navigation.navigate(ResetPassword)}>
                      <Text style={styles.forgotPassword}>FORGOT PASSWORD</Text>
                  </TouchableOpacity>
              </View>
          </View>

          <Separator/>
          {errorMessages.length > 0 && (
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
              <TouchableOpacity style={styles.signIn} onPress={handleLogin} disabled={signInClicked}>
                  <Text style={styles.signInText}>
                      {signInClicked ? <ActivityIndicator color={"white"}/> : "SIGN IN"}
                  </Text>
              </TouchableOpacity>
          </View>

          <Separator/>

          {/*<View >*/}
          {/*    <TouchableOpacity style={styles.signIn} onPress={makeFirstTimeUseTrue} disabled={signInClicked}>*/}
          {/*        <Text style={styles.signInText}>*/}
          {/*            {signInClicked ? <ActivityIndicator color={"white"}/> : "First time login"}*/}
          {/*        </Text>*/}
          {/*    </TouchableOpacity>*/}
          {/*</View>*/}




          <Separator/>
              <View style={styles.signUpContainer}>
              <Text style={{fontFamily: 'rubik-Regular'}}>DON'T HAVE AN ACCOUNT ?</Text>
              <TouchableOpacity onPress={() => {navigation.navigate(SignUpScreen)}}>
                  <Text style={{fontFamily: 'rubik-bold', color: Colors.colors.DEFAULT_GREEN}}> SIGN UP </Text>
              </TouchableOpacity>
          </View>

          <Separator/>

          <View style={styles.or}>
              <Text style={{fontFamily: 'rubik-bold'}}>OR</Text>
          </View>
          <Separator/>
          <View style={styles.or}>
              <Text style={{fontFamily: 'rubik-Regular'}}>JUST CONTINUE WITH</Text>
          </View>
          <Separator/>
          <View style={styles.social}>

          <View style={styles.gmail}>
              <TouchableOpacity>
                  <Zocial name="google" size={32} color="#AF2020FF" />
              </TouchableOpacity>
          </View>
              {/*<View style={styles.faceBook}>*/}
              {/*    <TouchableOpacity>*/}
              {/*        <Zocial name="facebook" size={32} color="#4A61A8" />*/}
              {/*    </TouchableOpacity>*/}
              {/*</View>*/}
          </View>
          <Separator/>
          <Separator/>


      </KeyboardAvoidingView>
  </SafeAreaView>
)
}
// const mapDispatchToProps = (dispatch) => ({
//     setToken: (token) => dispatch(setToken(token))
// });


export default SignInScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#ffffff",
      alignItems: 'center',
      justifyContent: 'center',
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
      
      fontFamily: 'rubik-Regular',
      color: "#7c7575",
      width: setWidth(64),
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
      width: setWidth(50),
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
      right: 28,
      alignItems: "center",
      minWidth: setWidth(46)

  },
  remember: {
      fontFamily: 'rubik-Regular',
      fontSize: 12
  },
  switch: {
      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
      shadowColor: "#283128",
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.4,
      shadowRadius: 2,
      elevation: 12,
  },
  forgotPassword: {
    fontFamily: 'rubik-Regular', 
    color: "#0A8791",
    fontSize: 12
  },
  signIn: {
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
  signInText: {
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
