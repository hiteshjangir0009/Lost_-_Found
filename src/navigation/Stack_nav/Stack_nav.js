import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "../../screens/Home"
import { Bottom_Tab_nav } from "../Tab_nav/Tab_nav"
import { Login } from "../../screens/Login/Login"
import { Otp } from "../../screens/Login/otp"

const Stack = createNativeStackNavigator()
export const Stack_nav = () => {
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="otp" component={Otp} />
            <Stack.Screen name="homeTab" component={Bottom_Tab_nav} />
        </Stack.Navigator>
    
)

}
