import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    padding?: keyof typeof Layout.spacing;
    variant?: 'default' | 'glass' | 'outline';
    shadow?: keyof typeof Layout.shadows;
}

export function Card({
    children,
    style,
    padding = 'md',
    variant = 'default',
    shadow = 'md',
}: CardProps) {
    const getCardStyle = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            borderRadius: Layout.borderRadius.lg,
            backgroundColor: variant === 'glass' ? Colors.background.glass : Colors.background.primary,
            borderWidth: 1,
            borderColor: variant === 'outline' ? Colors.border.DEFAULT : Colors.border.light,
            ...Layout.shadows[shadow],
        };

        if (variant === 'outline') {
            baseStyle.shadowOpacity = 0;
            baseStyle.elevation = 0;
        }

        return baseStyle;
    };

    return (
        <View
            style={[
                getCardStyle(),
                { padding: Layout.spacing[padding] },
                style,
            ]}
        >
            {children}
        </View>
    );
}

