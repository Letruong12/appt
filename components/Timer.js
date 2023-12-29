import React, { useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    View,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/Ionicons';
import { firebase } from "../firebaseconfig";

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
export default function Timer({ navigation }) {
    const [actived, setActived] = useState(2);
    const [stateTimer, setStateTimer] = useState({
        selectedMinutes: "00",
        selectedHours: "00",
        selectedSeconds: "00",
        // remainingSecond: 0,
    });
    const [newContent, setNewContent] = useState('');
    const [timerArr, setTimerArr] = useState([]);
    const [displayTime, setDisplayTime] = useState({
        time: '00:00:00',
        remainingSecond: 0,
        content: null,
    });

    const prevRemainingSecondRef = useRef(null);
    const A3Content = useRef();

    // khi đếm ngược đến 0 thì gọi hàm StopTimer() rồi về 2
    useEffect(() => {
        if (displayTime.remainingSecond === 0 && prevRemainingSecondRef.current !== 0) {
            StopTimer();
        }
        prevRemainingSecondRef.current = displayTime.remainingSecond;
    }, [displayTime.remainingSecond]);

    useEffect(() => {
        fetchData();
    }, [])

    const formatNumber = number => `0${number}`.slice(-2);
    const getRemaining = time => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        return { hours: formatNumber(hours), minutes: formatNumber(minutes), seconds: formatNumber(seconds) }
    }
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
    const display = (time) => {
        const timeParts = time.split(":");
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        const seconds = parseInt(timeParts[2]);

        return (hours * 3600 + minutes * 60 + seconds);
    }

    const AVAILABLE_HOURS = createArray(24);
    const AVAILABLE_MINUTES = createArray(60);
    const AVAILABLE_SECONDS = createArray(60);
    let interval = null;
    const { hours, minutes, seconds } = getRemaining(displayTime.remainingSecond);

    // xóa nội dung content
    const clearContent = () => {
        setNewContent('');
    }

    // xóa bộ hẹn giờ 
    const deleteTimer = async (id) => {
        try {
            await firebase.firestore().collection('timer').doc(id).delete();
            fetchData();
            // const filteredTimer = timerArr.filter(item => item.id !== id);
            // setTimerArr(filteredTimer);
            console.log("timerArr : " + timerArr);
            setDisplayTime({
                ...displayTime,
                time: '00:00:00',
                remainingSecond: 0,
            });
            console.log('Đã xóa tài liệu thành công');
        } catch (error) {
            console.error('Lỗi khi xóa tài liệu: ', error);
        }
    }

    // 2 -> 1
    const Add = () => {
        setActived(1);
    }

    // 1 -> 2
    const cancel = () => {
        setActived(2);
        setStateTimer({
            selectedMinutes: "00",
            selectedHours: "00",
            selectedSeconds: "00",
        })
    }

    // 1 -> 2
    const fetchData = async () => {
        try {
            const querySnapshot = await firebase.firestore().collection("timer").get();

            const fetchedData = [];
            querySnapshot.forEach((doc) => {
                fetchedData.push({ id: doc.id, ...doc.data() });
            });

            setTimerArr(fetchedData); // Cập nhật state với dữ liệu từ Firestore
        } catch (error) {
            console.error("Lỗi khi đọc dữ liệu:", error);
        }
    };

    // 1 -> 2
    const AddTimer = async () => {
        try {
            const newTime = `${stateTimer.selectedHours}:${stateTimer.selectedMinutes}:${stateTimer.selectedSeconds}`;
            console.log(newTime);
            console.log(newContent);
            if (stateTimer.selectedHours == 0 && stateTimer.selectedMinutes == 0 && stateTimer.selectedSeconds == 0) {
                alert("bạn đang để trống !");
            }
            else {
                const newTimer = { time: newTime, content: newContent };
                const existingTimer = timerArr.find(timer => timer.content == newTimer.content && timer.time == newTimer.time);
                if (!existingTimer) {
                    // Thêm dữ liệu vào collection "time" và document sẽ tự động được tạo
                    const addedDocRef = await firebase.firestore().collection('timer').add(newTimer);
                    console.log('Document đã được thêm với ID: ', addedDocRef.id);
                    setStateTimer({
                        selectedMinutes: "00",
                        selectedHours: "00",
                        selectedSeconds: "00",
                    })
                    clearContent();
                    console.log(timerArr);
                    setDisplayTime({ ...displayTime, time: '00:00:00' });
                    setActived(2);
                }
                else {
                    alert("đã tồn tại hẹn giờ này !");
                }
            }
        } catch (error) {
            console.error('Lỗi khi thêm dữ liệu: ', error);
        }
    }

    // 2 -> 3
    const RunTimer = () => {
        if (displayTime.remainingSecond == 0) {
            alert('bạn chưa chọn bộ hẹn giờ !');
        }
        else {
            setActived(3);
            A3Content.current = displayTime.content;
            interval = setInterval(() => {
                setDisplayTime(state => {
                    const newRemainingSecond = state.remainingSecond - 1;
                    if (newRemainingSecond <= 0) {
                        clearInterval(interval);
                    }
                    // console.log(state.remainingSecond);
                    return {
                        remainingSecond: newRemainingSecond
                    };
                });

            }, 1000);
        }
    }

    // 3 -> 2
    const StopTimer = () => {
        clearInterval(interval);
        interval = null;
        setActived(2);
        setDisplayTime({
            ...displayTime,
            time: '00:00:00',
            remainingSecond: 0,
        });
    }

    // actived = 1
    const createTimer = () => (
        <ScrollView style={styles.croll}>
            <View style={styles.cTimer}>
                <View style={styles.cTitle}>
                    <Text style={styles.cTitleText}>
                        Thêm hẹn giờ
                    </Text>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        mode='dropdown'
                        selectedValue={stateTimer.selectedHours}
                        onValueChange={itemValue => {
                            setStateTimer({ ...stateTimer, selectedHours: itemValue })
                        }}
                    >
                        {
                            AVAILABLE_HOURS.map(value => (
                                <Picker.Item key={value} label={value} value={value} />
                            ))
                        }
                    </Picker>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        mode='dropdown'
                        selectedValue={stateTimer.selectedMinutes}
                        onValueChange={itemValue => {
                            setStateTimer({ ...stateTimer, selectedMinutes: itemValue });
                            console.log(stateTimer.selectedMinutes)
                        }}
                    >
                        {
                            AVAILABLE_MINUTES.map(value => (
                                <Picker.Item key={value} label={value} value={value} />
                            ))
                        }
                    </Picker>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        mode='dropdown'
                        selectedValue={stateTimer.selectedSeconds}
                        onValueChange={itemValue => {
                            setStateTimer({ ...stateTimer, selectedSeconds: itemValue })
                        }}
                    >
                        {
                            AVAILABLE_SECONDS.map(value => (
                                <Picker.Item key={value} label={value} value={value} />
                            ))
                        }
                    </Picker>
                </View>

                <View style={styles.content}>
                    <View style={styles.boxBtn}>
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            placeholder="Nội dung"
                            placeholderTextColor='#999'
                            defaultValue={newContent}
                            onChangeText={text => setNewContent(text)}
                        />
                        <TouchableOpacity
                            onPress={clearContent}
                            style={styles.boxIcon}
                        >
                            <Icon style={styles.icon} name='close' size={22} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ring}>
                        <Text style={styles.ringText}></Text>
                    </View>
                </View>

                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        onPress={cancel}
                        style={styles.btn}
                    >
                        <Text style={styles.btnText}>HỦY</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            AddTimer();
                            fetchData();
                            console.log(timerArr);
                        }}
                        style={styles.btn}
                    >
                        <Text style={styles.btnText}>THÊM</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )

    // actived = 2
    const ListTimer = () => (
        <View style={styles.lContainer}>
            <TouchableOpacity
                onPress={RunTimer}
                style={styles.btnRun}
            >
                <Icon style={styles.icon} name='play' size={35} />
            </TouchableOpacity>
            <View style={styles.ltime}>
                <Text style={styles.ltimeText}>{displayTime.time}</Text>
            </View>
            <View style={styles.headerTitle}>
                <Text style={styles.lTitleText}>Bộ hẹn giờ thường dùng</Text>
                <TouchableOpacity
                    onPress={Add}
                >
                    <Text style={styles.TextAdd}>Thêm</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={styles.listTimer}>
                    {
                        timerArr.map((item, index) => (
                            <View
                                key={index}
                                style={styles.timerContainer}
                            >
                                <TouchableOpacity
                                    style={styles.timerItem}
                                    onPress={() => {
                                        setDisplayTime({
                                            time: item.time,
                                            remainingSecond: display(item.time),
                                            content: item.content,
                                        });
                                        console.log(displayTime);
                                        console.log(item);
                                    }}
                                >
                                    <View style={styles.timeTitle}>
                                        <Text style={styles.timeText}>{item.content}</Text>
                                    </View>
                                    <View style={styles.timeBox}>
                                        <Text style={styles.timeText}>{item.time}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => deleteTimer(item.id)}
                                    style={styles.timerItemDelete}
                                >
                                    <Icon style={styles.timerIcon} name='close' size={22} />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )

    // activated = 3
    const CountDowmTime = () => (
        <View style={styles.cdContainer}>
            <Text style={styles.cdTitle}>Đếm ngược thời gian nè (づ￣ 3￣)づ</Text>
            <Text style={styles.timerText}>{`${hours}:${minutes}:${seconds}`}</Text>
            <Text style={styles.cdContent}>{A3Content.current}</Text>
            <TouchableOpacity
                onPress={StopTimer}
                style={styles.btnStop}
            >
                <Icon style={styles.icon} name='stop' size={35} />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            {
                //actived ? createTimer() : ListTimer()
                actived == 1 ? createTimer() :
                    actived == 2 ? ListTimer() :
                        actived == 3 ? CountDowmTime() :
                            null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#07121B",
        // alignItems: "center",
        // justifyContent: "center"
    },

    croll: {

    },
    // create timer

    cTimer: {
        alignItems: 'center',
    },
    cTitle: {
        marginBottom: 50,
        marginTop: 80,
    },
    cTitleText: {
        fontSize: 32,
        color: '#fff',
    },
    pickerContainer: {
        width: '90%',
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: '#ECECEC',
    },
    picker: {
        flex: 1,
        maxWidth: 130,
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

    // end - create timer

    // content
    content: {
        backgroundColor: '#ECECEC',
        width: '90%',
        padding: 20,
        marginTop: 40,
        borderRadius: 25,
    },
    boxBtn: {
        borderBottomWidth: 1.5,
        borderBottomColor: '#000',
        position: 'relative',
    },
    input: {
        marginBottom: 6,
        fontSize: 14,
        paddingVertical: 8,
        paddingLeft: 4,
        paddingRight: 20,
    },
    boxIcon: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#9c9c9c',
        width: 24,
        height: 24,
        borderRadius: 24 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: '#fff',
    },
    ring: {
        marginVertical: 16,
    },
    ringText: {
        fontSize: 20
    },
    // end - content

    // btn
    btnContainer: {
        width: '90%',
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btn: {
        backgroundColor: '#ECECEC',
        width: 120,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    // end - btn
    // end - timer

    // list timer
    lContainer: {
        flex: 1,
        backgroundColor: "#07121B",
        position: 'relative',
    },
    btnRun: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        backgroundColor: '#3B42EB',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: HEIGHT * 0.15,
        left: WIDTH / 2 - 80 / 2,
        zIndex: 1,
    },
    ltime: {
        width: '100%',
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ltimeText: {
        fontSize: 44,
        color: '#F1F1F1',
    },
    headerTitle: {
        marginVertical: 16,
        marginHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lTitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FEFEFE',
    },
    TextAdd: {
        fontSize: 16,
        color: '#454BB1',
    },
    listTimer: {
        paddingHorizontal: 20,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '45%',
        marginHorizontal: '2.5%',
    },
    timerItem: {
        backgroundColor: '#FEFEFE',
        width: '100%',
        height: 100,
        // flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-around',
        // borderRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 25,
        marginVertical: 10,
        paddingHorizontal: 16,
        position: 'relative',
    },
    timerItemDelete: {
        position: 'absolute',
        top: 0,
        right: -15,
        width: 35,
        height: 35,
        backgroundColor: '#CD3131',
        borderRadius: 35 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: '#07121B'
    },
    timeTitle: {
        flex: 3,
        justifyContent: 'center',
    },
    timeBox: {
        flex: 2,
        marginLeft: 10,
    },
    timeText: {
        fontSize: 20,
        fontWeight: '700',
    },
    timerIcon: {
        color: '#FFF',
    },

    // end - list timer

    // CountDownTime
    cdContainer: {
        flex: 1,
        backgroundColor: "#07121B",
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    cdTitle: {
        color: '#fff',
        marginBottom: 10,
    },
    timerText: {
        color: "#fff",
        fontSize: 90,
        marginBottom: 100,
    },
    cdContent: {
        width: '70%',
        color: '#FFF',
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 1.5,
        lineHeight: 28,
        textAlign: 'center',
        marginBottom: 30,
    },
    btnStop: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        backgroundColor: '#3B42EB',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: HEIGHT * 0.15,
        left: WIDTH / 2 - 80 / 2,
        zIndex: 1,
    },
    // end - CountDownnTime
});