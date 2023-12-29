import React, { useState } from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View, ScrollView, TextInput, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const HEIGHT = Dimensions.get('screen').height;

export default function ChangePass() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSave = () => {
        if (currentPassword !== '123') {
            setErrorMessage('Sai mật khẩu hiện tại');
        } else if (newPassword !== confirmPassword) {
            setErrorMessage('Mật khẩu mới và xác nhận mật khẩu không khớp');
        } else {
            setErrorMessage('');
            // Thực hiện các bước lưu hoặc xác nhận mật khẩu tại đây
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.header}>
                </View>

                <View style={styles.box}>
                    <Icon style={styles.icon} name='lock-closed' size={22} color='#999' />
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu hiện tại"
                        placeholderTextColor='#999'
                        secureTextEntry
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                    />
                </View>

                <View style={styles.box}>
                    <Icon style={styles.icon} name='lock-closed' size={22} color='#999' />
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu mới"
                        placeholderTextColor='#999'
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                </View>

                <View style={styles.box}>
                    <Icon style={styles.icon} name='lock-closed' size={22} color='#999' />
                    <TextInput
                        style={styles.input}
                        placeholder="Xác nhận lại mật khẩu mới"
                        placeholderTextColor='#999'
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>

                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
                    <Text style={styles.buttonSavetext}>Lưu</Text>
                </TouchableOpacity>
                <View style={styles.pad}></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#303030',
    },
    scroll: {},
    header: {
        width: '100%',
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
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
        color: '#fff',
    },
    pad: {
        height: HEIGHT - 180 - 50 * 3 - 150,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});
