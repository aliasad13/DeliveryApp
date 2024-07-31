import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CategoryImages from "../constants/CategoryImages";
import {Colors} from "../constants/Colors";
import {setScreen} from "../src/actions/GeneralAction";
import {useDispatch} from "react-redux";


function CategoryMenuItem({name, logo, activeCategory, setActiveCategory}) {
    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const isActive = activeCategory === name;

    const dispatch = useDispatch();
    const handleScreenPress = () => {
        const formattedName = name.toLowerCase().trim();
        // name = '  Cart', formatted_name => name in state => "cart"
        setActiveCategory(name);
        dispatch(setScreen(formattedName));

    };

    return(
        <TouchableOpacity style={styles.category()} key={name} onPress={handleScreenPress}>
            <View style={styles.categoryIcon(activeCategory === name)}>
                <Text>{CategoryImages[logo](isActive ? 40 : 28, isActive ? Colors.colors.DEFAULT_YELLOW : '#B6AE81FF')}</Text>
            </View>
            <Text style={styles.categoryText(activeCategory === name)}>
                {capitalizeFirstLetter(name)}
            </Text>
        </TouchableOpacity>
    )
}

export default CategoryMenuItem;

const styles = StyleSheet.create({
    category: (isActive) => ({
        alignItems: 'center',
        height: isActive ? 41 : 35,
        width: isActive ? 70 : 65,
        marginTop: 0,
    }),

    categoryText: (isActive) => ({
        fontFamily: 'rubik-Regular',
        color: '#ffffff',
        marginTop: 3,
        opacity: isActive ? 1 : 0.8,

        elevation: 2,
    }),

    categoryIcon:(isActive) => ({
        marginTop: 0,
        shadowColor: isActive ? Colors.colors.DEFAULT_YELLOW : 'none',
            shadowOffset: {width: 0, height: 0},
        shadowOpacity:  isActive ? 0.5 : 0,
            shadowRadius: isActive ? 14 : 0,
    })


})