import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Button, Card, FadeInView } from '../../components/ui';
import { supabase } from '../../lib/supabase';
import { User, Settings, Bell, Shield, LogOut, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile() {
    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    const SettingItem = ({ icon: Icon, title, subtitle, delay }: any) => (
        <FadeInView delay={delay} style={{ width: '100%' }}>
            <Card style={styles.settingCard} variant="glass" padding="md">
                <View style={styles.settingRow}>
                    <View style={styles.settingIconContainer}>
                        <Icon size={22} color={Colors.primary[600] as any} />
                    </View>
                    <View style={styles.settingContent}>
                        <Text style={styles.settingTitle}>{title}</Text>
                        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
                    </View>
                    <ChevronRight size={20} color={Colors.text.tertiary as any} />
                </View>
            </Card>
        </FadeInView>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <LinearGradient
                colors={['#f0fdfa', '#ffffff'] as any}
                style={styles.headerBackground}
            />

            <FadeInView delay={100} style={styles.header}>
                <View style={styles.avatarContainer}>
                    <LinearGradient
                        colors={Colors.primary.gradient as any}
                        style={styles.avatarGradient}
                    >
                        <User size={48} color="#fff" />
                    </LinearGradient>
                </View>
                <Text style={styles.userName}>Profile Settings</Text>
                <Text style={styles.userRole}>Manage your account and preferences</Text>
            </FadeInView>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Account</Text>
                <SettingItem
                    icon={User}
                    title="Personal Information"
                    subtitle="Name, email, and social profiles"
                    delay={200}
                />
                <SettingItem
                    icon={Settings}
                    title="Preferences"
                    subtitle="Theme, language, and regional settings"
                    delay={300}
                />

                <Text style={[styles.sectionTitle, { marginTop: Layout.spacing.xl }]}>
                    Security & Notifications
                </Text>
                <SettingItem
                    icon={Bell}
                    title="Notifications"
                    subtitle="Manage your alerts and summaries"
                    delay={400}
                />
                <SettingItem
                    icon={Shield}
                    title="Privacy & Security"
                    subtitle="Password, 2FA, and data privacy"
                    delay={500}
                />

                <FadeInView delay={600}>
                    <Button
                        title="Sign Out"
                        onPress={handleSignOut}
                        variant="outline"
                        icon={LogOut}
                        style={styles.signOutButton}
                        textStyle={styles.signOutText}
                    />
                </FadeInView>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.primary,
    },
    scrollContent: {
        paddingBottom: Layout.spacing.xxl,
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 280,
    },
    header: {
        paddingTop: 80,
        paddingBottom: Layout.spacing.xl,
        alignItems: 'center',
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: Layout.spacing.lg,
        ...Layout.shadows.lg,
    },
    avatarGradient: {
        flex: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userName: {
        fontSize: Layout.fontSize.xl,
        fontWeight: Layout.fontWeight.black,
        color: Colors.text.primary,
        marginBottom: Layout.spacing.xs,
    },
    userRole: {
        fontSize: Layout.fontSize.md,
        color: Colors.text.secondary,
    },
    content: {
        paddingHorizontal: Layout.spacing.xl,
    },
    sectionTitle: {
        fontSize: Layout.fontSize.sm,
        fontWeight: Layout.fontWeight.bold,
        color: Colors.text.tertiary,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: Layout.spacing.md,
        marginLeft: 4,
    },
    settingCard: {
        marginBottom: Layout.spacing.sm,
        borderWidth: 0,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Colors.primary[50],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Layout.spacing.md,
    },
    settingContent: {
        flex: 1,
    },
    settingTitle: {
        fontSize: Layout.fontSize.md,
        fontWeight: Layout.fontWeight.semibold,
        color: Colors.text.primary,
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: Layout.fontSize.xs,
        color: Colors.text.secondary,
    },
    signOutButton: {
        marginTop: Layout.spacing.xxl,
        borderColor: Colors.error,
        borderWidth: 1.5,
    },
    signOutText: {
        color: Colors.error,
        fontWeight: Layout.fontWeight.bold,
    },
});

