import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import React from "react";

export default {
    TODAY: (size, color) => <Ionicons name="fast-food-outline" size={size} color={color} />,
    CATEGORIES: (size, color) => <Entypo name="documents" size={size} color={color} />,
    HOME: (size, color) => <Ionicons name="home-outline" size={size} color={color} />,
    CART: (size, color) => <AntDesign name="shoppingcart" size={size} color={color} />,
    USER: (size, color) => <AntDesign name="user" size={size} color={color} />
};
// export default {
//     INDIAN: require('../assets/images/categoryImages/indian.png'),
//     CHINESE: require('../assets/images/categoryImages/chinese.png'),
//     ARABIC: require('../assets/images/categoryImages/arabic.png'),
//     ITALIAN: require('../assets/images/categoryImages/pizza.png'),
//     OTHER: require('../assets/images/categoryImages/other.png'),
//     BREAD: require('../assets/images/categoryImages/bread.png')
// }