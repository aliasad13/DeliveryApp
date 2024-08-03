import WelcomeScreen from "../App/Screens/WelcomeScreen";
import SignInScreen from "../App/Screens/SignInScreen";
import SignUpScreen from "../App/Screens/SignUpScreen";
import BaseScreen from "../App/Screens/BaseScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StyleSheet} from "react-native";
import {Colors} from "../constants/Colors";
import { useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {appStart} from "../src/actions/GeneralAction";
import * as SplashScreen from 'expo-splash-screen';
import {Store} from "../src/Store";
import EditProfileScreen from "../App/Screens/EditProfileScreen";


const Stack = createNativeStackNavigator();

function Navigators() {
    const {isAppLoading, accessToken, isFirstTimeUse} = useSelector(state => state?.generalState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appStart())
    }, []);

    console.log('isAppLoading:::::::::::', isAppLoading)
    // to avoid the slight delay that causes the welcome screens to show briefly, we use useEffect  
    useEffect(() => {
        if (!isAppLoading) {
            SplashScreen.hideAsync();
        }
    }, [isAppLoading]);

    if (isAppLoading) {
        return null;
    }

    const screen = () => Store?.getState()?.generalState?.screen;
    console.log("==========================++++===+++=======> screen", screen() )


    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: styles.contentStyle
                }}>
                {!accessToken ? (
                    <>
                        {isFirstTimeUse && (
                            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                        )}
                        <Stack.Screen name="SignInScreen" component={SignInScreen} />
                        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                    </>
                ) : (
                    <>
                    <Stack.Screen name="BaseScreen" component={BaseScreen} />
                    <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
                    </>
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
