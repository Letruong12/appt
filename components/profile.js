import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View, ScrollView, TextInput, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export default function Profile() {
    const [gioiTinh, setGioiTinh] = useState(null);

    const handleRadioPress = (selectedGioiTinh) => {
        setGioiTinh(selectedGioiTinh);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.header}>
                    <View style={styles.headerBox}>
                        <Text style={styles.headerText}>T</Text>
                    </View>
                </View>

                <View style={styles.box}>
                    <Icon style={styles.icon} name='people' size={22} color='#999' />
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor='#999'
                    />
                </View>

                <View style={styles.box}>
                    <Icon style={styles.icon} name='mail-outline' size={22} color='#999' />
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        placeholder="Email"
                        placeholderTextColor='#999'
                    />
                </View>

                <View style={styles.box}>
                    <Icon style={styles.icon} name='call-outline' size={22} color='#999' />
                    <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        placeholder="Phone number"
                        placeholderTextColor='#999'
                    />
                </View>

                <View style={styles.box}>
                    <Icon style={styles.icon} name='calendar-outline' size={22} color='#999' />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Year"
                        placeholderTextColor='#999'
                    />
                </View>

                <View style={styles.box}>
                    <Text style={styles.boxText}>Giới tính</Text>
                    <View style={styles.boxRadio}>
                        <TouchableOpacity
                            style={[styles.btnRadio, gioiTinh === 'BiMat' ? {
                                backgroundColor: '#fff',
                                borderTopLeftRadius: 25,
                                borderBottomLeftRadius: 25,
                            } : null]}
                            onPress={() => handleRadioPress('BiMat')}
                        >
                            <Text style={[styles.btnText, gioiTinh === 'BiMat' ? { color: '#000' } : null]}>Bí mật</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btnRadio, gioiTinh === 'Nam' ? { backgroundColor: '#fff' } : null]}
                            onPress={() => handleRadioPress('Nam')}
                        >
                            <Text style={[styles.btnText, gioiTinh === 'Nam' ? { color: '#000' } : null]}>Nam</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btnRadio, gioiTinh === 'Nu' ? {
                                backgroundColor: '#fff',
                                borderTopRightRadius: 25,
                                borderBottomRightRadius: 25,
                            } : null]}
                            onPress={() => handleRadioPress('Nu')}
                        >
                            <Text style={[styles.btnText, gioiTinh === 'Nu' ? { color: '#000' } : null]}>Nữ</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.buttonSave}>
                    <Text style={styles.buttonSavetext}>Lưu</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#303030',
        // position: 'relative',
    },
    scroll: {

    },
    header: {
        width: '100%',
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerBox: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: '#014D41',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    headerText: {
        fontSize: 40,
        color: '#fff',
    },
    box: {
        borderBottomWidth: 1,
        borderBottomColor: '#aaa',
        marginHorizontal: 30,
        paddingVertical: 15,
        paddingHorizontal: 4,
        flexDirection: 'row',
        alignItems: "center",
    },
    icon: {
        flex: 1,
    },
    input: {
        flex: 7,
        fontSize: 16,
        color: '#fff',
    },
    boxText: {
        flex: 2,
        color: '#fff',
        
    },
    boxRadio: {
        flex: 4,
        height: 30,
        backgroundColor: '#666',
        borderRadius: 25,
        flexDirection: 'row',
    },
    btnRadio: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#fff',
    },
    buttonSave: {
        marginHorizontal: 30,
        marginVertical: 20,
        backgroundColor: '#3B42EB',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 25,
    },
    buttonSavetext: {
        fontSize: 18,
        color: '#fff'
    },
});