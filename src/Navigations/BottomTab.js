// BottomNavigation_User.js
import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from '../Constants/Colors';
import { FONTS } from '../Constants/Fonts';
import { moderateScale } from '../Constants/PixelRatio';
import Home from '../Screens/Home/Home';
import Invoice from '../Screens/Invoice/Invoice';
import Customer from '../Screens/Customer/Customer';
import Profile from '../Screens/Profile/Profile';
import { useTheme } from 'react-native-basic-elements';
import { Image } from 'react-native';

const Bottom = createBottomTabNavigator();

const BottomTab = ({navigation}) => {
    const colors = useTheme();
    return (
        <Bottom.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primaryThemeColor,
                tabBarInactiveTintColor: colors.secondaryFontColor,
                tabBarLabelStyle: {
                    fontSize: moderateScale(9),
                    fontFamily: FONTS.Jost.medium,
                    marginBottom: moderateScale(12),
                },
                tabBarStyle: {
                    backgroundColor: colors.cardColor,
                    height: moderateScale(60),
                    paddingBottom: 0,
                    paddingTop:moderateScale(4),
                    borderTopRightRadius:moderateScale(30),
                    borderTopLeftRadius:moderateScale(30),
                    elevation:8
                },
            }}
        >
            <Bottom.Screen
                name="Home"
                component={Home}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/images/home.png')}
                            resizeMode='contain'
                            style={{
                                height: moderateScale(focused ? 21 : 20),
                                width: moderateScale(focused ? 21 : 20),
                                tintColor: focused ?colors.buttonColor : colors.shadowColor
                            }}
                        />
                    ),
                }}
            />
            <Bottom.Screen
                name="Invoice"
                component={Invoice}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'Invoice',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/images/invoice.png')}
                            resizeMode='contain'
                            style={{
                                height: moderateScale(focused ? 21 : 20),
                                width: moderateScale(focused ? 21 : 20),
                                tintColor: focused ?colors.buttonColor : colors.shadowColor
                            }}
                        />
                    ),
                }}
            />
            <Bottom.Screen
                name="Customer"
                component={Customer}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'Customer',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/images/customer.png')}
                            resizeMode='contain'
                            style={{
                                height: moderateScale(focused ? 21 : 20),
                                width: moderateScale(focused ? 21 : 20),
                                tintColor: focused ?colors.buttonColor : colors.shadowColor
                            }}
                        />
                    ),
                }}
            />
            <Bottom.Screen
                name="Profile"
                component={Profile}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/images/profile.png')}
                            resizeMode='contain'
                            style={{
                                height: moderateScale(focused ? 21 : 20),
                                width: moderateScale(focused ? 21 : 20),
                                tintColor: focused ?colors.buttonColor : colors.shadowColor
                            }}
                        />
                    ),
                }}
            />
            
        </Bottom.Navigator>
    );
};

export default BottomTab;
