import {useDispatch, useSelector} from "react-redux";
import {removeUserToken} from "../../services/StorageService";
import {removeToken} from "../../src/actions/GeneralAction";
import {Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Colors} from "../../constants/Colors";
import {setHeight, setWidth} from "../../utils/Display";
import {useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Ionicons} from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';


function EditProfileScreen({navigation}) {

    const dispatch = useDispatch()

    const userData = useSelector(state => state.generalState.userData);
    let userInfo;
    if(userData){
        userInfo = userData.user
    }
    const fullName = (firstName, lastName) => {
        if(firstName && lastName){
            return (firstName.slice(0,1).toUpperCase() + firstName.slice(1) + " " + lastName.slice(0,1).toUpperCase() + lastName.slice(1) )
        }else if(firstName){
            return (firstName.slice(0,1).toUpperCase() + firstName.slice(1))
        }else{
            return (lastName.slice(0,1).toUpperCase() + lastName.slice(1))
        }
    }

    const pickImage = async () => {
        // Request permission to access media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access media library is required!");
            return;
        }

        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };
    const [isFocusedUser, setIsFocusedUser] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [mail, setMail] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const removeImage = () => {
        setImageUri(null);
    };

    const handleFocusUser = () => {
        setIsFocusedUser(true);
    };
    const handleBlurUser = () => {
        setIsFocusedUser(false);
    };

    console.log("user===>", userData)
    console.log("userInfo===>", userInfo)
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.primaryDetailsCard}>
                    {imageUri ? (
                        <TouchableOpacity onPress={removeImage} style={styles.removeImage}>
                            <FontAwesome name="remove" size={24} color="red" />
                        </TouchableOpacity>
                    ) : ('')}

                    <View style={styles.profilePicture}>


                        {imageUri ? (
                            <>
                            <Image source={{ uri: imageUri }} style={styles.profilePictureImage} />
                            </>
                        ) : (
                            <TouchableOpacity onPress={pickImage} style={styles.profilePictureImageAdd}>
                                <Ionicons name="add-circle-outline" size={44} color="blue" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.userDetails}>



                        {/*username*/}
                        <View style={styles.detailsBelowFullNameContainer}>


                            <View style={styles.userNameContainer}>
                                <View style={styles.userNameLabel}>
                                    <Text style={styles.userNameLabelText}>First Name</Text>
                                </View>
                                <View style={styles.gap}>
                                    <Text style={styles.gapText}></Text>
                                </View>
                                <View style={isFocusedUser ? styles.usernameInputShadow : styles.usernameInput}>
                                    <TextInput style={styles.userNameTextInput}
                                               keyboardAppearance={"dark"}
                                               value={userInfo ? fullName(userInfo.first_name) : ''}
                                               onFocus={handleFocusUser}
                                               onBlur={handleBlurUser}
                                               onChangeText={(text) => {
                                                   setFirstName(text)
                                               }}
                                    >
                                    </TextInput>

                                </View>
                            </View>

                            <View style={styles.userNameContainer}>
                                <View style={styles.userNameLabel}>
                                    <Text style={styles.userNameLabelText}>Last Name</Text>
                                </View>
                                <View style={styles.gap}>
                                    <Text style={styles.gapText}></Text>
                                </View>
                                <View style={isFocusedUser ? styles.usernameInputShadow : styles.usernameInput}>
                                    <TextInput style={styles.userNameTextInput}
                                               keyboardAppearance={"dark"}
                                               value={userInfo ? fullName(userInfo.last_name) : ''}
                                               onFocus={handleFocusUser}
                                               onBlur={handleBlurUser}
                                               onChangeText={(text) => {
                                                   setLastName(text)
                                               }}
                                    >
                                    </TextInput>

                                </View>
                            </View>

                            <View style={styles.userNameContainer}>
                                <View style={styles.userNameLabel}>
                                    <Text style={styles.userNameLabelText}>User Name</Text>
                                </View>
                                <View style={styles.gap}>
                                    <Text style={styles.gapText}></Text>
                                </View>
                                <View style={isFocusedUser ? styles.usernameInputShadow : styles.usernameInput}>
                                    <TextInput style={styles.userNameTextInput}
                                               keyboardAppearance={"dark"}
                                               value={userInfo ? (userInfo.username) : ''}
                                               onFocus={handleFocusUser}
                                               onBlur={handleBlurUser}
                                               onChangeText={(text) => {
                                                   setUserName(text)
                                               }}
                                    >
                                    </TextInput>

                                </View>
                            </View>

                            {/*//email*/}

                            <View style={styles.userNameContainer}>
                                <View style={styles.userNameLabel}>
                                    <Text style={styles.userNameLabelText}>Mail</Text>
                                </View>
                                <View style={styles.gap}>
                                    <Text style={styles.gapText}></Text>
                                </View>
                                <View style={isFocusedUser ? styles.usernameInputShadow : styles.usernameInput}>
                                    <TextInput style={styles.userNameTextInput}
                                               keyboardAppearance={"dark"}
                                               value={userInfo ? (userInfo.email) : ''}
                                               onFocus={handleFocusUser}
                                               onBlur={handleBlurUser}
                                               onChangeText={(text) => {
                                                   setMail(text)
                                               }}
                                    >
                                    </TextInput>

                                </View>
                            </View>


                            {/*phone number can be added her but it will require the otp verification*/}
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.touchables}>
                <TouchableOpacity style={styles.touchable}>
                    <Text style={styles.touchableText}> Save </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchable} onPress={() => navigation.goBack()}>
                    <Text style={styles.touchableText}> Leave </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: Colors.colors.DARK_FIVE,
        minWidth: '100%',
        flexDirection: "column"

    },

    removeImage: {
        position: "absolute",
        zIndex: 2,
        top: setHeight(1),
        right: setWidth(25)
    },
    usernameInput: {
        width: '70%',

        height: setHeight(4.4),
        borderRadius: 5,
        backgroundColor: Colors.colors.DEFAULT_WHITE,
        padding: 10,

        justifyContent: "space-between",
        flexDirection: "row"
    },
    usernameInputShadow: {
        width: '70%',

        height: setHeight(4.4),
        borderRadius: 5,
        backgroundColor: Colors.colors.DEFAULT_WHITE,
        padding: 10,

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
        marginBottom: 20

    },

    detailsBelowFullNameContainer: {

    },

    gapText: {
        width: setWidth(2)
    },

    userDetails: {

        bottom: setHeight(5),
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
        fontFamily: 'rubik-Regular',
        width: setWidth(20)
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
        position: "relative",
        marginTop: setHeight(10),
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
        alignItems: "center",
        alignContent: "center",
        position: "relative",
    },

    profilePicture: {
        height: '33%',
        width: '45%',
        justifyContent: "center",
        alignContent: "center",
        alignItems:"center",
        position: "relative",
        borderRadius: 100,
        top: 0,
        marginBottom: 70,
        overflow: "hidden",

    },

    profilePictureImage: {
        width: setWidth(130),
        height: '95%',
        resizeMode: 'contain',
    },
    profilePictureImageAdd: {
    },


})