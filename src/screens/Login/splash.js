import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Colors } from "../../utils/Colors";




const Splash_screen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            checkLogin();
        }, 2500)
    }, [])



    const checkLogin = async () => {
        const data = await AsyncStorage.getItem('Mobile')
        console.log(data)


        if (data !== null) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'homeTab' }],
                }),
            );
        }
        else {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'login' }],
                }),
            );
        }
    }



    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >

            <Text
                style={{
                    color: Colors.Text_color,
                    fontSize: 30
                }}
            >
                FindIt
            </Text>
        </View>
    )
}
export default Splash_screen