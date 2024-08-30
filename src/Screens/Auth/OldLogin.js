//import liraries
import React, { Component, useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { AppButton, AppTextInput, StatusBar, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationService from '../../Services/Navigation';
import { useRoute } from '@react-navigation/native';
import Toast from "react-native-simple-toast";
import AuthService from '../../Services/Auth';
import { useDispatch } from 'react-redux';
import { setuser } from '../../Redux/reducer/User';

const { height, width } = Dimensions.get('screen')
// create a component
const OldLogin = () => {
    const colors = useTheme()
    const dispatch = useDispatch()
    const route = useRoute()
    const logData = route.params.allData
    console.log('loggggggggggggggggggg', logData);
    const [mobile, setMobile] = useState(logData?.mobile_no)
    const [password, setPassword] = useState('')
    const [buttonLoader, setButtonLoader] = useState(false);

    const getLogin = () => {
        let hasError = false;
        if (mobile == '') {
            Toast.show('Enter Register Mobile Number');
            hasError = true;
            return false
        } 
        if (password == '') {
            Toast.show('Please enter password');
            hasError = true;
            return false
        } 
        if (hasError) return;
        let data = {
            "mobile_no": mobile,
            "password": password
        }
        console.log('putttttttttttttttttttttt', data);
        setButtonLoader(true)
        AuthService.setLogin(data)
            .then((res) => {
                if (res && res.error == false) {
                    Toast.show(res.message);
                    AuthService.setAccount(res.data);
                    AuthService.setToken(res?.data?.token);
                    dispatch(setuser(res.data))
                    setButtonLoader(false)
                } else {
                    Toast.show(res.message);
                    setButtonLoader(false)
                }
            })
            .catch((err) => {
                setButtonLoader(false)
                console.log('errr', err);

            })
    }

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
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Mobile</Text>
                <AppTextInput
                    editable={false}
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    value={mobile}
                    onChangeText={(val) => setMobile(val)}
                    keyboardType='number-pad'
                />
                <Text style={{ ...styles.input_title, marginTop: moderateScale(15), color: colors.secondaryFontColor }}>Password</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Enter Password'
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                />
                <AppButton
                    textStyle={{ ...styles.buttn_txt, color: colors.buttontxtColor }}
                    style={styles.button_sty}
                    title="Login"
                    onPress={() => getLogin()}
                    loader={buttonLoader ? { position: "right", color: "#fff", size: "small" } : null}
                    disabled={buttonLoader}
                />
                <Text style={{ ...styles.forgot_passwoard, color: colors.secondaryFontColor }}>Forgot Password ?</Text>
                <Text style={{ ...styles.forgot_passwoard, marginTop: moderateScale(3), color: colors.secondaryFontColor }}>Don't have an account ? <Text
                    style={{ color: colors.buttonColor }}
                    onPress={() => NavigationService.navigate('Signup')}
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
        width: width - moderateScale(40),
        borderRadius: moderateScale(7),
        alignSelf: 'center',
        marginTop: moderateScale(20)
    },
    forgot_passwoard: {
        fontFamily: FONTS.Jost.regular,
        fontSize: moderateScale(13),
        textAlign: 'center',
        marginTop: moderateScale(10)
    }
});

//make this component available to the app
export default OldLogin;
