import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Bids } from '../../screens/Profile'
import { Product_add } from '../../screens/Product_add'
import { Search } from '../../screens/Search'
import { Home } from '../../screens/Home'
import { Image, Text, Vibration, View } from 'react-native'
import { Images } from '../../utils/Images'
import { Colors } from '../../utils/Colors'
import { Profile_Menu } from '../../screens/Profile_Menu'


const Tab = createBottomTabNavigator()
export const Bottom_Tab_nav = () => {
    return (

        <Tab.Navigator
            initialRouteName='home'

            screenOptions={{

                tabBarShowLabel: false,
                tabBarActiveTintColor: "white",
                headerShown: false,
                tabBarStyle: {

                    position: 'absolute',
                    backgroundColor: Colors.Black,
                    // margin: 10,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 70
                },

            }}

        >
            <Tab.Screen
                name="home"
                component={Home}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <View
                                style={{
                                    padding: focused ? 10 : 0,
                                    borderRadius: 45,
                                    backgroundColor: focused ? Colors.Inactive_Tab : null,
                                }}>
                                <Image
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? Colors.Active_Tab : Colors.Inactive_Tab
                                    }}
                                    source={Images.Home} />
                            </View>
                        </>
                    )

                }}
            />
            <Tab.Screen
                name="search"
                component={Search}
                options={

                    {

                        tabBarIcon: ({ focused }) => (
                            <>
                                <View
                                    style={{
                                        padding: focused ? 10 : 0,
                                        borderRadius: 45,
                                        backgroundColor: focused ? Colors.Inactive_Tab : null,
                                    }}>
                                    <Image
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused ? Colors.Active_Tab : Colors.Inactive_Tab
                                        }}
                                        source={Images.Search} />
                                </View>
                            </>
                        )
                    }}
            />
            <Tab.Screen
                name="add"
                component={Product_add}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <View
                                style={{
                                    padding: focused ? 10 : 0,
                                    borderRadius: 45,
                                    backgroundColor: focused ? Colors.Inactive_Tab : null,
                                }}>
                                <Image
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? Colors.Active_Tab : Colors.Inactive_Tab
                                    }}
                                    source={Images.Add} />
                            </View>

                        </>
                    )
                }}
            />
            <Tab.Screen
                name="bid"
                component={Bids}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <View
                                style={{
                                    padding: focused ? 10 : 0,
                                    borderRadius: 45,
                                    backgroundColor: focused ? Colors.Inactive_Tab : null,
                                }}>
                                <Image
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? Colors.Active_Tab : Colors.Inactive_Tab
                                    }}
                                    source={Images.Bid} />
                            </View>
                        </>

                    )

                }}
            />
            <Tab.Screen
                name="menu"
                component={Profile_Menu}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <View
                                style={{
                                    padding: focused ? 10 : 0,
                                    borderRadius: 45,
                                    backgroundColor: focused ? Colors.Inactive_Tab : null,
                                }}>
                                <Image
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? Colors.Active_Tab : Colors.Inactive_Tab
                                    }}
                                    source={Images.Menu} />
                            </View>
                        </>

                    )

                }}
            />
        </Tab.Navigator>
    )

}

