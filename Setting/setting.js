import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Switch } from "react-native";

export default function Setting({ navigation }) {
    const [isSwitchOn, setIsSwitchOn] = useState(true);
    const handleSwitchToggle = () => {
        setIsSwitchOn(!isSwitchOn);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}> Cài đặt </Text>
            <ScrollView>
                <View style={styles.content}>
                    <View>
                        <Text style={styles.title}> Báo thức </Text>
                        <View style={styles.option}>
                            <TouchableOpacity onPress={() => { navigation.navigate("Tldc") }} style={styles.form}>
                                <Text style={styles.text}>Thời lượng đổ chuông</Text>
                                <View style={{
                                    backgroundColor: 'white', 
                                    width: 24, height: 24, 
                                    borderRadius: 24 / 2,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image source={require('../assets/arrow.jpg')} style={{ width: 10, height: 10 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("Dbt") }} style={styles.form}>
                                <Text style={styles.text}>Dừng báo thức bằng </Text>
                                <View style={{
                                    backgroundColor: 'white', 
                                    width: 24, height: 24, 
                                    borderRadius: 24 / 2,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image source={require('../assets/arrow.jpg')} style={{ width: 10, height: 10 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.form}>
                                <View>
                                    <Text style={styles.text}>Thông báo trước khi đổ chuông </Text>
                                    <View>
                                        <Text style={styles.text1}>Nhận thông báo trước khi báo thức bật 15</Text>
                                        <Text style={styles.text1}>phút để bạn có thể tắt báo thức trước </Text>
                                    </View>
                                </View>
                                <Switch value={isSwitchOn} onValueChange={handleSwitchToggle} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}> Khác </Text>
                        <View style={styles.option}>
                            <TouchableOpacity onPress={() => { navigation.navigate("Nvg") }} style={styles.form}>
                                <View>
                                    <Text style={styles.text}>Ngày và giờ </Text>
                                    <Text style={styles.text1}> Giờ hệ thống và tiện ích đồng hồ kép</Text>
                                </View>
                                <View style={{
                                    backgroundColor: 'white', 
                                    width: 24, height: 24, 
                                    borderRadius: 24 / 2,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image source={require('../assets/arrow.jpg')} style={{ width: 10, height: 10 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text></Text>
                        <View style={styles.option}>
                            <TouchableOpacity style={styles.form}>
                                <View>
                                    <Text style={styles.text}>Phiên bản </Text>
                                    <Text style={styles.text1}> 17.0.8_f58860a_230830</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("Gt") }} style={styles.form}>
                                <Text style={styles.text}>Giới thiệu về Đồng hồ</Text>
                                <View style={{
                                    backgroundColor: 'white', 
                                    width: 24, height: 24, 
                                    borderRadius: 24 / 2,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image source={require('../assets/arrow.jpg')} style={{ width: 10, height: 10 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("Qrt") }} style={styles.form}>
                                <Text style={styles.text}>Quyền riêng tư của ứng dụng</Text>
                                <View style={{
                                    backgroundColor: 'white', 
                                    width: 24, height: 24, 
                                    borderRadius: 24 / 2,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image source={require('../assets/arrow.jpg')} style={{ width: 10, height: 10 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height: 1000,
        backgroundColor: '#00141c',
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 40,
        paddingBottom: 10,
        paddingStart: 15,
        color: 'white',
    },
    content: {
        paddingTop: 10,
        width: '95%',
        paddingStart: 20
    },
    option: {
        backgroundColor: '#666',
        borderRadius: 10,
        borderColor: '#0011',
    },
    form: {
        paddingHorizontal: 5,
        marginTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: '#b8b8b8',
        paddingBottom: 10,
        paddingTop: 20,
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'white',
    },
    text1: {
        paddingTop: 5,
        fontSize: 10,
        fontWeight: 'normal',
        color: 'white',
    },
})