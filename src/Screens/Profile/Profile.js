//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { AppButton, AppTextInput, Icon, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

const { height, width } = Dimensions.get('screen')
// create a component
const Profile = () => {
    const colors = useTheme()
    const { userData } = useSelector(state => state.User)
    // console.log('userdataaaaaaaaaaaaaaaaaaaa', userData);

    // useEffect(() => {

    // }, [])
    // const getUserUpdateAcc = (() => {
    //     let data = {
    //         "auth_signature": "",
    //         "name": "",
    //         "phone": "",
    //         "email": "",
    //         "password": "",
    //         "image": "",
    //         "userid": "",
    //         "token": ""
    //     }
    // })
    return (
        <View style={styles.container}>
            <BackHeader title='My Account' />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ ...styles.topimg_view, backgroundColor: colors.secondaryThemeColor }}>
                        <Image source={require('../../assets/images/security.png')} style={styles.img_sty} />
                    </View>
                    <TouchableOpacity style={{ ...styles.camera_view, backgroundColor: colors.buttonColor }}>
                        <Icon name='camera' size={18} type='AntDesign' color={colors.secondaryThemeColor} />
                    </TouchableOpacity>
                </View>
                <View style={styles.img_view}>
                    <View style={{ ...styles.img_bix, borderColor: colors.borderColor }}>
                        <Image source={require('../../assets/images/addimg_logo.png')} style={styles.add_img} />
                    </View>
                    <View style={{ ...styles.upload_view, borderColor: colors.buttonColor }}>
                        <Text style={{ ...styles.upload_txt, color: colors.buttonColor }}>Upload Signature</Text>
                        <Icon name='upload-to-cloud' type='Entypo' color={colors.buttonColor} />
                    </View>
                </View>
                <Text style={{ ...styles.input_title, marginTop: moderateScale(20), color: colors.secondaryFontColor }}>Authorize Signature </Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Enter Name'
                />
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Name</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Enter Name'
                />
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Email</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Enter  Email'
                />
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Phone Number</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Enter  Phone Number'
                    maxLength={10}
                    keyboardType='phone-pad'
                />
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Address</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Dunlop Kolkata 700250'
                />

                <AppButton
                    textStyle={{ ...styles.buttn_txt, color: colors.buttontxtColor }}
                    style={styles.button_sty}
                    title="Save"
                />
            </KeyboardAwareScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topimg_view: {
        height: moderateScale(110),
        width: moderateScale(110),
        borderRadius: moderateScale(60),
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: moderateScale(30)
    },
    img_sty: {
        height: moderateScale(90),
        width: moderateScale(90),
        resizeMode: 'cover'
    },
    camera_view: {
        height: moderateScale(30),
        width: moderateScale(30),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        borderRadius: moderateScale(15),
        position: 'absolute',
        bottom: moderateScale(18),
        right: moderateScale(110)
    },
    img_view: {
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(15),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(20)
    },
    img_bix: {
        height: moderateScale(120),
        width: moderateScale(120),
        borderRadius: moderateScale(15),
        borderWidth: 1,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center'
    },
    add_img: {
        height: moderateScale(50),
        width: moderateScale(50)
    },
    upload_view: {
        width: moderateScale(140),
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: moderateScale(5),
        borderRadius: moderateScale(7),
        marginLeft: moderateScale(25)
    },
    upload_txt: {
        fontFamily: FONTS.Jost.semibold,
        fontSize: moderateScale(13)
    },
    input_title: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Jost.regular,
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(10)
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
        fontFamily: FONTS.Jost.semibold,
        fontSize: moderateScale(15)
    },
    button_sty: {
        height: moderateScale(48),
        width: width - moderateScale(40),
        borderRadius: moderateScale(7),
        alignSelf: 'center',
        marginTop: moderateScale(20),
        marginBottom: moderateScale(20)
    },
});

//make this component available to the app
export default Profile;
