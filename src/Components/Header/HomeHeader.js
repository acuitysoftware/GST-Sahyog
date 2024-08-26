//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StatusBar, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';

// create a component
const HomeHeader = () => {
    const colors = useTheme()
    return (
    <View>
        <View style={{...styles.container,backgroundColor:colors.cardColor}}>
              <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"
                translucent={true}
            />
            <View style={{...styles.img_view,backgroundColor:colors.buttonColor}}>
                <Image
                source={require('../../assets/images/company.png')}
                style={styles.img_sty}
                />
            </View>
        </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
       height:moderateScale(90),
       elevation:2,
       alignItems:'center',
       
    },
    img_view:{
        height:moderateScale(43),
        width:moderateScale(43),
        borderRadius:moderateScale(24),
        alignSelf:'flex-end',
        marginTop:moderateScale(30),
        marginHorizontal:moderateScale(15),
        alignItems:'center',
        justifyContent:'center'
    },
    img_sty:{
        height:moderateScale(40),
        width:moderateScale(40),
        borderRadius:moderateScale(24),
        resizeMode:'cover'
    }
});

//make this component available to the app
export default HomeHeader;
