import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, Text } from "react-native";

export default function SettingApp({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>
                    Setting
                </Text>
            </View>
            <ScrollView style={styles.scroll}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.headerLeftText}>T</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.headerRightText}>
                            Ten Tai Khoan
                        </Text>
                    </View>
                </View>

                <View style={styles.body}>
                    <TouchableOpacity style={styles.button}>
                        <View style={styles.buttonLeft}>
                            <Text style={styles.buttonLeftText}>
                                Sửa hồ sơ
                            </Text>
                        </View>
                        <Icon name='chevron-forward-outline' size={22} color='#fff' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <View style={styles.buttonLeft}>
                            <Text style={styles.buttonLeftText}>
                                Đổi mật khẩu
                            </Text>
                        </View>
                        <Icon name='chevron-forward-outline' size={22} color='#fff' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <View style={styles.buttonLeft}>
                            <Text style={styles.buttonLeftText}>
                                Xóa tài khoản
                            </Text>
                        </View>
                        <Icon name='chevron-forward-outline' size={22} color='#fff' />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Start')}
                        style={styles.button}
                    >
                        <View style={styles.buttonLeft}>
                            <Text style={styles.buttonLeftText}>
                                Thoát
                            </Text>
                        </View>
                        <Icon name='chevron-forward-outline' size={22} color='#fff' />
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#303030',
        // position: 'relative',
    },
    title: {
        backgroundColor: '#1F1F1F',
        width: '100%',
        height: 80,
        justifyContent: 'center',
    },
    titleText: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
        color: '#fff',
    },
    scroll: {
        width: '100%',
    },
    header: {
        backgroundColor: '#303030',
        height: 150,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLeft: {
        width: 100,
        height: 100,
        backgroundColor: '#014D41',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100 / 2,
        marginVertical: 20,
        marginHorizontal: 30,
    },
    headerLeftText: {
        fontSize: 50,
        color: '#fff',
    },
    headerRight: {

    },
    headerRightText: {
        fontSize: 20,
        color: '#fff',
    },
    body: {
        width: '100%',
    },
    button: {
        backgroundColor: '#303030',
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: '#373737',
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonLeft: {

    },
    buttonLeftText: {
        fontSize: 20,
        color: '#fff',
    },
})
