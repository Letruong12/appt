import React from 'react';
import {ScrollView,Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';

export default function Gt ({navigation}) {
  return (
    <View style={styles.container}>
            <TouchableOpacity onPress={() => {navigation.navigate("setting")}} style={styles.header1}>
            <View style={{
                backgroundColor: 'white', 
                width: 24, height: 24, 
                borderRadius: 24 / 2,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Image source={require('../assets/arrow1.jpg')} style={{width:10,height:10}}/>
            </View>
                <Text style={styles.header}> Giới thiệu về Đồng hồ</Text>
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.content}>
                <Text style={styles.title}> English </Text>
                    <View>
                        <View style={styles.form}>
                            <Text style={styles.text}>Clock helps you manage your time on iOS, iPadOS and macOS. Check the current time anywhere with World Clock, make sure you wake up on time with Alarms, or keep track of passing time with Stopwatch and Timers.</Text>
                            <Text style={styles.text1}>World Clock</Text>
                            <Text style={styles.text}>Check the current time in cities around the world. Or quickly see the time difference compared to your local time to make coordinating across time zones easy.</Text>
                            <Text style={styles.text1}>Alarms</Text>
                            <Text style={styles.text}>Set regular alarms for any time of day. Choose to set them to repeat on specific days, give them a label and select the sound that plays with each. When your alarm goes off, you can choose to play from a selection of sounds, or pick a song from your Apple Music library.</Text>
                            <Text style={styles.text}>You can also adjust your wake up alarm and sleep schedule from Health right in the Clock app so you can wind down with a Sleep Focus and make sure you always wake up on time.</Text>
                            <Text style={styles.text1}>Stopwatch</Text>
                            <Text style={styles.text}>Measure the duration of an event. You can see how much time has lapsed with either a digital or analog stopwatch face, and you can quickly record laps or splits throughout the time.</Text>
                            <Text style={styles.text1}>Timers</Text>
                            <Text style={styles.text}>Count down seconds, minutes or hours. Or count down using multiple timers, and add labels and distinct sounds to each. You can also choose to set a timer that stops any music playing in the background—perfect for getting to sleep with your favorite playlist.</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
const styles= StyleSheet.create ({
    container:{
        height: 1000,
        backgroundColor:'#00141C',
    },
    header:{
        fontSize:20,
        fontWeight: "bold",
        paddingLeft: 20,
        color:'white'
    },
    header1:{
        paddingTop: 40,
        paddingBottom: 10,
        paddingStart: 15,
        flexDirection:"row"
    },
    content:{
        paddingTop: 10,
        width: '95%',
        paddingStart: 20
    },
    option:{
        backgroundColor:'#0011',
        borderRadius:10,
        borderColor: '#0011',
    },
    form:{
        paddingTop: 10,
        paddingStart: 0,
        paddingBottom: 20,
        paddingEnd: 10,
        justifyContent:'space-between',
    },
    text:{
        fontSize: 14,
        fontWeight: "normal",
        textAlign:'left',
        color:'white',
    },
    text1:{
        fontSize: 15,
        fontWeight: "bold",
        textAlign:'justify',
        paddingTop: 10,
        color:'white',
    },
    title:{
        color: '#b8b8b8',
        paddingBottom: 10,
    },   
})

    


