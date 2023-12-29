import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import COLORS from '../../contants/color';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const DangNhap = async (Email, PassWord) => {
        try {
            console.log("word !");
            const userCredential = await firebase.auth().signInWithEmailAndPassword(Email, PassWord);
            const userID = userCredential.Login.uid;
            console.log(userID);
            // Đăng nhập thành công, user chứa thông tin người dùng đã đăng nhập
            const userDocRef = firebase.firestore().collection("Login").doc(userID);
            console.log("1 !");
            userDocRef.get().then((doc) => {
                if (doc.exists) {
                    // Dữ liệu người dùng được tìm thấy
                    const userData = doc.data();
                    console.log(userData);
                } else {
                    // Người dùng không tồn tại trong Firestore
                    alert("Người dùng không tồn tại");
                }
            })
                .catch((error) => {
                    setIsLoading(false)
                    console.error("Lỗi khi truy vấn dữ liệu người dùng:", error);
                });

        } catch (error) {

        }
    }
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <View style={styles.row}>
                        <View style={{ with: 55, height: 55 }}>
                        </View>
                        <Text style={styles.brandName}>Olors</Text>
                    </View>

                    <Text style={styles.loginContinueTxt}>Login in to continue</Text>
                    <TextInput style={styles.input} placeholder="Name" />
                    <TextInput style={styles.input} placeholder="Password" />

                    <View style={styles.loginBtnWrapper}>
                        <View style={styles.linearGradient}>
                        
                            <TouchableOpacity
                                onPress={() => {
                                    // console.log("hello ");
                                    // DangNhap('truong730525@gmail.com', '123')
                                    navigation.navigate('Homes')
                                }}
                                activeOpacity={0.7}
                                style={styles.loginBtn}>
                                <Text style={styles.loginText}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/***************** FORGOT PASSWORD BUTTON *****************/}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPassWord', {
                            userId: 'X0001',
                        })}
                        style={styles.forgotPassBtn}>
                        <Text style={styles.forgotPassText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}> Don't have an account? </Text>
                    {/******************** REGISTER BUTTON *********************/}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.signupBtn}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    container: {
        padding: 15,
        width: '100%',
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandName: {
        fontSize: 42,
        textAlign: 'center',
        fontWeight: 'bold',
        color: COLORS.primary,
        opacity: 0.9,
    },
    loginContinueTxt: {
        fontSize: 21,
        textAlign: 'center',
        color: COLORS.gray,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        height: 55,
        paddingVertical: 0,
    },
    // Login Btn Styles
    loginBtnWrapper: {
        height: 55,
        marginTop: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    linearGradient: {
        width: '100%',
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
    },
    loginBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
    },
    loginText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '400',
    },
    forgotPassText: {
        color: COLORS.primary,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 15,
    },
    // footer
    footer: {
        position: 'absolute',
        bottom: 20,
        textAlign: 'center',
        flexDirection: 'row',
    },
    footerText: {
        color: COLORS.gray,
        fontWeight: 'bold',
    },
    signupBtn: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    // utils
    wFull: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    mr7: {
        marginRight: 7,
    },
});