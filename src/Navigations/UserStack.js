import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './BottomTab';
import CreateInvoice from '../Screens/Home/CreateInvoice';
import AddCustomerFrom from '../Screens/Home/AddCustomerFrom';


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
            <Stack.Screen name="CreateInvoice" component={CreateInvoice} />
            <Stack.Screen name="AddCustomerFrom" component={AddCustomerFrom} />
        </Stack.Navigator>
  );
};

export default UserStack;

