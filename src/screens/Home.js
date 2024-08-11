import { Dimensions, FlatList, Image, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../utils/Colors"
import { Images } from "../utils/Images"
import { useEffect, useState } from "react"
import firestore from '@react-native-firebase/firestore';
import database, { firebase } from '@react-native-firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('window')
export const Home = ({ navigation }) => {
    const [Data, setData] = useState([])
    const [Mobile, setMobile] = useState('')

    const Userid = async () => {
        const id = await AsyncStorage.getItem('Mobile')
        setMobile(id)
    }
    // console.log(Mobile)


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



    return (
        <SafeAreaView
            style={{
                backgroundColor: Colors.White
            }}>
            <ScrollView
                style={{
                    position: 'static',
                    // marginBottom:50,
                    paddingBottom: 20
                }}>


                {/* Header */}
                <View
                    style={{
                        paddingHorizontal: 10,
                        // height: height / 6,
                        // backgroundColor: Colors.Black,
                        paddingTop: 30,
                    }}>
                    <Text
                        style={{
                            color: Colors.Text_color,
                            fontSize: 30,
                            fontWeight: '500'
                        }}>
                        FindIt
                    </Text>
                </View>

                {/* bottom deck */}
                <View
                    style={{
                        marginVertical: 20,
                        marginHorizontal: 10
                    }}>

                    {/* display */}
                    <View>
                        <Image
                            style={{

                                height: height / 4,
                                width: Dimensions.get('screen'),
                                objectFit: 'cover'

                            }}
                            source={Images.Poster}
                        />
                    </View>


                    {/* Product */}
                    <View>
                        <Text
                            style={{
                                color: Colors.Text_color,
                                fontSize: 20,
                                fontWeight: '700',
                                marginVertical: 10
                            }}>
                            Products
                        </Text>
                    </View>
                    <View
                        style={{
                            marginBottom: 80
                        }}>

                        <FlatList
                            scrollEnabled={false}
                            data={Data}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('details', { productid: item.name })}
                                    style={{

                                        backgroundColor: "#D2EBCD",
                                        marginBottom: 5,
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        padding: 5,
                                        borderRadius: 10,
                                    }}>
                                    <View
                                        style={{
                                            // backgroundColor: Colors.White,
                                            // padding: 10,
                                        }}>
                                        <Image
                                            style={{
                                                marginVertical: 5,
                                                borderRadius: 30,
                                                height: 60,
                                                width: 60,
                                                objectFit: 'cover'
                                            }}
                                            source={{ uri: item.Image }}
                                        />
                                    </View>



                                    {/* details */}
                                    <View
                                        style={{
                                            width: width / 2
                                        }}>
                                        <Text
                                            style={{
                                                color: Colors.Text_color,
                                                fontSize: 15,
                                                fontWeight: '500'
                                            }}>
                                            {item.name}
                                        </Text>
                                        <Text
                                            numberOfLines={3}
                                            style={{
                                                color: Colors.Text_color,
                                                fontSize: 15,
                                                // fontWeight: ''
                                            }}>
                                            {item.location}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => { Linking.openURL(`tel:${item.mobile}`) }}
                                        style={{
                                            backgroundColor: Colors.Yellow,
                                            alignSelf: 'center',
                                            padding: 10,
                                            borderRadius: 10
                                        }}>
                                        <Text
                                            style={{
                                                color: Colors.Text_color,
                                                fontSize: 15,
                                                fontWeight: '500'
                                            }}>
                                            Claim
                                        </Text>
                                    </TouchableOpacity>

                                </TouchableOpacity>
                            )} />
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>

    )
}