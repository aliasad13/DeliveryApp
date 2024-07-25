import {View, StyleSheet, Text, SafeAreaView, Image} from "react-native";
import {setHeight, setWidth} from "../utils/Display";
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3629288997.
import WelcomeCardImages from "../components/WelcomeImages";
import AnimatedSlide from "./AnimationSlide";

function WelcomeCard({image, title, content}) {

return(
    <SafeAreaView style={styles.container} >
        <View>
            <AnimatedSlide>
            <Image source={WelcomeCardImages[image]} style={styles.image}/>
            </AnimatedSlide>
        </View>
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
        <View >
            <Text style={styles.content}>{content}</Text>
        </View>
    </SafeAreaView>
)
}
export default WelcomeCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: setWidth(100),

    },

    image: {
        width: setWidth(80),
        height: setHeight(30),
        resizeMode: "contain"
    },

    title: {
        fontFamily: 'rubik-bold',
        fontSize: 25,
        marginVertical: 20,
        textAlign: 'center', // Center-align the text
    },

    content: {
        fontFamily: 'rubik-Regular',
        fontSize: 19,
        textAlign: 'center',
        marginHorizontal: 20
    },

    
});
