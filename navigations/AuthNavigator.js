import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Auth/Login';
import ForgotPassword from '../Screens/Auth/ForgotPassWord';
import COLORS from '../contants/color';
import Register from '../Screens/Auth/Register';
import BottomTabNavigator from './BottomTabNavigator';
import StartScreen from '../Screens/Auth/Start';
import Dbt from '../Setting/DungBT';
import Gt from '../Setting/GioiThieu';
import Nvg from '../Setting/NgayVaGio';
import Qrt from '../Setting/QuyenRiengTu';
import Tldc from '../Setting/ThoiLuongDoChuong';
const Stack = createNativeStackNavigator();
export default function AuthNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerBackTitle: 'Back',
            }}
        >
            <Stack.Screen
                name="Start"
                component={StartScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Homes"
                component={BottomTabNavigator}
                options={{
                    headerShown: false,
                }}
            />

            {/* setting */}
            <Stack.Screen
                name="Dbt"
                component={Dbt}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Gt"
                component={Gt}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Nvg"
                component={Nvg}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Qrt"
                component={Qrt}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Tldc"
                component={Tldc}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}