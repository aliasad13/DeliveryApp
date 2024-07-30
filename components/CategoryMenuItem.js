import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CategoryImages from "../constants/CategoryImages";
import {Colors} from "../constants/Colors";


function CategoryMenuItem({name, logo, activeCategory, setActiveCategory}) {
    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    console.log("==========================++++===+++=======>", CategoryImages[logo] )
    console.log("==========================++++===+++=======>", setActiveCategory)
    const isActive = activeCategory === name;
    return(
        <TouchableOpacity style={styles.category()} key={name} onPress={() => setActiveCategory(name)}>
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
        marginTop: 5,
        opacity: isActive ? 1 : 0.8,

        elevation: 2,
    }),

    categoryIcon:(isActive) => ({
        marginTop: 5,
        shadowColor: isActive ? "#f6cc6e" : 'none',
            shadowOffset: {width: 0, height: 0},
        shadowOpacity:  isActive ? 0.5 : 0,
            shadowRadius: isActive ? 4 : 0,
    })


})