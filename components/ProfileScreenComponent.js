import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Modal,
    TextInput,
    Button,
    Alert, ActivityIndicator,
} from 'react-native';
import {Colors} from "../constants/Colors";
import {setHeight, setWidth} from "../utils/Display";
import {AntDesign, Entypo, Feather} from "@expo/vector-icons";
import {useDispatch, useSelector} from 'react-redux';
import {
    changePassword,
    getUserData,
    sendMailVerificationOtp,
    updateEmail,
    updateFullName,
    updateUsername, updateUserProfile, updateUserProfilePic
} from "../utils/https";
import FormattedDate from "./FormattedDate";
import {set} from "lodash/object";
import {removeUserToken} from "../services/StorageService";
import {removeToken, setUserData} from "../src/actions/GeneralAction";
import {useNavigation} from "@react-navigation/native";
import EditProfileScreen from "../App/Screens/EditProfileScreen";
import {useEffect, useState} from "react";
import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import AWS from 'aws-sdk';
import FastImage from 'react-native-fast-image';
import ImageResizer from 'react-native-image-resizer';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import * as Asset from 'expo-asset';

function ProfileScreenComponent() {

    const dispatch = useDispatch();

    const userData = useSelector(state => state.generalState.userData);
    const userInfo = userData?.user;
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

    const [modalVisible, setModalVisible] = useState(false);
    const [newFirstName, setNewFirstName] = useState(userInfo ? userInfo.first_name : '');
    const [newLastName, setNewLastName] = useState(userInfo ? userInfo.last_name : '');
    const [usernameModalVisible, setUsernameModalVisible] = useState(false);
    const [newUsername, setNewUsername] = useState(userInfo ? userInfo.username : '');
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [newEmail, setNewEmail] = useState(userInfo ? userInfo.email : '');
    const [otp, setOtp] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profileImage, setProfileImage] = useState(userInfo?.profile_picture || require('../assets/images/profileAvatar.png'));
    const [loading, setLoading] = useState(false);
    const [cachedImage, setCachedImage] = useState(null);

    const handleFullNameSave = async () => {

        try {
            const response = await updateFullName(userInfo.id, newFirstName, newLastName)
            if (response) {
                dispatch(setUserData({
                    ...userData,
                    user: {
                        ...userInfo,
                        first_name: newFirstName,
                        last_name: newLastName
                    }
                }))
            }
            Toast.show('Name has been updated successfully', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
        }catch (error) {
            console.error('Error setting full name:', error);
            Toast.show('Error updating name. Please try again.', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: 'red',
            });
        }
        setModalVisible(false);

    };

    const handleUsernameSave = async () => {
        try {
            const response = await updateUsername(userInfo.id, newUsername);
            if (response) {
                dispatch(setUserData({
                    ...userData,
                    user: {
                        ...userInfo,
                        username: newUsername
                    }
                }));
                Toast.show('Username has been updated successfully', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
            }
        } catch (error) {
            console.error('Error updating username:', error);
            Toast.show('Error updating username. Please try again.', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: 'red',
            });
        }
        setUsernameModalVisible(false);
    };

    const handleGetOtp = async () => {
        try {
            const response = await sendMailVerificationOtp(userInfo.id, newEmail);
            if (response) {
                Toast.show('OTP sent successfully', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
                setEmailModalVisible(false);
                setOtpModalVisible(true);
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            Toast.show('Error sending OTP. Please try again.', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: 'red',
            });
        }
    };

    const handleVerifyEmail = async () => {
        try {
            const response = await updateEmail(userInfo.id, newEmail, otp);
            if (response) {
                dispatch(setUserData({
                    ...userData,
                    user: {
                        ...userInfo,
                        email: newEmail
                    }
                }));
                Toast.show('Email has been updated successfully', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
                setOtpModalVisible(false);
            }
        } catch (error) {
            console.error('Error updating email:', error);
            Toast.show('Error updating email. Please try again.', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: 'red',
            });
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Toast.show('New password and confirm password do not match.', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                backgroundColor: 'red',
            });
            return;
        }

        try {
            const response = await changePassword(userInfo.id, currentPassword, newPassword);
            if (response) {
                Toast.show('Password has been updated successfully', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                });
                setPasswordModalVisible(false);
            }
        } catch (error) {
            console.error('Error updating password:', error);
            Toast.show('Error updating password. Please try again.', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                backgroundColor: 'red',
            });
        }
    };


    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const compressedImage = await manipulateAsync(
                result.assets[0].uri,
                [{ resize: { width: 800, height: 800 } }],
                { compress: 0.5, format: SaveFormat.JPEG }
            );

            // Show confirmation dialog
            Alert.alert(
                "Upload Profile Picture",
                "Are you sure you want to upload this image as your profile picture?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "OK",
                        onPress: () => {
                            setProfileImage({ uri: compressedImage.uri });
                            uploadProfilePicture(compressedImage.uri);
                        }
                    }
                ]
            );
        }
    };

    AWS.config.update({
        accessKeyId: 'AKIA2UC3FMEYFQ7HZAH2',
        secretAccessKey: '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',
        region: 'eu-north-1'
    });
    const s3 = new AWS.S3();

    const uploadProfilePicture = async (imageUri) => {
        setLoading(true);
        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();

            const fileName = `profile-${Date.now()}.jpg`;

            const params = {
                Bucket: 'blue.bucket',
                Key: fileName,
                Body: blob,
                ContentType: 'image/jpeg'};

            const uploadResult = await s3.upload(params).promise();
            const newImageUrl = uploadResult.Location;

            const data = await updateUserProfilePic(userInfo.id, { profile_picture: { uri: newImageUrl } });
            dispatch(setUserData({
                ...userData,
                user: {
                    ...userInfo,
                    profile_picture: newImageUrl
                }
            }));
            cacheImage(newImageUrl);

            setProfileImage({ uri: newImageUrl });

            Toast.show('Profile picture updated successfully', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
            });
            setLoading(false);
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            Toast.show('Error updating profile picture. Please try again.', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                backgroundColor: 'red',
            });
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        if (typeof profileImage === 'string') {
            setProfileImage({ uri: userInfo?.profile_picture })
            cacheImage(profileImage);
        }
    }, [profileImage]);

    const cacheImage = async (uri) => {
        try {
            const cacheDir = FileSystem.cacheDirectory;
            const fileName = uri.split('/').pop();
            const fileUri = `${cacheDir}${fileName}`;

            const imageExists = await FileSystem.getInfoAsync(fileUri);

            if (!imageExists.exists) {
                await FileSystem.downloadAsync(uri, fileUri);
            }

            setCachedImage(fileUri);
        } catch (error) {
            console.error('Error caching image:', error);
        }
    };



    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileContainer}>
               <View style={styles.primaryDetailsCard}>
                   <TouchableOpacity style={styles.editButtonProfilePic} onPress={pickImage}>
                       <Entypo name="edit" size={17} color="#4A61A8" />
                   </TouchableOpacity>
                   <View style={styles.profilePicture}>

                       <Image
                           style={styles.profilePictureImage}
                           source={{
                               uri: cachedImage || profileImage.uri || profileImage,
                           }}
                           onLoadStart={() => setLoading(true)}
                           onLoadEnd={() => setLoading(false)}
                           onError={(e) => {
                           }}
                       />

                   </View>
                   {loading && <ActivityIndicator size="large" color="#0000ff" />}
                   <View style={styles.userDetails}>

                       <View style={styles.fullNameContainer}>
                           <Text style={styles.fullNameText}>{userInfo ? fullName(userInfo.first_name, userInfo.last_name) : ''}</Text>
                           <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                               <Entypo name="edit" size={17} color="#4A61A8" />
                           </TouchableOpacity>
                       </View>

                       <Modal
                           transparent={true}
                           animationType="fade"
                           visible={modalVisible}
                           onRequestClose={() => setModalVisible(false)}
                       >
                           <View style={styles.modalOverlay}>
                               <View style={styles.modalContent}>
                                   <Text style={styles.modalTitle}>Edit Name</Text>
                                   <TextInput
                                       style={styles.modalInput}
                                       placeholder="First Name"
                                       value={newFirstName}
                                       onChangeText={setNewFirstName}
                                   />
                                   <TextInput
                                       style={styles.modalInput}
                                       placeholder="Last Name"
                                       value={newLastName}
                                       onChangeText={setNewLastName}
                                   />
                                   <View style={styles.modalButtons}>
                                       <Button title="Cancel" onPress={handleCancel} />
                                       <Button title="Save" onPress={handleFullNameSave} />
                                   </View>
                               </View>
                           </View>
                       </Modal>

                       <View style={styles.detailsBelowFullNameContainer}>

                       {/*username*/}
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
                           <TouchableOpacity style={styles.editButton} onPress={() => setUsernameModalVisible(true)}>
                               <Entypo name="edit" size={17} color="#4A61A8" />
                           </TouchableOpacity>
                       </View>

                           <Modal
                               transparent={true}
                               animationType="fade"
                               visible={usernameModalVisible}
                               onRequestClose={() => setUsernameModalVisible(false)}
                           >
                               <View style={styles.modalOverlay}>
                                   <View style={styles.modalContent}>
                                       <Text style={styles.modalTitle}>Edit Username</Text>
                                       <TextInput
                                           style={styles.modalInput}
                                           placeholder="Username"
                                           value={newUsername}
                                           onChangeText={setNewUsername}
                                       />
                                       <View style={styles.modalButtons}>
                                           <Button title="Cancel" onPress={() => setUsernameModalVisible(false)} />
                                           <Button title="Save" onPress={handleUsernameSave} />
                                       </View>
                                   </View>
                               </View>
                           </Modal>


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
                           <TouchableOpacity style={styles.editButton} onPress={() => setEmailModalVisible(true)}>
                               <Entypo name="edit" size={17} color="#4A61A8" />
                           </TouchableOpacity>
                       </View>
                           <Modal
                               transparent={true}
                               visible={emailModalVisible}
                               onRequestClose={() => setEmailModalVisible(false)}
                           >
                               <View style={styles.modalOverlay}>
                                   <View style={styles.modalContent}>
                                       <Text style={styles.modalTitle}>Edit Email</Text>
                                       <TextInput
                                           style={styles.modalInput}
                                           placeholder="Email"
                                           value={newEmail}
                                           onChangeText={setNewEmail}
                                           keyboardType="email-address"
                                       />
                                       <View style={styles.modalButtons}>
                                           <Button title="Cancel" onPress={() => setEmailModalVisible(false)} />
                                           <Button title="Get OTP" onPress={handleGetOtp} />
                                       </View>
                                   </View>
                               </View>
                           </Modal>

                           <Modal
                               transparent={true}
                               visible={otpModalVisible}
                               onRequestClose={() => setOtpModalVisible(false)}
                           >
                               <View style={styles.modalOverlay}>
                                   <View style={styles.modalContent}>
                                       <Text style={styles.modalTitle}>Verify Email</Text>
                                       <TextInput
                                           style={styles.modalInput}
                                           placeholder="Enter OTP"
                                           placeholderTextColor="#999"
                                           value={otp}
                                           onChangeText={setOtp}
                                           keyboardType="numeric"
                                       />
                                       <View style={styles.modalButtons}>
                                           <Button title="Cancel" onPress={() => setOtpModalVisible(false)} />
                                           <Button title="Verify Email" onPress={handleVerifyEmail} />
                                       </View>
                                   </View>
                               </View>
                           </Modal>




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

                <View style={styles.passwordChangeContainer}>
                    <TouchableOpacity onPress={() => setPasswordModalVisible(true)} style={styles.touchable}>
                        <Text style={styles.touchableText}>Change Password</Text>
                    </TouchableOpacity>

                    <Modal
                        transparent={true}
                        animationType="fade"
                        visible={passwordModalVisible}
                        onRequestClose={() => setPasswordModalVisible(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Change Password</Text>
                                <View style={styles.passwordInputContainer}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        placeholder="Current Password"
                                        placeholderTextColor="#999"
                                        secureTextEntry={!showCurrentPassword}
                                        value={currentPassword}
                                        onChangeText={setCurrentPassword}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeButton}
                                        onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                        <Feather
                                            name={showCurrentPassword ? "eye" : "eye-off"}
                                            size={24}
                                            color="#4A61A8"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.passwordInputContainer}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        placeholder="New Password"
                                        placeholderTextColor="#999"
                                        secureTextEntry={!showNewPassword}
                                        value={newPassword}
                                        onChangeText={setNewPassword}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeButton}
                                        onPress={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        <Feather
                                            name={showNewPassword ? "eye" : "eye-off"}
                                            size={24}
                                            color="#4A61A8"
                                        />
                                    </TouchableOpacity>
                                </View>


                                <View style={styles.passwordInputContainer}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        placeholder="Confirm New Password"
                                        placeholderTextColor="#999"
                                        secureTextEntry={!showConfirmPassword}
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeButton}
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <Feather
                                            name={showConfirmPassword ? "eye" : "eye-off"}
                                            size={24}
                                            color="#4A61A8"
                                        />
                                    </TouchableOpacity>
                                </View>


                                <View style={styles.modalButtons}>
                                    <Button title="Cancel" onPress={() => setPasswordModalVisible(false)} />
                                    <Button title="Save" onPress={handleChangePassword} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
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
        backgroundColor: Colors.colors.DARK_FIVE,
    },


    editButtonProfilePic: {
        position: 'absolute',
        left: '30%',
        zIndex:50,
        top: '13%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 5,
        shadowColor: "#151515",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 18,
    },

    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    passwordInput: {
        flex: 1,
        padding: 10,
    },
    eyeButton: {
        padding: 10,
    },


    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },


    touchables: {
        position: "relative",
        bottom: setHeight(7)
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
        marginBottom: 10
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
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
    },

    editButton: {
        marginLeft: 10
    },

    fullNameText: {
        fontSize: 30,
        fontFamily: 'rubik-bold',


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
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center",
        height: setHeight(50)
    },


    primaryDetailsCard: {
        height: setHeight(30),
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


    },

    profilePicture: {
        height: '45%',
        width: "33%",
        borderStyle: "solid",
        overflow: "hidden",

        position: "relative",
        top: -80,
        borderRadius: "100%",
        flexDirection: "row",
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
        overflow: "hidden"
    },


})


