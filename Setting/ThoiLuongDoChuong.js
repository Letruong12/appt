import React,{useState} from "react";
import {ScrollView, TouchableOpacity, StyleSheet, Image, Text, View} from 'react-native';

export default Tldc =({navigation})=>{
    const [selectedItem, setSelectedItem] = useState(null);

    const checkboxItems = [
        { id: 1, label: '1 phút' },
        { id: 2, label: '2 phút' },
        { id: 3, label: '3 phút' },
        { id: 4, label: '4 phút' },
        { id: 5, label: '5 phút' },
        { id: 6, label: '6 phút' },
        { id: 7, label: '7 phút' },
        { id: 8, label: '8 phút' },
        { id: 9, label: '9 phút' },
        { id: 10, label: '10 phút' },
    ];

    const handleCheckboxPress = (itemId) => {
        if (selectedItem === itemId) {
        setSelectedItem(null);
        } else {
        setSelectedItem(itemId);
        }
    };
    return(
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
                <Text style={styles.header}>Thời lượng đổ chuông</Text>
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.content}>
                    <Text style={styles.title}> Lựa chọn thời lượng đổ chuông</Text>
                    <View style={styles.option}>
                        <TouchableOpacity style={styles.form}>
                        <View>
                            {checkboxItems.map((item) => (
                            <TouchableOpacity
                            key={item.id}
                            onPress={() => handleCheckboxPress(item.id)}
                            style={[
                                styles.checkboxContainer,
                                { backgroundColor: selectedItem === item.id ? 'white' : 'transparent' },
                              ]}>
                            <View style={{ marginRight: 8 }}>
                                <Text style={{
                                    fontSize: selectedItem === item.id ? 20 : 16,
                                    color: selectedItem === item.id ? 'red' : 'white',}}>
                                        {item.label}
                                </Text>
                            </View>
                            </TouchableOpacity>
                        ))}
                        </View>
                        </TouchableOpacity>
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
        color: 'white',
    },
    header1:{
        paddingTop: 40,
        paddingBottom: 10,
        paddingStart: 15,
        flexDirection:"row"
    },
    title:{
        color: '#b8b8b8',
        paddingBottom: 10,
        paddingTop:20,
    },  
    content:{
        paddingTop: 10,
        width: '95%',
        paddingStart: 20,
    },
    option:{
        backgroundColor: '#666',
        borderRadius:10,
        borderColor: '#0011',
    },
    form:{
        paddingHorizontal:5,
        marginTop:20,
        paddingBottom:20,
        paddingHorizontal:20,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginBottom: 8,
        borderRadius: 4,
    },
})
