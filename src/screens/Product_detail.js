import { Dimensions, Image, Linking, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import database, { firebase } from '@react-native-firebase/database';
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Colors } from "../utils/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Colors } from "react-native/Libraries/NewAppScreen";


const { width, height } = Dimensions.get('window')
export const Product_details = () => {
    const [Data, setData] = useState([])
    const [Mobile, setMobile] = useState('')


    const routes = useRoute()

    const { productid } = routes.params

    const Userid = async () => {
        const id = await AsyncStorage.getItem('Mobile')
        setMobile(id)
    }
    useEffect(() => {
        Userid()
    }, [])


    useEffect(() => {
        const onValueChange =
            firebase
                .database()
                .ref(`/Items/`)
                .on('child_added', snapshot => {
                    console.log('User data: ', snapshot.val())
                    setData(state => [...state, snapshot.val()])
                });

        // Stop listening for updates when no longer required
        return () => database().ref(`/Items`).off('child_added', onValueChange);
    }, []);

    const selected = Data.find(item => {
        return productid == item.name
    })


    return (
        <SafeAreaView
            style={{
                marginHorizontal: 10
            }}>

            {/* Image */}
            <View
                style={{
                    marginVertical: 50
                }}>
                <Image
                    style={{
                        height: height / 2,
                        width: Dimensions.get('screen'),
                        objectFit: 'scale-down'
                    }}
                    source={{ uri: selected?.Image }} />
            </View>

            {/* details */}
            <View>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: '700',
                        color: Colors.Text_color,
                        textAlign: 'center'
                    }}>
                    {selected?.name}
                </Text>

                <Text
                    style={{
                        marginVertical: 20,
                        fontSize: 23,
                        fontWeight: '700',
                        color: Colors.Text_color,
                        // textAlign:'center'
                    }}>
                    location:-  {selected?.location}
                </Text>
                <Text
                    style={{
                        marginVertical: 20,
                        fontSize: 23,
                        fontWeight: '700',
                        color: Colors.Text_color,
                        // textAlign:'center'
                    }}>
                    Founder:-  {selected?.location}
                </Text>

            </View>

            {/* buttons */}
            <TouchableOpacity
                onPress={() => { Linking.openURL(`tel:${selected?.mobile}`) }}
                style={{
                    backgroundColor: Colors.Black,
                    padding: 15,
                    marginHorizontal: 40,
                    marginTop: 30,
                    borderRadius: 10
                }}>
                <Text
                    style={{
                        color: Colors.Text_White_color,
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: 20
                    }}>
                    Claim
                </Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}