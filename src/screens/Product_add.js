import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Keyboard, KeyboardAvoidingView, PermissionsAndroid, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Vibration, View } from "react-native"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Colors } from "../utils/Colors";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import database, { firebase } from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";


const { width, height } = Dimensions.get('window')
export const Product_add = ({ navigation }) => {
    const [Data, setData] = useState(null)
    const [Path, setPath] = useState('')
    const [Name, setName] = useState('')
    const [Location, setLocation] = useState('')
    const [Mobile, setMobile] = useState(null)

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
            setData(result)
            setPath(result.path)
            console.log(result);
        });
    }
console.log(Mobile);


    // firebase storage
    const Store = async () => {

        const reference = storage().ref(Name);
        // path to existing file on filesystem
        const pathToFile = `${Path}`;
        // uploads file
        await reference.putFile(pathToFile)

        const url = await storage().ref(Name).getDownloadURL();

        firebase.app().database('https://lost-and-found-ebc2a-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`Items/${Name}`)
            .set({
                name: Name,
                location: Location,
                Image: url,
                mobile: Mobile
            })
            .then(result => console.log("data set"))
        setData(null)
        setName('')
        setLocation('')

    }


    return (
        <SafeAreaView>



            {/* Image */}
            <View
                style={{
                    height: height / 3,
                    marginTop: 35,
                    marginBottom: 10
                }}>
                {Data !== null ?
                    (
                        <Image
                            style={{
                                height: height / 3.1,
                                width: width,
                                objectFit: 'contain'
                            }}
                            source={{ uri: Data.path }}
                        />
                    ) : (
                        <View
                            style={{
                                marginVertical: 110
                            }}>
                            <Text
                                style={{
                                    color: Colors.Text_grey_color,
                                    textAlign: 'center',
                                    fontSize: 20

                                }}>
                                No Image found

                            </Text>
                        </View>
                    )}

            </View>


            {/* name */}
            <View>
                <TextInput
                    multiline={true}
                    style={{
                        borderRadius: 10,
                        padding: 10,
                        marginHorizontal: 20,
                        color: Colors.Text_color,
                        backgroundColor: Colors.White
                    }}
                    placeholder="Name"
                    placeholderTextColor={Colors.Text_grey_color}
                    value={Name}
                    onChangeText={(val) => setName(val)}
                />

                <TextInput
                    multiline={true}
                    style={{
                        borderRadius: 10,
                        padding: 10,
                        marginTop: 10,
                        marginHorizontal: 20,
                        color: Colors.Text_color,
                        backgroundColor: Colors.White
                    }}
                    placeholder="Location"
                    placeholderTextColor={Colors.Text_grey_color}
                    value={Location}
                    onChangeText={(val) => setLocation(val)}
                />

            </View>


            {/* buttons */}
            <View
                style={{
                    height: height / 2
                }}>
                <TouchableOpacity
                    onPress={() => Camer_launch()}
                    style={{
                        backgroundColor: Colors.Black,
                        padding: 15,
                        marginHorizontal: 40,
                        marginTop: 50,
                        borderRadius: 10
                    }}>
                    <Text
                        style={{
                            color: Colors.Text_White_color,
                            textAlign: 'center'
                        }}>
                        Take a photo

                    </Text>
                </TouchableOpacity>

                {/* upload image */}
                <TouchableOpacity
                    // onPress={() => Store()}
                    onPress={() => Location == '' || Name == '' || Data == null ? null : Store()}
                    style={{
                        backgroundColor: Location == '' || Name == '' || Data == null ? Colors.Text_grey_color : Colors.Black,
                        padding: 15,
                        marginHorizontal: 40,
                        marginVertical: 40,
                        borderRadius: 10
                    }}>
                    <Text
                        style={{
                            color: Colors.Text_White_color,
                            textAlign: 'center'
                        }}>
                        Upload a photo

                    </Text>
                </TouchableOpacity>
            </View>



        </SafeAreaView>

    )
}