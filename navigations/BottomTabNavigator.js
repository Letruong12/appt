import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../contants/color';
// import DetailsScreen from '../components/DetailScreen';
import HomeScreen from '../components/HomeScreen';
// import WalletScreeb from '../components/Wallet';
// import NotificationsScreen from '../components/Notifications';
// import SettingsScreen from '../components/Settings';
import TestAlarm from '../components/testAlarm';
import Timer from '../components/Timer';
import StopWatch from '../components/stopWatch';
import SettingApp from '../components/SettingApp';
import Setting from '../Setting/setting';



const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                // tabBarShowLabel: false,
                tabBarInactiveTintColor: COLORS.dark,
                tabBarActiveTintColor: COLORS.primary,
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;

                    if (route.name === 'alarm') {
                        iconName = focused ? 'alarm-sharp' : 'alarm-outline';
                    } else if (route.name === 'setting') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === 'timer') {
                        iconName = focused ? 'timer-sharp' : 'timer-outline';
                    } else if (route.name === 'stopWatch') {
                        iconName = focused
                            ? 'stopwatch-sharp'
                            : 'stopwatch-outline';
                    }

                    return <Icon name={iconName} size={22} color={color} />;
                },
            })}>
            <Tab.Screen
                name='alarm'
                component={TestAlarm}
            />
            <Tab.Screen
                name='timer'
                component={Timer}
            />
            <Tab.Screen
                name='stopWatch'
                component={StopWatch}
            />
            <Tab.Screen
                name='setting'
                component={Setting}
            />
        </Tab.Navigator>
    )
}