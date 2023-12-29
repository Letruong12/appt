import React, { useState } from 'react';
import {ScrollView,Image, TouchableOpacity, StyleSheet, View, Text, Switch, Animated } from 'react-native';

export default function Nvg({navigation}) {
  const [isSwitchOn1, setIsSwitchOn1] = useState(true);
  const [isSwitchOn2, setIsSwitchOn2] = useState(true);

  const handleSwitchToggle1 = () => {
    setIsSwitchOn1(!isSwitchOn1);
  }
  const handleSwitchToggle2 = () => {
    setIsSwitchOn2(!isSwitchOn2);
  }

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
                <Text style={styles.header}> Ngày và Giờ</Text>
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.option}>
                      <View style={styles.form}>
                        <View>
                          <Text style={styles.text}> Thời gian 24 giờ </Text>
                          <Text style={styles.text1}> ( {isSwitchOn1? 'Khi tắt sẽ về thời gian 12 giờ' : 'Khi bật sẽ về thời gian 24 giờ' })</Text>
                        </View>
                        <View style={{paddingEnd:10}}>
                          <Switch value={isSwitchOn1} onValueChange={handleSwitchToggle1} />
                        </View>
                      </View>
                    </View>
                    <Text></Text>
                    <View style={styles.option}>
                      <View style={styles.form}>
                        <View>
                          <Text style={styles.text}>Múi giờ </Text>
                          <Text style={styles.text1}>(Đặt tự động: {isSwitchOn2? 'ON' : 'OFF'})</Text>
                        </View>
                        <View style={{paddingEnd:10}}>
                          <Switch value={isSwitchOn2} onValueChange={handleSwitchToggle2} />
                        </View>
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
        backgroundColor: '#00141C',
    },
    header:{
        fontSize:20,
        fontWeight: "bold",
        paddingLeft: 20,
        color:'white',
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
        backgroundColor: '#666',
        borderRadius:10,
        borderColor: '#0011',
    },
    form:{
      paddingTop: 20,
      paddingStart: 10,
      flexDirection:"row",
      justifyContent:'space-between',
      paddingBottom: 20,
    },
    text:{
      fontSize: 20,
      fontWeight: "bold",
      color:'white',
    },
    text1:{
      paddingTop: 5,
      fontSize: 14,
      fontWeight: 'normal',
      color:'white',
    },
})

    


