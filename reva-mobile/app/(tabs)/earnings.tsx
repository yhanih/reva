import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Card, Button, FadeInView } from '../../components/ui';
import { Wallet, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Earnings() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#fff', Colors.background.secondary] as any}
                style={StyleSheet.absoluteFill}
            />

            <View style={styles.content}>
                <FadeInView delay={100} style={styles.header}>
                    <View style={styles.iconContainer}>
                        <LinearGradient
                            colors={Colors.primary.gradient as any}
                            style={styles.iconGradient}
                        >
                            <Wallet size={40} color="#fff" />
                        </LinearGradient>
                    </View>

                    <Text style={styles.title}>Earnings</Text>
                    <Text style={styles.subtitle}>
                        Track your success and manage your revenue with ease. Financial tools arriving soon!
                    </Text>
                </FadeInView>

                <FadeInView delay={300} style={{ width: '100%' }}>
                    <Card style={styles.infoCard} variant="glass">
                        <View style={styles.row}>
                            <TrendingUp size={20} color={Colors.primary[600] as any} />
                            <Text style={styles.infoText}>Detailed transaction history</Text>
                        </View>
                        <View style={styles.row}>
                            <TrendingUp size={20} color={Colors.primary[600] as any} />
                            <Text style={styles.infoText}>Weekly payout forecasts</Text>
                        </View>
                    </Card>
                </FadeInView>

                <FadeInView delay={500} style={{ width: '100%' }}>
                    <Button
                        title="Notify Me"
                        onPress={() => { }}
                        variant="primary"
                        style={styles.button}
                    />
                </FadeInView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.primary,
    },
    header: {
        alignItems: 'center',
        marginBottom: Layout.spacing.xl,
    },
    content: {
        flex: 1,
        padding: Layout.spacing.xl,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 24,
        marginBottom: Layout.spacing.xl,
        ...Layout.shadows.lg,
    },
    iconGradient: {
        flex: 1,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: Layout.fontSize.xxxl,
        fontWeight: Layout.fontWeight.black,
        color: Colors.text.primary,
        marginBottom: Layout.spacing.sm,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: Layout.fontSize.md,
        color: Colors.text.secondary,
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: Layout.spacing.md,
    },
    infoCard: {
        width: '100%',
        marginBottom: Layout.spacing.xl,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Layout.spacing.md,
        gap: Layout.spacing.sm,
    },
    infoText: {
        fontSize: Layout.fontSize.md,
        color: Colors.text.primary,
        fontWeight: Layout.fontWeight.medium,
    },
    button: {
        width: '100%',
    },
});


