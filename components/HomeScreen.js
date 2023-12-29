import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
            {/* <View style={{ alignItems: 'center' }}>
                <ScrollView horizontal contentContainerStyle={{ marginTop: 20, backgroundColor: '#777', height: 150 }}>
                    <View style={styles.box}>
                        <Text>Box1</Text>
                    </View>
                    <View style={styles.box}>
                        <Text>Box2</Text>
                    </View>
                </ScrollView>
            </View> */}
        </View>

    );
}

const styles = StyleSheet.create({
    box: {
        height: '100%',
        width: 350,
        marginLeft: 10,
        marginRight: 10, 
        backgroundColor: '#23fd34', 
    },
})