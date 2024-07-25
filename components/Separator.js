import React from 'react';
import { Platform, View } from 'react-native';

// warning support for default props will be removed from function components in a future major release. use javascript default parameters instead
// const Separator = ({height, width, ...extraProps}) => (
//     <View style={{height, width, ...extraProps}} />
// );


const Separator = ({ height = Platform.OS === 'ios' ? 20 : 12, width = Platform.OS === 'ios' ? 20 : 12, ...extraProps }) => (
    <View style={{ height, width, ...extraProps }} />
);

export default Separator;
