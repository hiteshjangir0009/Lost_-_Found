import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "../../screens/Home"
import { Bottom_Tab_nav } from "../Tab_nav/Tab_nav"
import { Login } from "../../screens/Login/Login"
// import { Otp } from "../../screens/Login/otp"
import { Product_details } from "../../screens/Product_detail"
import Splash_screen from "../../screens/Login/splash"

const Stack = createNativeStackNavigator()
export const Stack_nav = () => {
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="splash" component={Splash_screen} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="homeTab" component={Bottom_Tab_nav} />
            <Stack.Screen name="details" component={Product_details} />
        </Stack.Navigator>
    
)

}
