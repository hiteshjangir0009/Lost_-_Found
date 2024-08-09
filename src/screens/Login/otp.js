import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "../../screens/Home"
import { Bottom_Tab_nav } from "../Tab_nav/Tab_nav"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Colors } from "../../utils/Colors"
import { Images } from "../../utils/Images"


const { width, height } = Dimensions.get('window')
export const Otp = () => {
    return (
        <SafeAreaView
            style={{
                backgroundColor: Colors.White
            }}>
            <ScrollView automaticallyAdjustKeyboardInsets={true} >


                {/* Upper deck */}
                <View
                    style={{
                        height: height / 2
                    }}>
                    <Image
                    style={{
                        height:height/2,
                        width:width
                    }} 
                    source={Images.Login}
                    />
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
                            marginTop:40
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
                            (+91 1232131232)
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
                            maxLength={6}
                            keyboardType="phone-pad"
                            placeholder="e.g. XXXXXX"
                            placeholderTextColor={Colors.Text_light_color}

                        />
                    </View>

                    {/* Login button */}
                    <View>
                        <TouchableOpacity
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


                </View>
            </ScrollView>


        </SafeAreaView>

    )

}
