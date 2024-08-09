import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Profile } from '../../screens/Profile'
import { Product_add } from '../../screens/Product_add'
import { Search } from '../../screens/Search'
import { Home } from '../../screens/Home'
import { Image, Text } from 'react-native'
import { Images } from '../../utils/Images'
import { Colors } from '../../utils/Colors'


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
                    backgroundColor: '#587765',
                    margin: 10,
                    borderRadius: 30,
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
                            <Image
                                style={{ width: 35, height: 35, tintColor: focused ? Colors.Active_Tab : Colors.Inactive_Tab }}
                                source={Images.Home} />
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
                                <Image
                                    style={{ width: 35, height: 35, tintColor: focused ? Colors.Active_Tab : Colors.Inactive_Tab }}
                                    source={Images.Search} />
                            </>
                        )
                    }}
            />
            <Tab.Screen
                name="cart"
                component={Product_add}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Image
                                style={{ width: 35, height: 35, tintColor: focused ? Colors.Active_Tab : Colors.Inactive_Tab }}
                                source={Images.Add} />
                        </>
                    )
                }}
            />
            <Tab.Screen
                name="menu"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Image
                                style={{ width: 35, height: 35, tintColor: focused ? Colors.Active_Tab : Colors.Inactive_Tab }}
                                source={Images.Menu} />
                        </>

                    )

                }}
            />
        </Tab.Navigator>
    )

}

