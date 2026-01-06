import React, { useState } from 'react';
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TextInputProps,
    ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { LucideIcon } from 'lucide-react-native';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: LucideIcon;
    containerStyle?: ViewStyle;
}

export function Input({
    label,
    error,
    icon: Icon,
    containerStyle,
    style,
    ...props
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                style={[
                    styles.inputContainer,
                    isFocused && styles.inputFocused,
                    error && styles.inputError,
                ]}
            >
                {Icon && (
                    <View style={styles.iconContainer}>
                        <Icon
                            size={20}
                            color={isFocused ? Colors.primary[500] : Colors.text.tertiary}
                        />
                    </View>
                )}


                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={Colors.text.tertiary}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor={Colors.primary[500]}
                    {...props}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Layout.spacing.lg,
    },
    label: {
        fontSize: Layout.fontSize.sm,
        fontWeight: Layout.fontWeight.semibold,
        color: Colors.text.secondary,
        marginBottom: Layout.spacing.xs,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: Colors.border.DEFAULT,
        borderRadius: Layout.borderRadius.md,
        backgroundColor: Colors.background.primary,
        overflow: 'hidden',
    },
    iconContainer: {
        paddingLeft: Layout.spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        paddingHorizontal: Layout.spacing.md,
        paddingVertical: Layout.spacing.md,
        fontSize: Layout.fontSize.md,
        color: Colors.text.primary,
    },
    inputFocused: {
        borderColor: Colors.primary[500],
        ...Layout.shadows.sm,
    },
    inputError: {
        borderColor: Colors.error,
    },
    errorText: {
        fontSize: Layout.fontSize.xs,
        color: Colors.error,
        marginTop: Layout.spacing.xs,
        marginLeft: 4,
    },
});


