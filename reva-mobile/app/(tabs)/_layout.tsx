import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Home, Layout as LayoutIcon, Wallet, User } from 'lucide-react-native';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary[500],
                tabBarInactiveTintColor: Colors.text.tertiary,
                tabBarLabelStyle: {
                    fontWeight: Layout.fontWeight.semibold,
                    fontSize: 10,
                },
                tabBarStyle: {
                    backgroundColor: Colors.background.primary,
                    borderTopColor: Colors.border.light,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                    ...Layout.shadows.md,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="campaigns"
                options={{
                    title: 'Campaigns',
                    tabBarIcon: ({ color, size }) => <LayoutIcon size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="earnings"
                options={{
                    title: 'Earnings',
                    tabBarIcon: ({ color, size }) => <Wallet size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}

