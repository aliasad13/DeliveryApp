import {Text, View, TouchableOpacity, StyleSheet, Image, ScrollView,} from 'react-native';
import {Colors} from "../constants/Colors";
import {setHeight, setWidth} from "../utils/Display";
import {AntDesign, Feather} from "@expo/vector-icons";
import {useDispatch, useSelector} from 'react-redux';
import {getUserData} from "../utils/https";
import FormattedDate from "./FormattedDate";
import {set} from "lodash/object";
import {removeUserToken} from "../services/StorageService";
import {removeToken} from "../src/actions/GeneralAction";

function ProfileScreenComponent() {

    const dispatch = useDispatch()

    const userData = useSelector(state => state.generalState.userData);
    let userInfo;
    if(userData){
        userInfo = userData.user
    }
    const fullName = (firstName, lastName) => {
        if(firstName && lastName){
        return (firstName.slice(0,1).toUpperCase() + firstName.slice(1) + " " + lastName.slice(0,1).toUpperCase() + lastName.slice(1) )
        }
    }

    const handleLogout = async () => {
        try {
            await removeUserToken();
            dispatch(removeToken());
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    console.log("user===>", userData)
    console.log("userInfo===>", userInfo)
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileContainer}>
               <View style={styles.primaryDetailsCard}>
                   <View style={styles.profilePicture}>
                       <Image source={require('../assets/images/profileAvatar.png')} style={styles.profilePictureImage}/>
                   </View>
                   <View style={styles.userDetails}>

                       {/*frstname + lastname = fullname*/}
                       <View style={styles.fullNameContainer}>
                           <Text style={styles.fullNameText}>{userInfo ? fullName(userInfo.first_name, userInfo.last_name) : ''}</Text>
                       </View>

                       {/*username*/}
                       <View style={styles.detailsBelowFullNameContainer}>
                       <View style={styles.userNameContainer}>
                           <View style={styles.userNameLabel}>
                               <Text style={styles.userNameLabelText}><AntDesign name="user" size={24} color="#B6AE81FF" style={styles.userIcon}/></Text>
                           </View>
                           <View style={styles.gap}>
                               <Text style={styles.gapText}></Text>
                           </View>
                           <View style={styles.userName}>
                               <Text style={styles.userNameText}>{userInfo ? userInfo.username : ''}</Text>
                           </View>
                       </View>

                           {/*//email*/}

                       <View style={styles.userNameContainer}>
                           <View style={styles.userNameLabel}>
                               <Text style={styles.userNameLabelText}><AntDesign name="mail" size={24} color="#B6AE81FF" /></Text>
                           </View>
                           <View style={styles.gap}>
                               <Text style={styles.gapText}> </Text>
                           </View>
                           <View style={styles.userName}>
                               <Text style={styles.userNameText}>{userInfo ? userInfo.email : ''}</Text>
                           </View>
                       </View>

                           <View style={styles.userNameContainer}>
                               <View style={styles.userNameLabel}>
                                   <Text style={styles.userNameLabelText}><AntDesign name="calendar" size={24} color="#B6AE81FF" /></Text>
                               </View>
                               <View style={styles.gap}>
                                   <Text style={styles.gapText}> </Text>
                               </View>
                               <View style={styles.userName}>
                                   <Text style={styles.userNameText}>{userInfo ? <FormattedDate date={userInfo.created_at}/> : ''}</Text>
                               </View>
                           </View>

                           {/*phone number can be added her but it will require the otp verification*/}
                       </View>
                   </View>
               </View>
            </View>
            <View style={styles.touchables}>
            <TouchableOpacity style={styles.touchable}>
                <Text style={styles.touchableText}> Edit Profile </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable}>
                <Text style={styles.touchableText}> Admin Zone </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable} onPress={handleLogout}>
                <Text style={styles.touchableText}> Log Out </Text>
            </TouchableOpacity>
            </View>
    </ScrollView>
    )
}

export default ProfileScreenComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: Colors.colors.LIGHT_GREY,
    },

    touchables: {
    },

    touchableText: {
        fontFamily: 'rubik-medium',
        fontSize: 15
    },

    touchable: {
        width: setWidth(88),
        borderRadius: 10,
        padding: 20,
        backgroundColor: Colors.colors.SECONDARY_WHITE,
        shadowColor: "#151515",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 18,
        elevation: 12,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "center",
        alignContent: "center",
        position: "relative",
        top: set(400),
        marginBottom: 20

    },

    detailsBelowFullNameContainer: {

    },

    gapText: {
        width: setWidth(2)
    },

    userDetails: {

        bottom: setHeight(10),
        minWidth: setWidth(60),
        marginLeft: "5%",
        marginTop: "5%"
    },

    fullNameContainer: {
        height: setHeight(4),
        marginBottom: 5,
        marginTop: 15
    },

    fullNameText: {
        fontSize: 30,
        fontFamily: 'rubik-bold'

    },

    userNameContainer: {
        minWidth: '100%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        alignContent: 'center',
        marginBottom: 10
    },

    userNameLabel: {
    },

    userName: {

    },

    userNameText: {
        fontSize: 17,
        fontFamily: 'rubik-Regular'
    },
    userNameLabelText: {
        fontSize: 17,
        fontFamily: 'rubik-Regular'
    },

    contactNumberText: {
        fontSize: 15,

        fontFamily: 'rubik-Regular'
    },

    contactNumber: {

    },

gap: {
},
    profileContainer: {
        position: "absolute",
        marginTop: setHeight(15),
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center",
    },


    primaryDetailsCard: {
        width: setWidth(88),
        borderRadius: 18,
        padding: 20,
        paddingBottom: 0,
        backgroundColor: Colors.colors.SECONDARY_WHITE,
        shadowColor: "#151515",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 18,
        elevation: 12,
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        alignContent: "center",
        position: "relative",

    },

    profilePicture: {
        height: '50%',
        width: "30%",
        borderStyle: "solid",

        position: "relative",
        top: -80,
        borderRadius: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems:"center",
        shadowColor: "#151515",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: .5,
        shadowRadius: 5,
        elevation: 12,
    },

    profilePictureImage: {
        width: setWidth(60),
        height: '95%',
        resizeMode: 'contain',
        borderRadius: "100%",
    },


})


