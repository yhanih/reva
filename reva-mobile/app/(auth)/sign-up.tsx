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
import { UserRole } from '../../types/database';
import { Mail, Lock, User as UserIcon, Type } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState<UserRole>('promoter');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!email || !password || !fullName) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) {
            setLoading(false);
            Alert.alert('Sign Up Failed', authError.message);
            return;
        }

        if (authData.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    id: authData.user.id,
                    email,
                    role,
                    full_name: fullName,
                });

            setLoading(false);

            if (profileError) {
                Alert.alert('Profile Creation Failed', profileError.message);
            } else {
                Alert.alert(
                    'Success',
                    'Account created! Please check your email to verify your account.',
                    [{ text: 'OK', onPress: () => router.replace('/(auth)/sign-in') }]
                );
            }
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
                            <Text style={styles.title}>Create account</Text>
                            <Text style={styles.subtitle}>
                                Join Reva and start your journey
                            </Text>
                        </View>

                        <View style={styles.roleContainer}>
                            <Text style={styles.roleLabel}>I want to:</Text>
                            <View style={styles.roleButtons}>
                                <Button
                                    title="Promote"
                                    onPress={() => setRole('promoter')}
                                    variant={role === 'promoter' ? 'primary' : 'outline'}
                                    style={styles.roleButton}
                                    size="sm"
                                />
                                <Button
                                    title="Create"
                                    onPress={() => setRole('marketer')}
                                    variant={role === 'marketer' ? 'accent' : 'outline'}
                                    style={styles.roleButton}
                                    size="sm"
                                />
                            </View>
                        </View>

                        <Card style={styles.formCard} shadow="lg">
                            <Input
                                label="Full Name"
                                placeholder="Your full name"
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                                autoComplete="name"
                                icon={Type}
                            />

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
                                placeholder="Create a password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                                autoComplete="password"
                                icon={Lock}
                            />

                            <Button
                                title="Create Account"
                                onPress={handleSignUp}
                                loading={loading}
                                fullWidth
                                variant={role === 'promoter' ? 'primary' : 'accent'}
                                style={styles.signUpButton}
                            />
                        </Card>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account?</Text>
                            <Button
                                title="Sign In"
                                onPress={() => router.back()}
                                variant="ghost"
                                size="sm"
                                textStyle={styles.signInLink}
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
        marginBottom: Layout.spacing.xl,
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
    },
    roleContainer: {
        marginBottom: Layout.spacing.xl,
    },
    roleLabel: {
        fontSize: Layout.fontSize.sm,
        fontWeight: Layout.fontWeight.bold,
        color: Colors.text.secondary,
        marginBottom: Layout.spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    roleButtons: {
        flexDirection: 'row',
        gap: Layout.spacing.sm,
    },
    roleButton: {
        flex: 1,
    },
    formCard: {
        padding: Layout.spacing.xl,
        backgroundColor: '#fff',
    },
    signUpButton: {
        marginTop: Layout.spacing.md,
    },
    footer: {
        marginTop: Layout.spacing.xl,
        alignItems: 'center',
    },
    footerText: {
        fontSize: Layout.fontSize.sm,
        color: Colors.text.tertiary,
        marginBottom: Layout.spacing.xs,
    },
    signInLink: {
        color: Colors.primary[600],
        fontWeight: Layout.fontWeight.bold,
    },
});

