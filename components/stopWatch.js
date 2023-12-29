import React, { Component } from "react";
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles/StyleStop";

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) }
}

const createArray = length => {
    const arr = [];
    let i = 0;
    while (i < length) {
        arr.push(i.toString());
        i += 1;
    }
    return arr;
}

const AVAILABLE_MINUTES = createArray(10);
const AVAILABLE_SECONDS = createArray(60);



export default class StopWatch extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        remainingSeconds: 5,
        isRunning: false,
        selectedMinutes: "0",
        selectedSeconds: "5"
    }

    interval = null;

    componentDidUpdate = (prevProp, prevState) => {
        if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
            this.stop();
        }
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    start = () => {
        this.setState(state => ({
            remainingSeconds:
                parseInt(state.selectedMinutes, 10) * 60 +
                parseInt(state.selectedSeconds, 10),
            isRunning: true
        }));
        this.interval = setInterval(() => {
            this.setState(state => ({
                remainingSeconds: state.remainingSeconds - 1
            }));
        }, 1000);
    }

    stop = () => {
        clearInterval(this.interval);
        this.interval = null;
        this.setState({
            remainingSeconds: 5,
            isRunning: false
        })
    }

    renderPickers = () => (
        <View style={styles.pickerContainer}>
            <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={this.state.selectedMinutes}
                onValueChange={itemValue => {
                    this.setState({ selectedMinutes: itemValue });
                }}
                mode="dropDown"
            >
                {
                    AVAILABLE_MINUTES.map(value => (
                        <Picker.Item key={value} label={value} value={value} />
                    ))
                }
            </Picker>
            <Text style={styles.pickerText}>minutes</Text>
            <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={this.state.selectedSeconds}
                onValueChange={itemValue => {
                    this.setState({ selectedSeconds: itemValue });
                }}
                mode="dropDown"
            >
                {
                    AVAILABLE_SECONDS.map(value => (
                        <Picker.Item key={value} label={value} value={value} />
                    ))
                }
            </Picker>
            <Text style={styles.pickerText}>seconds</Text>
        </View>
    );

    render() {
        const { navigation } = this.props;
        const { minutes, seconds } = getRemaining(this.state.remainingSeconds);
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                {
                    this.state.isRunning ? (
                        <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
                    ) : (
                        this.renderPickers()
                    )
                }
                {
                    this.state.isRunning ? (
                        <TouchableOpacity
                            onPress={this.stop}
                            style={[styles.button, styles.buttonStop]}
                        >
                            <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={this.start}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Start</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        );
    }
}