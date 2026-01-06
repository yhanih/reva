import React, { useRef } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    Animated,
    Pressable,
    View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { LucideIcon } from 'lucide-react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: LucideIcon;
    style?: ViewStyle;
    textStyle?: TextStyle;
    haptic?: boolean;
}

export function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    icon: Icon,
    style,
    textStyle,
    haptic = true,
}: ButtonProps) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        if (disabled || loading) return;
        Animated.spring(scaleAnim, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
        if (haptic) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const getButtonStyle = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            borderRadius: Layout.borderRadius.lg,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            ...Layout.shadows.sm,
        };

        const sizeStyles: Record<string, ViewStyle> = {
            sm: { paddingVertical: Layout.spacing.sm, paddingHorizontal: Layout.spacing.md },
            md: { paddingVertical: Layout.spacing.md, paddingHorizontal: Layout.spacing.lg },
            lg: { paddingVertical: Layout.spacing.lg, paddingHorizontal: Layout.spacing.xl },
        };

        const variantStyles: Record<string, ViewStyle> = {
            primary: {
                backgroundColor: 'transparent',
            },
            secondary: {
                backgroundColor: Colors.gray[800],
            },
            accent: {
                backgroundColor: 'transparent',
            },
            outline: {
                backgroundColor: 'transparent',
                borderWidth: 1.5,
                borderColor: Colors.primary[500],
                shadowOpacity: 0,
                elevation: 0,
            },
            ghost: {
                backgroundColor: 'transparent',
                shadowOpacity: 0,
                elevation: 0,
            },
        };

        if (variant === 'secondary') {
            baseStyle.shadowOpacity = 0.2;
        }

        return {
            ...baseStyle,
            ...sizeStyles[size],
            ...variantStyles[variant],
            ...(fullWidth && { width: '100%' }),
            ...(disabled && { opacity: 0.5 }),
        };
    };

    const getTextStyle = (): TextStyle => {
        const sizeStyles: Record<string, TextStyle> = {
            sm: { fontSize: Layout.fontSize.sm },
            md: { fontSize: Layout.fontSize.md },
            lg: { fontSize: Layout.fontSize.lg },
        };

        const variantStyles: Record<string, TextStyle> = {
            primary: { color: Colors.text.inverse },
            secondary: { color: Colors.text.inverse },
            accent: { color: Colors.text.inverse },
            outline: { color: Colors.primary[600] },
            ghost: { color: Colors.primary[600] },
        };

        return {
            fontWeight: Layout.fontWeight.bold,
            letterSpacing: 0.5,
            ...sizeStyles[size],
            ...variantStyles[variant],
        };
    };

    const renderContent = () => (
        <View style={styles.content}>
            {loading ? (
                <ActivityIndicator
                    color={
                        variant === 'primary' || variant === 'secondary' || variant === 'accent'
                            ? Colors.text.inverse
                            : Colors.primary[500]
                    }
                />
            ) : (
                <>
                    {Icon && (
                        <Icon
                            size={size === 'sm' ? 18 : 20}
                            color={
                                variant === 'primary' || variant === 'secondary' || variant === 'accent'
                                    ? Colors.text.inverse
                                    : Colors.primary[600]
                            }
                            style={styles.icon}
                        />
                    )}


                    <Text style={[getTextStyle(), textStyle]}>{title}</Text>
                </>
            )}
        </View>
    );

    const buttonStyle = [getButtonStyle(), style];

    const Container = ({ children }: { children: React.ReactNode }) => {
        if (variant === 'primary' || variant === 'accent') {
            const gradientColors = variant === 'primary' ? Colors.primary.gradient : Colors.accent.gradient;
            return (
                <LinearGradient
                    colors={gradientColors as unknown as [string, string, ...string[]]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={buttonStyle}
                >
                    {children}
                </LinearGradient>
            );
        }
        return <View style={buttonStyle}>{children}</View>;
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }], width: fullWidth ? '100%' : 'auto' }}>
            <Pressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled || loading}
            >
                <Container>{renderContent()}</Container>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: Layout.spacing.xs,
    },
});


