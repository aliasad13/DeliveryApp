import WelcomeScreen from "../App/Screens/WelcomeScreen";
import SignInScreen from "../App/Screens/SignInScreen";
// import SplashScreen from '../App/Screens/SplashScreen'
import SignUpScreen from "../App/Screens/SignUpScreen";
import HomeScreen from "../App/Screens/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StyleSheet} from "react-native";
import {Colors} from "../constants/Colors";
import { useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {appStart} from "../src/actions/GeneralAction";
import * as SplashScreen from 'expo-splash-screen';


const Stack = createNativeStackNavigator();

function Navigators() {
    const {isAppLoading, token, isFirstTimeUse} = useSelector(state => state?.generalState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appStart())
    }, []);

    if (isAppLoading) {
        return null; // Or a loading indicator if you prefer
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: styles.contentStyle
                }}>
                {!token ? (
                    <>
                        {isFirstTimeUse && (
                            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                        )}
                        <Stack.Screen name="SignInScreen" component={SignInScreen} />
                        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                    </>
                ) : (
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigators; //connect() returns a function that takes one argument

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    contentStyle: {
        backgroundColor: Colors.colors.DEFAULT_WHITE,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
