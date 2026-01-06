import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
    FadeIn,
    FadeInDown,
} from 'react-native-reanimated';

interface FadeInViewProps {
    children: React.ReactNode;
    delay?: number;
    style?: ViewStyle;
}

export function FadeInView({ children, delay = 0, style }: FadeInViewProps) {
    return (
        <Animated.View
            entering={FadeInDown.delay(delay).springify()}
            style={style}
        >
            {children}
        </Animated.View>
    );
}
