import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './BottomTab';


const Stack = createStackNavigator();

// create a component
const UserStack = () => {
  return (
    <Stack.Navigator
            initialRouteName='BottomTab'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="BottomTab" component={BottomTab} />
        </Stack.Navigator>
  );
};

export default UserStack;

