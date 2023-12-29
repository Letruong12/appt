import React from 'react';
import {ScrollView,Image, TouchableOpacity, StyleSheet, View, Text, Switch, Animated } from 'react-native';

export default Qrt = ({navigation}) => {
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
                <Text style={styles.header}> Quyền riêng tư của ứng dụng</Text>
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.content}>
                    <View>
                        <View style={styles.form}>
                            <Text style={styles.text}>Nhà phát triển, Apple, đã cho biết rằng phương thức đảm bảo quyền riêng tư của ứng dụng có thể bao gồm việc xử lý dữ liệu như được mô tả ở bên dưới. Để biết thêm thông tin, hãy xem <Text style={{color:'#3385ff'}}>chính sách quyền riêng tư của nhà phát triển.</Text> </Text>
                            <Text style={styles.text}>Tìm hiểu cách nhà phát triển cho phép bạn <Text style={{color:'#3385ff'}}>quản lý các lựa chọn về quyền riêng tư.</Text></Text>
                            <Text style={{color:'#b8b8b8',textAlign:'center'}}>___________________________________________</Text>
                            <Text style={styles.text}>Để giúp bạn hiểu rõ hơn phản hồi của nhà phát triển, hãy xem <Text style={{color:'#3385ff'}}>Định nghĩa quyền riêng tư và các ví dụ.</Text></Text>
                            <Text style={styles.text}>Phương thức đảm bảo quyền riêng tư có thể khác nhau, chẳng hạn như dựa trên các tính năng bạn sử dụng hoặc độ tuổi của bạn. <Text style={{color:'#3385ff'}}>Tìm hiểu thêm.</Text></Text>
                            <Text style={{color:'#b8b8b8',textAlign:'center'}}>___________________________________________</Text>
                            <View style={styles.nd}>
                                <Image source={require('../assets/user.jpg')} style={{alignSelf:'center',width:30,height:30}}/>
                                <Text style={{textAlign:'center',color: 'white',fontSize: 15,fontWeight:'bold'}}>Dữ liệu Không liên kết với bạn</Text>
                                <Text style={{textAlign:'center',color: 'white',fontSize: 13}}>Dữ liệu sau đây có thể được thu thập nhưng không liên kết với danh tính của bạn:</Text>
                                <Text></Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Image source={require('../assets/id.jpg')} style={{width:30,height:30}}/>
                                        <Text style={{paddingTop:7,color: 'white', paddingLeft:10}}>Mã định danh</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Image source={require('../assets/network.jpg')} style={{width:30,height:30}}/>
                                        <Text style={{paddingTop:7,color: 'white', paddingLeft:10}}>Dữ liệu sử dụng</Text>
                                    </View>
                                </View>
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
        backgroundColor:'#00141C',
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
        backgroundColor:'#666',
        borderRadius:10,
        borderColor: '#0011',
    },
    form:{
        paddingTop: 10,
        paddingStart: 0,
        paddingBottom: 20,
        paddingEnd: 10,
    },
    text:{
        fontSize: 14,
        fontWeight: "normal",
        textAlign:'left',
        paddingTop: 20,
        color:'white'
    },
    nd:{
        paddingTop: 10,
    },
})

    


