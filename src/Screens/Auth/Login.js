//import liraries
import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { AppButton, AppTextInput, StatusBar, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationService from '../../Services/Navigation';

const { height, width } = Dimensions.get('screen')
// create a component
const Login = () => {
    const colors = useTheme()
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"
                translucent={true}
            />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <Image source={require('../../assets/images/loginscreenlogo.png')}
                    style={styles.loginlogo_img}
                />
                <Text style={{ ...styles.Sahyog_txt, color: colors.secondaryFontColor }}>SAHYOG</Text>
                <View style={styles.welcome_view}>
                    <Text style={{ ...styles.welcome_txt, color: colors.secondaryFontColor }}>Welcome</Text>
                    <Image source={require('../../assets/images/hand.png')}
                        style={styles.hand_img}
                    />
                </View>
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Username</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Enter Username'
                />
                <Text style={{ ...styles.input_title, marginTop: moderateScale(15), color: colors.secondaryFontColor }}>Password</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Enter Password'
                />
                <AppButton
                    textStyle={{...styles.buttn_txt,color:colors.buttontxtColor}}
                    style={styles.button_sty}
                    title="Login"
                onPress={() => NavigationService.navigate('UserStack')}
                />
                <Text style={{...styles.forgot_passwoard,color: colors.secondaryFontColor}}>Forgot Password ?</Text>
                <Text style={{...styles.forgot_passwoard,marginTop:moderateScale(3),color: colors.secondaryFontColor}}>Don't have an account ? <Text
                style={{color:colors.buttonColor}}
                onPress={()=>NavigationService.navigate('Signup')}
                >Signup</Text></Text>

            </KeyboardAwareScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginlogo_img: {
        height: moderateScale(190),
        width: width - moderateScale(150),
        alignSelf: 'flex-end',
        resizeMode: 'contain',
        right: moderateScale(-2)
    },
    hand_img: {
        height: moderateScale(25),
        width: moderateScale(20),
        marginLeft: moderateScale(5)
    },
    Sahyog_txt: {
        fontFamily: FONTS.OpenSans.bold,
        fontSize: moderateScale(27),
        marginTop: moderateScale(40),
        marginHorizontal: moderateScale(20)
    },
    welcome_view: {
        flexDirection: 'row',
        marginHorizontal: moderateScale(20),
        alignItems: 'center',
    },
    welcome_txt: {
        fontFamily: FONTS.Jost.regular,
        fontSize: moderateScale(28)
    },
    input_title: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Jost.regular,
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(30)
    },
    inputcontainer_sty: {
        borderWidth: 0,
        alignSelf: 'center',
        height: moderateScale(45),
        borderRadius: moderateScale(5),
        borderWidth: 1,
        paddingLeft: moderateScale(7),
        marginHorizontal: moderateScale(15)
    },
    text_input: {
        fontFamily: FONTS.Jost.medium,
        fontSize: moderateScale(12)
    },
    buttn_txt: {
        fontFamily: FONTS.Jost.medium,
        fontSize: moderateScale(15)
    },
    button_sty: {
        height: moderateScale(48),
        width: width-moderateScale(40),
        borderRadius: moderateScale(7),
        alignSelf: 'center',
        marginTop: moderateScale(20)
    },
    forgot_passwoard:{
        fontFamily: FONTS.Jost.regular,
        fontSize: moderateScale(13),
        textAlign:'center' ,
        marginTop:moderateScale(10)
    }
});

//make this component available to the app
export default Login;
