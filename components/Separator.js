import React from 'react';
import {Platform, View} from 'react-native';

const Separator = ({height, width, ...extraProps}) => (
    <View style={{height, width, ...extraProps}} />
);

Separator.defaultProps = {

    height:  Platform.OS == "ios" ? 20 : 12,
    width:  Platform.OS == "ios" ? 20 : 12,
};

export default Separator;