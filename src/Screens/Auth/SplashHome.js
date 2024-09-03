//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { StatusBar } from 'react-native-basic-elements';
import NavigationService from '../../Services/Navigation';

const { height, width } = Dimensions.get('screen')
// create a component
const SplashHome = () => {
    
    useEffect(() => {
        setTimeout(() => {
            NavigationService.navigate('BottomTab');
        }, 3000);

    }, []);

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"
                translucent={true}
            />
            <Image source={require('../../assets/images/Splash.png')}
                style={styles.splash_logo}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    splash_logo: {
        height: height,
        width: width
    }
});

//make this component available to the app
export default SplashHome;
