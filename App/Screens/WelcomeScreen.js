import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import WelcomeContents from "../../components/WelcomeContent";
import WelcomeCard from "../../components/WelcomeCard";
import {setWidth} from "../../utils/Display";
import {useFonts} from "expo-font";
import {useRef, useState} from "react";
import {Colors} from "../../constants/Colors";
import * as SecureStore from 'expo-secure-store';
import StorageService from "../../services/StorageService";
import {useDispatch} from "react-redux";
import {setIsFirstTimeUse} from "../../src/actions/GeneralAction";


const pageIndicatorColor = (isActive) => isActive ? styles.page : {...styles.page, backgroundColor: Colors.colors.DEFAULT_GREY}
const Pagination = ({index}) => {
    return (
        <View style={styles.pageContainer}>
            {[...Array(WelcomeContents.length).keys()].map((_,i) =>
                i === index ? (<View style={pageIndicatorColor(true)} key={i}/>) : (<View style={pageIndicatorColor(false)} key={i}/>)
            )}


        </View>
    )
}

async function a(){
    const existingToken = await SecureStore.getItemAsync('token');
    console.log('secure store token welcome:', existingToken);
}

function renderWelcomeCard(itemData){

    return <WelcomeCard {...itemData.item} />
}
function WelcomeScreen({navigation}) {


    const [welcomeListIndex, setWelcomeListIndex] = useState(0);  // setting index to each page
    const welcomeList = useRef();
    const onViewRef = useRef(({changed}) => {  // changed is the page to which we have changed
        setWelcomeListIndex(changed[0].index); // sets the value of welcome list index to the page

    })
    const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50}); // how much sliding is required to move to next page, here after sliding 50% of current page
    const nextPage = () => {
        welcomeList.current.scrollToIndex({
            index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex
        })
    }

    const dispatch = useDispatch()

    const navigate = () => {
        StorageService.setFirstTimeUse().then(() => {
            dispatch(setIsFirstTimeUse())
        })

    }
    const skipPage = () => {
        welcomeList.current.scrollToEnd()
    }
    function getStartedPressHandler(){
        navigate();
    }




return(
    <View style={styles.container}>
       <StatusBar
           barStyle={"light-content"}
           translucent={true}
       />
    <View style={styles.welcomeListContainer}>
        <FlatList
            ref={welcomeList}
            data={WelcomeContents}
            keyExtractor={(item) => item.title}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderWelcomeCard}
            pagingEnabled={true} // converts each element to a page
            overScrollMode={'never'} //remove shadows when scrolling on either side of screen
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewRef.current}
        />



    </View>
        <Pagination index={welcomeListIndex}/>
        { welcomeListIndex === 2 ? (
            <TouchableOpacity
                style={styles.gettingStartedButton}
                onPress={() => navigate()}
            >
                <Text style={styles.gettingStartedText}>Get Started</Text>
            </TouchableOpacity>) : (
        <View style={styles.navigationButtonsContainer}>
            <TouchableOpacity style={styles.skipButton} onPress={skipPage}>
                <Text style={styles.skipText}>SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={nextPage}>
                <Text style={styles.nextText}>NEXT</Text>
            </TouchableOpacity>
        </View>)}
    </View>
)
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.DEFAULT_WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100
    },

    gettingStartedButton: {
        backgroundColor: Colors.colors.DEFAULT_GREEN,
        bottom: "10%",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 7,
        alignItems:"center",
        justifyContent: "center",
        elevation: 2,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 6,
    },
    gettingStartedText: {
        fontFamily: "rubik-medium",
        fontSize: 20,
        color: "white"
    },

    welcomeListContainer: {
        backgroundColor: Colors.colors.DEFAULT_WHITE,
    },

    page: {
        height: 8,
        width: 14,
        backgroundColor: Colors.colors.DEFAULT_GREEN,
        borderRadius: 10,
        marginHorizontal: 5,

        bottom: "40%"

    },

    pageContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: "20%"

    },

    navigationButtonsContainer: {
        bottom: "20%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 35,
        width: setWidth(90),

    },

    nextButton:{
        backgroundColor: "rgba(12,71,77,0.26)",
        padding: 20,
        borderRadius: 50
    },

    skipButton:{
        padding: 20,
        borderRadius: 50,
    },

    nextText:{
        // fontFamily: 'rubik-bold'
    },
    skipText:{
        // fontFamily: 'rubik-Regular',
        color: Colors.colors.INACTIVE_GREY
    },
});
