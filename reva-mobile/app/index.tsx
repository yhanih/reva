import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                router.replace('/(tabs)');
            } else {
                router.replace('/(auth)/sign-in');
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                router.replace('/(tabs)');
            } else {
                router.replace('/(auth)/sign-in');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background.primary,
    },
    text: {
        fontSize: Layout.fontSize.lg,
        color: Colors.text.secondary,
    },
});
