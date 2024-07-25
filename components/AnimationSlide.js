import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

const AnimatedSlide = ({ children }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const smokeAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: -1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
            ]),
        );

        smokeAnimation.start();

        return () => {
            smokeAnimation.stop();
        };
    }, [animatedValue]);

    const translateX = animatedValue.interpolate({
        inputRange: [-1, 1],
        outputRange: [-30, 30], // Adjust this value based on the desired sliding distance
    });

    return (
        <View>
            <Animated.View style={{ transform: [{ translateX }] }}>
                {children}
            </Animated.View>
        </View>
    );
};

export default AnimatedSlide;
