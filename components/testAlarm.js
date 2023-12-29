import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { firebase } from "../firebaseconfig";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldPlaySound: true,
            shouldShowAlert: true,
            shouldSetBadge: true,
        };
    },
});

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

export default function TestAlarm({ navigation }) {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [isActived, setIsActived] = useState(false);
    const [stateAlarm, setStateAlarm] = useState({
        selectedMinutes: "00",
        selectedHours: "00",
        // selectedSeconds: "00",
        // remainingSecond: 0,
    });
    const [alarmArr, setAlarmArr] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);

    const animateValue = useRef(new Animated.Value(0)).current;
    
    // notification - start
    const notificationIdsRef = useRef([]);
    const getNotificationPermission = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            if (newStatus !== 'granted') {
                alert('Bạn đã từ chối quyền thông báo');
            }
        }
    };
    const handleNotification = (title, body, seconds, id) => {
        const notificationId = id;

        Notifications.scheduleNotificationAsync({
            content: {
                title: `bao thuc ${title}`,
                body: `alarm: ${body}`,
            },
            trigger: {
                seconds: seconds,
            },
            identifier: notificationId,
        });
        console.log(`second: ${seconds}`);
        notificationIdsRef.current.push(notificationId);
    };
    const cancelNotification = async (notificationId) => {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        notificationIdsRef.current = notificationIdsRef.current.filter(
            (id) => id != notificationId
        );
    };
    const handleNotificationReceived = (notification) => {
        const activatedNotificationId = notification.request.identifier;
        notificationIdsRef.current = notificationIdsRef.current.filter(
            (id) => id != activatedNotificationId
        );
        console.log('haha');
        let timeUD;
        let idUD;
        const updatedAlarmArr = alarmArr.map(item => {
            if (item.id == activatedNotificationId) {
                idUD = item.id;
                timeUD = item.time;
                return {
                    ...item,
                    activated: !item.activated,
                };
            }
            return item;
        });
        setAlarmArr(updatedAlarmArr);
        updateDataInFirestore(idUD, timeUD, false);
    };
    // notification - end

    useEffect(() => {
        fetchData();
        // notification
        getNotificationPermission();
        const subscription = Notifications.addNotificationReceivedListener(
            handleNotificationReceived
        );
        const interval = setInterval(() => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setTime(`${hours}:${minutes}:${seconds}`);
        }, 1000);
        return () => {
            subscription.remove();
            clearInterval(interval);
        };
    }, []);

    const formatNumber = number => `0${number}`.slice(-2);
    const createArray = length => {
        const arr = [];
        let i = 0;
        while (i < length) {
            let j = formatNumber(i);
            arr.push(j);
            i += 1;
        }
        return arr;
    }


    const AVAILABLE_HOURS = createArray(24);
    const AVAILABLE_MINUTES = createArray(60);

    // đóng mở menu con 
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const hideMenu = () => {
        setMenuVisible(false);
    };

    const fetchData = async () => {
        try {
            const querySnapshot = await firebase.firestore().collection("Alarm").get();

            const fetchedData = [];
            querySnapshot.forEach((doc) => {
                fetchedData.push({ id: doc.id, ...doc.data() });
            });
            // const updatedAlarmArr = [...alarmArr, newAlarmItem];

            // Sắp xếp mảng theo chiều tăng dần của time
            fetchedData.sort((a, b) => {
                const timeA = a.time.split(':').map(Number);
                const timeB = b.time.split(':').map(Number);
                if (timeA[0] !== timeB[0]) {
                    return timeA[0] - timeB[0];
                } else {
                    return timeA[1] - timeB[1];
                }
            });
            setAlarmArr(fetchedData); // Cập nhật state với dữ liệu từ Firestore
        } catch (error) {
            console.error("Lỗi khi đọc dữ liệu:", error);
        }
    };

    // 1 -> 2
    const cancel = () => {
        setIsActived(false);
    }

    // 1 -> 2
    const addAlarm = async () => {
        const newAlarm = `${stateAlarm.selectedHours}:${stateAlarm.selectedMinutes}`;
        console.log(newAlarm);
        const existingAlarm = alarmArr.find((item) => item.time === newAlarm);
        if (!existingAlarm) {
            const newAlarmItem = { time: newAlarm, activated: false };
            // Thêm dữ liệu vào collection "time" và document sẽ tự động được tạo
            const addedDocRef = await firebase.firestore().collection('Alarm').add(newAlarmItem);
            console.log('Document đã được thêm với ID: ', addedDocRef.id);
            // const updatedAlarmArr = [...alarmArr, newAlarmItem];

            // Sắp xếp mảng theo chiều tăng dần của time
            // updatedAlarmArr.sort((a, b) => {
            //     const timeA = a.time.split(':').map(Number);
            //     const timeB = b.time.split(':').map(Number);
            //     if (timeA[0] !== timeB[0]) {
            //         return timeA[0] - timeB[0];
            //     } else {
            //         return timeA[1] - timeB[1];
            //     }
            // });

            // setAlarmArr(updatedAlarmArr);
            setStateAlarm({
                selectedHours: "00",
                selectedMinutes: "00",
            });

            console.log(alarmArr);
            setIsActived(false);
        } else {
            alert('đã tồn tại báo thức này !');
        }
    };

    // 2 -> 1
    const add = () => {

        setIsActived(true)
    }

    const deleteAlarm = async (id) => {
        try {
            await firebase.firestore().collection('Alarm').doc(id).delete();
            fetchData();
            console.log("Alarm arr : " + alarmArr);
        }
        catch {
            console.error('Lỗi khi xóa tài liệu: ', error);
        }
        // const filteredAlarms = alarmArr.filter(item => item.id !== id);
        // setAlarmArr(filteredAlarms);
        // console.log(alarmArr);
    }

    const updateDataInFirestore = async (id, time, activated) => {
        try {
            const newData = {
                time: time,
                activated: activated,
            }
            await firebase.firestore().collection('Alarm').doc(id).update(newData);
            console.log('Dữ liệu đã được cập nhật thành công');
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu: ', error);
        }
    };
    
    // isActived = 1
    const createAlarm = () => (
        <ScrollView style={styles.croll}>
            <View style={styles.c_container}>
                <Text style={styles.c_time}>{time}</Text>
                <View style={styles.c_title}>
                    <Text style={styles.c_titleText}>
                        Tạo báo thức o(*≧▽≦)ツ┏━┓
                    </Text>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        mode='dropdown'
                        selectedValue={stateAlarm.selectedHours}
                        onValueChange={itemValue => {
                            setStateAlarm({ ...stateAlarm, selectedHours: itemValue })
                        }}
                    >
                        {
                            AVAILABLE_HOURS.map(value => (
                                <Picker.Item key={value} label={value} value={value} />
                            ))
                        }
                    </Picker>
                    <Text style={styles.c_text}>Hours</Text>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        mode='dropdown'
                        selectedValue={stateAlarm.selectedMinutes}
                        onValueChange={itemValue => {
                            setStateAlarm({ ...stateAlarm, selectedMinutes: itemValue });
                            console.log(stateAlarm.selectedMinutes)
                        }}
                    >
                        {
                            AVAILABLE_MINUTES.map(value => (
                                <Picker.Item key={value} label={value} value={value} />
                            ))
                        }
                    </Picker>
                    <Text style={styles.c_text}>Minutes</Text>
                </View>

                <View style={styles.c_btnContainer}>
                    <TouchableOpacity
                        onPress={cancel}
                        style={styles.c_btn}
                    >
                        <Text style={styles.c_btnText}>HỦY</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            addAlarm();
                            fetchData();
                            console.log(alarmArr);
                        }}
                        style={styles.c_btn}
                    >
                        <Text style={styles.c_btnText}>THÊM</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );

    // isActived = 2
    const listAlarm = () => (
        <View style={styles.l_container}>
            
            <ScrollView
                style={styles.l_scrollContainer}
                onScroll={(e) => {
                    animateValue.setValue(e.nativeEvent.contentOffset.y);
                }}
                scrollEventThrottle={16}
            >

                <Animated.View style={[styles.l_headerTitile, {
                    opacity: animateValue.interpolate({
                        inputRange: [0, 50, 180],
                        outputRange: [1, 0.3, 0]
                    })
                }]}>
                    <TouchableOpacity
                        style={styles.l_btnMore}
                        onPress={toggleMenu}
                    >
                        <Text style={styles.l_btnTextMore}>:</Text>
                    </TouchableOpacity>
                    {menuVisible && (
                        <View style={styles.l_menuMore}>
                            <TouchableOpacity
                                style={styles.l_menuItem}
                                onPress={() => {
                                    hideMenu();
                                    navigation.navigate('setting');
                                }}
                            >
                                <Text style={styles.l_menuText}>Cài đặt</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.l_menuItem}
                                onPress={() => {
                                    hideMenu();
                                    navigation.navigate('Start');
                                }}
                            >
                                <Text style={styles.l_menuText}>Thoát</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <Text style={styles.l_time}>{time}</Text>
                    <Text style={styles.l_textTititle}>Bao thuc</Text>
                </Animated.View>
                <View style={styles.l_listContainer}>
                    {
                        alarmArr.map((item, index) => (
                            <View style={styles.l_boxAlarm} key={index}>
                                <View style={styles.l_boxText}>
                                    <Text style={styles.l_textAlarm}>
                                        {item.time}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={[styles.l_outter,
                                    item.activated ? { justifyContent: 'flex-end', backgroundColor: 'blue' } : { justifyContent: 'flex-start', backgroundColor: 'gray' }
                                    ]}
                                    activeOpacity={1}
                                    onPress={() => {
                                        updateDataInFirestore(item.id, item.time, !item.activated);
                                        const updatedArr = [...alarmArr];
                                        updatedArr[index].activated = !updatedArr[index].activated;
                                        setAlarmArr(updatedArr);
                                        console.log(alarmArr);
                                        if (item.activated) {
                                            const n = new Date();
                                            const currentH = n.getHours();
                                            const currentM = n.getMinutes();
                                            const timeItem = item.time.split(':').map(Number);
                                            console.log(`timeItem: ${timeItem}; currentH: ${currentH}; currentM: ${currentM}`);
                                            const currentTimeInSeconds = currentH * 3600 + currentM * 60;
                                            const timeItemInSeconds = timeItem[0] * 3600 + timeItem[1] * 60;
                                            let timeDiffInSeconds = timeItemInSeconds - currentTimeInSeconds - 60;
                                            if (timeDiffInSeconds < 0) {
                                                timeDiffInSeconds += 86400;
                                            }
                                            else if (timeDiffInSeconds == 0) {
                                                timeDiffInSeconds = 30;
                                            }
                                            console.log(`thoi gian chenh lech : ${timeDiffInSeconds}`);
                                            handleNotification(item.id, item.time, timeDiffInSeconds, item.id);
                                            console.log(notificationIdsRef.current);
                                        }
                                        else {
                                            cancelNotification(item.id);
                                            console.log(notificationIdsRef.current);
                                        }
                                    }}
                                >
                                    <View style={styles.l_inner} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => deleteAlarm(item.id)}
                                    style={styles.l_btnRemove}
                                >
                                    <Text style={styles.l_btnText}>
                                        Xóa bỏ
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={add}
                style={styles.l_btnAdd}
            >
                <Text style={[styles.l_btnText, styles.l_btnTextAdd]}>Thêm</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            {
                isActived ? createAlarm() : listAlarm()
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#07121B",
        // alignItems: "center",
        // justifyContent: "center"
    },
    // create alarm
    croll: {

    },
    c_container: {
        alignItems: 'center',
    },
    c_time: {
        color: '#fff',
        fontSize: 40,
        marginTop: 50,

    },
    c_title: {
        marginBottom: 50,
        marginTop: 80,
    },
    c_titleText: {
        fontSize: 20,
        color: '#fff',
    },
    pickerContainer: {
        width: '90%',
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-around',
    },
    picker: {
        flex: 1,
        maxWidth: 100,
        ...Platform.select({
            android: {
                color: "#fff",
                backgroundColor: "rgba(92, 92, 92, 0.206)",
            }
        })
    },
    pickerItem: {
        color: "#fff",
        fontSize: 20,
        ...Platform.select({
            android: {
                marginLeft: 10,
                marginRight: 10,
            }
        })
    },
    c_text: {
        color: '#FFF',
        marginLeft: -10,
    },
    c_btnContainer: {
        width: '90%',
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    c_btn: {
        backgroundColor: '#ECECEC',
        width: 120,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    c_btnText: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    // end - create alarm

    // list alarm 
    l_container: {
        width: '100%',
        height: '100%',
        // backgroundColor: '#F5F5F5',
        position: 'relative',
    },
    l_btnAdd: {
        // position: 'absolute',
        // bottom: 20,
        // left: WIDTH / 2 - 68 / 2,
        width: 68,
        height: 68,
        backgroundColor: '#3B42EB',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 68 / 2,
        zIndex: 2,

        marginLeft: WIDTH / 2 - 68 / 2,
        marginVertical: 20,
    },
    l_btnTextAdd: {
        fontSize: 16,
    },
    l_scrollContainer: {
        
    },
    l_headerTitile: {
        width: '100%',
        height: 180,
        position: 'relative',
    },
    l_btnMore: {
        position: 'absolute',
        top: HEIGHT * 0.06,
        right: WIDTH * 0.06,
        width: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    l_btnTextMore: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#FFF",
    },
    l_menuMore: {
        position: 'absolute',
        top: HEIGHT * 0.07,
        right: WIDTH * 0.09,
        backgroundColor: '#FFF',
        width: 150,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        // display: 'none',
    },
    l_menuItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderBottomWidth: 1.5,
        borderBottomColor: '#EFEFEF',
    },
    l_menuText: {
        fontSize: 16,
        fontWeight: '600',
    },
    l_time: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 2,
        textAlign: 'center',
        marginTop: 20,
    },
    l_textTititle: {
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 70,
        color: '#FFF',
    },
    l_listContainer: {
        width: '100%',
        padding: 20,
    },
    l_boxAlarm: {
        width: '100%',
        backgroundColor: '#fff',
        // padding: 30,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    l_boxText: {
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    l_textAlarm: {
        fontSize: 44,
        fontWeight: '600',
    },
    l_outter: {
        width: 60,
        height: 30,
        backgroundColor: 'gray',
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 2,
    },
    l_inner: {
        width: 26,
        height: 26,
        backgroundColor: 'white',
        borderRadius: 26 / 2,
        elevation: 8,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
    },
    l_btnRemove: {
        backgroundColor: '#DF3D30',
        padding: 12,
        borderRadius: 8,
        marginRight: 10,
    },
    l_btnText: {
        color: '#fff',
        fontWeight: '700',
    },
});