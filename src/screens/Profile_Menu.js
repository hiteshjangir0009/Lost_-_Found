import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Touchable, Alert, Image, ScrollView, FlatList, PermissionsAndroid } from 'react-native';
import { Colors } from '../utils/Colors';
import storage from '@react-native-firebase/storage';
import database, { firebase } from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePicker from 'react-native-image-crop-picker';

// import { Colors } from 'react-native/Libraries/NewAppScreen';



export const Profile_Menu = () => {
    const [Data, setData] = useState(null)
    const [Path, setPath] = useState('')
    const [Name, setName] = useState('')
    const [State, setState] = useState('')
    const [Category, setCategory] = useState('')
    const [Location, setLocation] = useState('')
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
        requestCameraPermission()
        // Camer_launch()
    }, [])


    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'FindIt App Camera Permission',
                    message:
                        'FindIt App needs access to your camera ' +
                        'so you can take Lost item pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    // launch camera
    const Camer_launch = async () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(result => {
            // setData(result)
            setPath(result.path)
            console.log(result);
        });
    }


    const Store = async () => {

        const reference = storage().ref(Name);
        // path to existing file on filesystem
        const pathToFile = `${Path}`;
        // uploads file
        await reference.putFile(pathToFile)

        const url = await storage().ref(Name).getDownloadURL();

        firebase.app().database('https://lost-and-found-ebc2a-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`Bids/${Mobile}`)
            .set({
                name: Name,
                state: State,
                category: Category,
                Image: url,
                mobile: Mobile
            })
            .then(result => console.log("data set"))
        setData(null)
        setName('')
        setLocation('')

    }

    return (
        <ScrollView
            style={{
                marginHorizontal: 10
            }}>

            {/* header */}
            <View
                style={{
                    marginVertical: 20
                }}>
                <Text
                    style={{
                        color: '#000',
                        fontSize: 25,
                        fontWeight: '900'
                    }}>
                    Open Bids
                </Text>
            </View>

                
            
        </ScrollView >
    )
}

