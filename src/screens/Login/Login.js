import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "../../screens/Home"
import { Bottom_Tab_nav } from "../Tab_nav/Tab_nav"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Colors } from "../../utils/Colors"
import { Images } from "../../utils/Images"
import { useEffect, useState } from "react"
import auth, { firebase } from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage"


const { width, height } = Dimensions.get('window')
export const Login = ({ navigation }) => {
    const [Mobile, setMobile] = useState('')
    const [Code, setCode] = useState('')

    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);



    // Handle login
    async function onAuthStateChanged(user) {
        if (user) {
            console.log(user)
        }
    }



    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle the button press
    async function signInWithPhoneNumber() {
        const confirmation = await auth().signInWithPhoneNumber(`+91 ${Mobile}`);
        setConfirm(confirmation);
    }

    async function confirmCode() {
        try {
            await confirm.confirm(Code);
            AsyncStorage.setItem('Mobile', JSON.stringify(Mobile))
            navigation.navigate('splash')

        } catch (error) {
            console.log('Invalid code.');
        }
    }



    return (
        <SafeAreaView
            style={{
                backgroundColor: Colors.White
            }}>
            <ScrollView automaticallyAdjustKeyboardInsets={true} >

                {confirm == null ?
                    (

                        <>
                            {/* //  Upper deck  */}
                            <View
                                style={{
                                    height: height / 2
                                }}>
                                <Image
                                    style={{
                                        height: height / 2,
                                        width: width
                                    }}
                                    source={Images.Login} />
                            </View>

                            {/* //  Lower deck */}
                            <View
                                style={{
                                    paddingHorizontal: 20,
                                    height: height / 2,
                                    backgroundColor: Colors.Black,
                                    borderTopRightRadius: 30,
                                    borderTopLeftRadius: 30
                                }}>
                                {/* login heading */}
                                <View
                                    style={{
                                        marginTop: 40
                                    }}>
                                    <Text
                                        style={{
                                            color: Colors.Text_White_color,
                                            fontSize: 30,
                                            fontWeight: 'bold'
                                        }}>
                                        Login
                                    </Text>
                                </View>

                                {/* Phone heading */}
                                <View
                                    style={{
                                        marginTop: 50,
                                        marginBottom: 20
                                    }}>
                                    <Text
                                        style={{
                                            color: Colors.Text_White_color,
                                            fontSize: 20,
                                            fontWeight: '500'
                                        }}>
                                        Phone no.
                                    </Text>
                                </View>

                                {/* Number input */}
                                <View
                                    style={{
                                        // marginTop: 60,
                                        marginBottom: 40
                                    }}>
                                    <TextInput
                                        style={{
                                            color: Colors.Text_color,
                                            fontSize: 20,
                                            fontWeight: '500',
                                            backgroundColor: Colors.White,
                                            borderRadius: 10,
                                            paddingHorizontal: 10
                                        }}
                                        maxLength={10}
                                        keyboardType="phone-pad"
                                        placeholder="e.g. 123456xxxx"
                                        placeholderTextColor={Colors.Text_light_color}
                                        value={Mobile}
                                        onChangeText={(val) => setMobile(val)} />
                                </View>

                                {/* Login button */}

                                <TouchableOpacity
                                    onPress={() => {
                                        // navigation.navigate('homeTab')
                                        signInWithPhoneNumber()
                                    }}

                                    style={{
                                        backgroundColor: Colors.White,
                                        paddingVertical: 8,
                                        borderRadius: 10
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.Text_color,
                                            fontSize: 20,
                                            fontWeight: '900',
                                            textAlign: 'center'
                                        }}>
                                        Enter OTP
                                    </Text>
                                </TouchableOpacity>



                            </View></>

                    )
                    :
                    (

                        <>
                            {/* Upper deck */}
                            <View
                                style={{
                                    height: height / 2
                                }}>
                                <Image
                                    style={{
                                        height: height / 2,
                                        width: width
                                    }}
                                    source={Images.Login} />
                            </View>
                            {/* Lower deck */}
                            <View
                                style={{
                                    paddingHorizontal: 20,
                                    height: height / 2,
                                    backgroundColor: Colors.Black,
                                    borderTopRightRadius: 30,
                                    borderTopLeftRadius: 30
                                }}>

                                {/* Mobile no. */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 40
                                    }}>
                                    <Text
                                        style={{
                                            color: Colors.Text_White_color
                                        }}>
                                        OTP is send to
                                    </Text>
                                    <Text
                                        style={{
                                            color: Colors.Text_White_color,
                                            marginHorizontal: 10
                                        }}>
                                        (+91 {Mobile})
                                    </Text>
                                </View>

                                {/* Phone heading */}
                                <View
                                    style={{
                                        marginTop: 50,
                                        marginBottom: 20
                                    }}>
                                    <Text
                                        style={{
                                            color: Colors.Text_White_color,
                                            fontSize: 20,
                                            fontWeight: '500'
                                        }}>
                                        OTP (One Time Password)
                                    </Text>
                                </View>

                                {/* otp input */}
                                <View
                                    style={{
                                        // marginTop: 60,
                                        marginBottom: 40
                                    }}>
                                    <TextInput
                                        style={{
                                            color: Colors.Text_color,
                                            fontSize: 20,
                                            fontWeight: '500',
                                            backgroundColor: Colors.White,
                                            borderRadius: 10,
                                            paddingHorizontal: 10
                                        }}
                                        maxLength={6}
                                        keyboardType="phone-pad"
                                        placeholder="e.g. XXXXXX"
                                        placeholderTextColor={Colors.Text_light_color}
                                        value={Code}
                                        onChangeText={(val) => setCode(val)} />
                                </View>

                                {/* Login button */}
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            confirmCode()

                                            // navigation.navigate('homeTab')
                                        }}
                                        style={{
                                            backgroundColor: Colors.White,
                                            paddingVertical: 8,
                                            borderRadius: 10
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: Colors.Text_color,
                                                fontSize: 20,
                                                fontWeight: '900',
                                                textAlign: 'center'
                                            }}>
                                            Login
                                        </Text>
                                    </TouchableOpacity>
                                </View>


                            </View></>
                    )
                }

            </ScrollView>


        </SafeAreaView>

    )

}
