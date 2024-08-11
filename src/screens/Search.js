import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { Component, useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Images } from '../utils/Images'
import { Colors } from '../utils/Colors'
import database, { firebase } from '@react-native-firebase/database';



const { height, width } = Dimensions.get('screen')

export const Search = () => {
    const [inputText, setinputText] = useState('')
    const [Data, setData] = useState([])


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
                marginHorizontal: 10
            }}>

            <ScrollView>

                {/* search input */}
                <View
                    style={{
                        backgroundColor: '#DEF9C4',
                        margin: 20,
                        borderRadius: 30

                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                        }}>
                        <Image
                            style={{
                                alignSelf: 'center',
                                height: 30,
                                width: 35,
                                objectFit: 'scale-down',
                                marginHorizontal: 15
                            }}
                            source={Images.Search} />
                        <TextInput
                            style={{
                                // backgroundColor: 'yellow',
                                width: width / 1.8,
                                color: '#000'
                            }}
                            placeholder='Search'
                            placeholderTextColor={'#bcbcbc'}
                            value={inputText}
                            onChangeText={(val) => setinputText(val)}
                        />

                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                                backgroundColor: '#468585',
                                padding: 15,
                                borderTopRightRadius: 30,
                                borderBottomRightRadius: 30
                            }}>
                            <Text
                                style={{
                                    color: '#000',
                                    fontWeight: '500'
                                }}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {/* product */}
                <View
                    style={{
                        paddingBottom: 100
                    }}>
                    <Text
                        style={{
                            color: '#000',
                            fontWeight: '900',
                            fontSize: 20
                        }}>
                        Products
                    </Text>
                    <FlatList
                        scrollEnabled={false}
                        keyExtractor={item => item.id}
                        data={Data}
                        renderItem={({ item }) => {

                            if (inputText === "") {
                                return (
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
                                            onPress={() => { Linking.openURL(`tel:${Number(item.mobile)}`) }}
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
                                )

                            }
                            if (item.name.toLowerCase().includes(inputText.toLowerCase())) {
                                return (
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
                                            onPress={() => { Linking.openURL(`tel:${Number(item.mobile)}`) }}
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

                                    </TouchableOpacity>)
                            } else {
                                return null
                            }


                        }}

                    />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
