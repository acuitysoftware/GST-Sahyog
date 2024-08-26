//import liraries
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Splash from '../Screens/Auth/Splash';
import Login from '../Screens/Auth/Login';
import Signup from '../Screens/Auth/Signup';
import SignupDetails from '../Screens/Auth/SignupDetails';



const Stack = createStackNavigator();
// create a component
const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Splash'
            screenOptions={{
                headerShown: false,
            }}
        >
           <Stack.Screen name="Splash" component={Splash} />
           <Stack.Screen name="Login" component={Login} />
           <Stack.Screen name="Signup" component={Signup} />
           <Stack.Screen name="SignupDetails" component={SignupDetails} />
        </Stack.Navigator>
    );
};

export default AuthStack;
