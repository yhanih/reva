import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Button, Card, FadeInView } from '../../components/ui';
import { supabase } from '../../lib/supabase';
import { TrendingUp, Users, Megaphone, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Dashboard() {
    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#f0fdfa', '#ffffff'] as any}
                style={StyleSheet.absoluteFill}
            />

            <View style={styles.header}>
                <FadeInView delay={100}>
                    <Text style={styles.welcomeText}>Welcome back,</Text>
                    <Text style={styles.title}>Reva Dashboard</Text>
                </FadeInView>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.grid}>
                    <FadeInView delay={200} style={styles.gridItem}>
                        <Card style={styles.featureCard} shadow="lg">
                            <View style={styles.iconBackground}>
                                <TrendingUp size={24} color={Colors.primary[600]} />
                            </View>
                            <Text style={styles.cardTitle}>Earnings</Text>
                            <Text style={styles.cardValue}>$0.00</Text>
                            <Text style={styles.cardLabel}>Pending approval</Text>
                        </Card>
                    </FadeInView>

                    <FadeInView delay={300} style={styles.gridItem}>
                        <Card style={styles.featureCard} shadow="lg">
                            <View style={styles.iconBackground}>
                                <Megaphone size={24} color={Colors.accent[600]} />
                            </View>
                            <Text style={styles.cardTitle}>Active</Text>
                            <Text style={styles.cardValue}>0</Text>
                            <Text style={styles.cardLabel}>Campaigns running</Text>
                        </Card>
                    </FadeInView>

                    <FadeInView delay={400} style={styles.gridItem}>
                        <Card style={styles.featureCard} shadow="lg">
                            <View style={styles.iconBackground}>
                                <Users size={24} color={Colors.primary[600]} />
                            </View>
                            <Text style={styles.cardTitle}>Impact</Text>
                            <Text style={styles.cardValue}>0</Text>
                            <Text style={styles.cardLabel}>Total reach</Text>
                        </Card>
                    </FadeInView>

                    <FadeInView delay={500} style={styles.gridItem}>
                        <Card style={styles.featureCard} shadow="lg" variant="glass">
                            <View style={styles.iconBackground}>
                                <Plus size={24} color={Colors.accent[600]} />
                            </View>
                            <Text style={styles.cardTitle}>Explore</Text>
                            <Text style={styles.cardValue}>New</Text>
                            <Text style={styles.cardLabel}>Find opportunities</Text>
                        </Card>
                    </FadeInView>
                </View>

                <FadeInView delay={600}>
                    <Button
                        title="Sign Out"
                        onPress={handleSignOut}
                        variant="ghost"
                        style={styles.signOutButton}
                    />
                </FadeInView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.primary,
    },
    header: {
        paddingTop: 80,
        paddingHorizontal: Layout.spacing.xl,
        paddingBottom: Layout.spacing.lg,
    },
    welcomeText: {
        fontSize: Layout.fontSize.md,
        color: Colors.text.secondary,
        fontWeight: Layout.fontWeight.medium,
        marginBottom: 4,
    },
    title: {
        fontSize: Layout.fontSize.xxxl,
        fontWeight: Layout.fontWeight.black,
        color: Colors.text.primary,
        letterSpacing: -0.5,
    },
    scrollContent: {
        padding: Layout.spacing.xl,
        paddingTop: 0,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        marginBottom: Layout.spacing.md,
    },
    featureCard: {
        padding: Layout.spacing.lg,
        height: 160,
        justifyContent: 'center',
    },
    iconBackground: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Colors.background.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Layout.spacing.md,
    },
    cardTitle: {
        fontSize: Layout.fontSize.sm,
        color: Colors.text.secondary,
        fontWeight: Layout.fontWeight.medium,
        marginBottom: 4,
    },
    cardValue: {
        fontSize: Layout.fontSize.xl,
        fontWeight: Layout.fontWeight.black,
        color: Colors.text.primary,
        marginBottom: 2,
    },
    cardLabel: {
        fontSize: Layout.fontSize.xs,
        color: Colors.text.tertiary,
    },
    signOutButton: {
        marginTop: Layout.spacing.xl,
    },
});


