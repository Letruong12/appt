import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Animated, Easing, Image } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StartScreen() {
    const navigation = useNavigation();

    const [triggerAnimation, setTriggerAnimation] = useState(false);
    const fallAnim = new Animated.Value(-300);
    const textAnim = new Animated.Value(-100);

    useEffect(() => {
        if (triggerAnimation) {
            Animated.timing(fallAnim, {
                toValue: 0,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
            Animated.timing(textAnim, {
                toValue: 0,
                duration: 1500, // Điều chỉnh thời gian hoạt động theo ý của bạn
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => {
                // Khi hiệu ứng hoàn thành, đặt lại giá trị triggerAnimation về false
                setTriggerAnimation(false);
            });
        }
    }, [triggerAnimation]);

    const handlePageFocus = () => {
        // Khi trang được focus (quay lại), set giá trị triggerAnimation thành true để kích hoạt hiệu ứng
        setTriggerAnimation(true);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handlePageFocus);

        return unsubscribe;
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Animated.Image
                    style={{
                        ...styles.tinyLogo,
                        transform: [{ translateY: fallAnim }],
                    }}
                    source={require('../../assets/screenStart1.png')}
                    resizeMode="cover"
                />
            </View>

            <Animated.Text
                style={{
                    ...styles.title,
                    transform: [{ translateX: textAnim }],
                }}
            >
                Let's start managing your time properly
            </Animated.Text>

            <TouchableOpacity
                onPress={() => navigation.navigate('Homes')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1A1A',
        paddingHorizontal: 50,
        paddingTop: 20,
        height: '100%',
        alignItems: 'center',
        flex: 1,
    },
    card: {
        borderRadius: 5,
        padding: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3,
    },
    tinyLogo: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginHorizontal: 4,
        textAlign: 'center',
        letterSpacing: 2,
        flex: 2,
    },
    button: {
        backgroundColor: '#595EDA',
        borderRadius: 5,
        width: 180,
        marginBottom: 90,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 12,
    },
});