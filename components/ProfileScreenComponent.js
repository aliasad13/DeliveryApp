import {Text, View, TouchableOpacity, StyleSheet, Image,} from 'react-native';
import {Colors} from "../constants/Colors";
import {setHeight, setWidth} from "../utils/Display";
import {AntDesign, Feather} from "@expo/vector-icons";

function ProfileScreenComponent() {
    return(
        <View style={styles.container}>
            <View style={styles.profileContainer}>
               <View style={styles.primaryDetailsCard}>
                   <View style={styles.profilePicture}>
                       <Image source={require('../assets/images/profileAvatar.png')} style={styles.profilePictureImage}/>
                   </View>
                   <View style={styles.userDetails}>
                       <View style={styles.fullNameContainer}>
                           <Text style={styles.fullNameText}>Enzo Fernandez</Text>
                       </View>
                       <View style={styles.detailsBelowFullNameContainer}>
                       <View style={styles.userNameContainer}>
                           <View style={styles.userNameLabel}>
                               <Text style={styles.userNameLabelText}><AntDesign name="user" size={24} color="#B6AE81FF" style={styles.userIcon}/></Text>
                           </View>
                           <View style={styles.gap}>
                               <Text style={styles.gapText}></Text>
                           </View>
                           <View style={styles.userName}>
                               <Text style={styles.userNameText}>enzof@32</Text>
                           </View>
                       </View>

                       <View style={styles.userNameContainer}>
                           <View style={styles.userNameLabel}>
                               <Text style={styles.userNameLabelText}><AntDesign name="mail" size={24} color="#B6AE81FF" /></Text>
                           </View>
                           <View style={styles.gap}>
                               <Text style={styles.gapText}> </Text>
                           </View>
                           <View style={styles.userName}>
                               <Text style={styles.userNameText}>aliasadmshah@gmail.com@32</Text>
                           </View>
                       </View>

                       <View style={styles.userNameContainer}>
                           <View style={styles.userNameLabel}>
                               <Text style={styles.userNameLabelText}><Feather name="phone" size={24} color="#B6AE81FF" /></Text>
                           </View>
                           <View style={styles.gap}>
                               <Text style={styles.gapText}></Text>
                           </View>
                           <View style={styles.userName}>
                               <Text style={styles.userNameText}>9895054910</Text>
                           </View>
                       </View>
                       </View>
                   </View>
               </View>
            </View>
        </View>
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

    detailsBelowFullNameContainer: {

    },

    gapText: {
        width: setWidth(2)
    },

    userDetails: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
        bottom: setHeight(11),
        minWidth: setWidth(60),
        marginLeft: "10%",
        marginTop: "5%"
    },

    fullNameContainer: {
        height: setHeight(3),
        marginBottom: 10
    },

    fullNameText: {
        fontSize: 30,
        fontFamily: 'rubik-medium'

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
        marginTop: setHeight(12),
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center"
    },


    primaryDetailsCard: {
        width: setWidth(88),
        minHeight: setHeight(44),
        borderRadius: 18,
        padding: 20,
        backgroundColor: Colors.colors.SECONDARY_WHITE,
        shadowColor: "#151515",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 18,
        elevation: 12,
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        alignContent: "center"

    },

    profilePicture: {
        height: '55%',
        width: "60%",
        borderStyle: "solid",

        position: "relative",
        top: -100,
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


