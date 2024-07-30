import React, {useEffect, useRef, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, TextInput, Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {removeToken, setToken} from '../../src/actions/GeneralAction';
import {connect} from "react-redux";
import StorageService, {removeUserToken} from "../../services/StorageService";
import {useDispatch} from "react-redux";
import Separator from "../../components/Separator";
import {getUserData} from "../../utils/https";
import {Colors} from "../../constants/Colors";
import {Feather, Ionicons} from '@expo/vector-icons';
import {setHeight, setWidth} from "../../utils/Display";
import Mocks from "react-native-gesture-handler/src/mocks";
import DummyCategories from "../../src/constants/DummyCategories";
import CategoryMenuItem from "../../components/CategoryMenuItem";

function BaseScreen() {

    const dispatch = useDispatch()

    const handleLogout = () => {
        StorageService.removeUserToken().then(() => {
            dispatch(removeToken())
        });
    };

    const getUserInfo = async () => {
        const response = await getUserData()
        console.log("userInfo", response)
    }

    const [isFocusedSearch, setIsFocusedSearch] = useState(false);

    const handleFocusSearch = () => {
        setIsFocusedSearch(true);
    };
    const handleBlurSearch = () => {
        setIsFocusedSearch(false);
    };
    const searchWidth = useRef(new Animated.Value(setWidth(50))).current;

    useEffect(() => {
        Animated.timing(searchWidth, {
            toValue: isFocusedSearch ? setWidth(80) : setWidth(50),
            duration: 400, // Duration of the animation in milliseconds
            useNativeDriver: false,
        }).start();
    }, [isFocusedSearch]);

    const [searchText, setSearchText] = useState('');

    const [dropDownHidden, setDropDownHidden] = useState(true)
    const sliderHandler = () => {
        setDropDownHidden(!dropDownHidden)
    }

    const [activeCategory, setActiveCategory] = useState('Home')
//todays special, categories, home, profile

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor={Colors.colors.DEFAULT_GREEN}
                translucent={true}
                showHideTransition
                networkActivityIndicatorVisible={true}
            />
            <View style={styles.headerCurvedContainer}></View>
            <View style={styles.headerContainer}>
                <View style={styles.locationNotificationContainer}>
                    <View style={styles.locationContainer}>
                        <Ionicons name="location-outline" size={28} color="#B6AE81FF" style={styles.locationIcon} />
                        <Text style={styles.landMark}>Landmark,</Text>
                        <Text style={styles.town}>Town</Text>
                    </View>
                    <View style={styles.notificationContainer}>
                        <Ionicons name="notifications-outline" size={28} color="B6AE81FF" style={styles.bellIcon}/>
                        <View style={styles.alertBadge}><Text style={styles.bellText}>12</Text></View>
                    </View>
                </View>

                <View style={styles.searchContainer}>
                    <Animated.View style={[styles.searchInput, { width: searchWidth }]}>
                        <Ionicons name="search-outline" size={24} color="#B6AE81FF" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchTextInput}
                            placeholder={"Search.."}
                            value={searchText}
                            onChangeText={setSearchText}
                            keyboardAppearance={"dark"}
                            onFocus={handleFocusSearch}
                            onBlur={handleBlurSearch}
                        />
                        <TouchableOpacity onPress={sliderHandler}>
                            <Feather name="sliders" size={24} style={styles.sliderIcon} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>


                <View style={styles.categoriesContainer}>
                    {DummyCategories.DUMMY_CATEGORIES.map((category) => {
                        const { name, logo } = category; // Destructure category object
                        return (
                            <CategoryMenuItem
                                key={name} // Assuming name is unique, you can also use an ID if available
                                name={name}
                                logo={logo}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                            />
                        );
                    })}
                </View>

                <View style={styles.screenComponents}>

                </View>


            </View>


            {/*<Text style={styles.text}>BaseScreen</Text>*/}
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            {/*<Separator />*/}
            {/*<TouchableOpacity style={styles.button} onPress={getUserInfo}>*/}
            {/*    <Text style={styles.buttonText}>UserInfo</Text>*/}
            {/*</TouchableOpacity>*/}
        </SafeAreaView>
    );
}



export default BaseScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minWidth: "100%",
        backgroundColor: Colors.colors.SECONDARY_WHITE
    },

    screenComponents: {

    },

    containerDark: {
        flex: 1,
        minWidth: "100%",
        backgroundColor: Colors.colors.DARK_TWO
    },
    categoriesContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20,
    },

    headerContainer: {
        padding: 17,
        paddingTop: 10
    },

    searchIcon: {
        color: Colors.colors.DEFAULT_GREEN1
    },

    sliderIcon: {
        color: Colors.colors.DEFAULT_GREEN1
    },

    searchTextInputShadow: {
        width: setWidth(85),
        height: setHeight(4.8),
        borderRadius: 8,
        backgroundColor: Colors.colors.DEFAULT_WHITE,
        shadowColor: "#151515",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 12,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        fontFamily: 'rubik-Regular',


    },

    searchInput: {
        width: setWidth(79),
        height: setHeight(4.8),
        borderRadius: 8,
        backgroundColor: Colors.colors.SECONDARY_WHITE,
        overflow:"hidden",

        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        flexDirection: "row"

    },

    searchTextInput: {
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'rubik-Regular',
        width: setWidth(55),
        fontSize: 18,
        marginLeft: 10
    },

    locationNotificationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center"
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 14
    },
    landMark: {
        color: 'white',
        marginLeft: 3,
        fontFamily: 'rubik-Regular'
    },
    town: {
        marginLeft: 2,
        fontSize: 16,
        color: '#c4ba6f',
        fontFamily: 'rubik-medium'

    },

    headerCurvedContainer: {
        backgroundColor: Colors.colors.DEFAULT_GREEN,
        height: "239%",
        position: "absolute",
        top: "-209%",
        minWidth: "495%",
        borderRadius: "1700%",
        alignSelf: "center",
        zIndex: -1,
        shadowColor: "#151515", // put the shadow same as the green at top or neon so it looks like the light bleeds into dark
        shadowOffset: {width: 12, height: 6},
        shadowOpacity: 0.5,
        shadowRadius: 17,
        elevation: 15,

    },

    notificationContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 11
    },

    bellIcon: {
        color: '#B6AE81FF'
    },

    locationIcon: {
        color: '#B6AE81FF'
    },

    text: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#B6AE81FF',
        padding: 10,
        borderRadius: 5,
        maxWidth: 140,
        position: "absolute",
        top: "50%",
        left: "43%",
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    alertBadge: {
        position: "absolute",
        zIndex: 2,
        borderRadius: 32,
        backgroundColor: Colors.colors.DEFAULT_YELLOW,
        justifyContent: "center",
        alignItems: "center",
        right: 5,
        padding: 3,
        bottom: 15,
        minHeight: 19,
        minWidth: 19
    },
    bellText: {
        fontFamily: 'rubik-bold',
        fontSize: 12,
    },

});
