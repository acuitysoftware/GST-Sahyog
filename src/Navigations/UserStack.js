import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './BottomTab';
import CreateInvoice from '../Screens/Home/CreateInvoice';
import AddCustomerFrom from '../Screens/Home/AddCustomerFrom';
import SelectProduct from '../Screens/Home/SelectProduct';
import AddProductFrom from '../Screens/Home/AddProductFrom';
import ShippingAddressFrom from '../Screens/Home/ShippingAddressFrom';
import InvoicePdfScreen from '../Screens/Home/InvoicePdfScreen';


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
            <Stack.Screen name="SelectProduct" component={SelectProduct} />
            <Stack.Screen name="AddProductFrom" component={AddProductFrom} />
            <Stack.Screen name="ShippingAddressFrom" component={ShippingAddressFrom} />
            <Stack.Screen name="InvoicePdfScreen" component={InvoicePdfScreen} />
        </Stack.Navigator>
  );
};

export default UserStack;

