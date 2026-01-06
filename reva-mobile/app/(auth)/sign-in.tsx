import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { Button, Input, Card } from '../../components/ui';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Mail, Lock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            Alert.alert('Sign In Failed', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#f0fdfa', '#ffffff'] as any}
                style={StyleSheet.absoluteFill}
            />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <View style={styles.logoPlaceholder}>
                                <LinearGradient
                                    colors={Colors.primary.gradient as any}
                                    style={styles.logoGradient}
                                >
                                    <Text style={styles.logoText}>R</Text>
                                </LinearGradient>
                            </View>
                            <Text style={styles.title}>Welcome back</Text>
                            <Text style={styles.subtitle}>
                                Sign in to your account to continue
                            </Text>
                        </View>

                        <Card style={styles.formCard} shadow="lg">
                            <Input
                                label="Email address"
                                placeholder="name@example.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                                icon={Mail}
                            />

                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                                autoComplete="password"
                                icon={Lock}
                            />

                            <Button
                                title="Sign In"
                                onPress={handleSignIn}
                                loading={loading}
                                fullWidth
                                style={styles.signInButton}
                            />
                        </Card>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account?</Text>
                            <Button
                                title="Create an account"
                                onPress={() => router.push('/(auth)/sign-up')}
                                variant="ghost"
                                size="sm"
                                textStyle={styles.signUpText}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.primary,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: Layout.spacing.xl,
        justifyContent: 'center',
    },
    header: {
        marginBottom: Layout.spacing.xxl,
        alignItems: 'center',
    },
    logoPlaceholder: {
        width: 64,
        height: 64,
        borderRadius: 20,
        marginBottom: Layout.spacing.lg,
        ...Layout.shadows.md,
    },
    logoGradient: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 32,
        fontWeight: '900',
        color: '#fff',
    },
    title: {
        fontSize: Layout.fontSize.xxxl,
        fontWeight: Layout.fontWeight.black,
        color: Colors.text.primary,
        marginBottom: Layout.spacing.xs,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: Layout.fontSize.md,
        color: Colors.text.secondary,
        textAlign: 'center',
    },
    formCard: {
        padding: Layout.spacing.xl,
        backgroundColor: '#fff',
    },
    signInButton: {
        marginTop: Layout.spacing.md,
    },
    footer: {
        marginTop: Layout.spacing.xxl,
        alignItems: 'center',
    },
    footerText: {
        fontSize: Layout.fontSize.sm,
        color: Colors.text.tertiary,
        marginBottom: Layout.spacing.xs,
    },
    signUpText: {
        color: Colors.primary[600],
        fontWeight: Layout.fontWeight.bold,
    },
});

