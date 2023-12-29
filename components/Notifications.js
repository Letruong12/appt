import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../contants/color';

const NotificationsScreen = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.bgColor,
            }}>
            <Text>Notification!</Text>
        </View>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({});