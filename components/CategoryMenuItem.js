import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import CategoryImages from "../constants/CategoryImages";
import {Colors} from "../constants/Colors";


function CategoryMenuItem({name, logo, activeCategory, setActiveCategory}) {
    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    console.log("==========================++++===+++=======>", activeCategory)
    console.log("==========================++++===+++=======>", setActiveCategory)
    return(
        <TouchableOpacity style={styles.category()} key={name} onPress={() => setActiveCategory(name)}>
          <Image source={CategoryImages[logo]} style={styles.categoryIcon(activeCategory === name)}/>
            <Text style={styles.categoryText(activeCategory === name)}>
                {capitalizeFirstLetter(name)}
            </Text>
        </TouchableOpacity>
    )
}

export default CategoryMenuItem;

const styles = StyleSheet.create({
    category: (marginTop = 0) => ({
        alignItems: 'center',
        marginTop,
    }),

    categoryText: (isActive) => ({
        fontFamily: 'rubik-Regular',
        fontSize: 14,
        lineHeight: 10 * 1.4,
        color: '#ffffff',
        marginTop: 5,
        opacity: isActive ? 1 : 0.8
    }),

    categoryIcon: (isActive) => ({
        marginTop: 5,
        height: isActive ? 43 : 30,
        width: isActive ? 43 : 30,
        opacity: isActive ? 1 : .8,
        color: '#B6AE81FF'
    })


})