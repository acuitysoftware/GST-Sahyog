//import liraries
import React, { Component, useState } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { AppButton, AppTextInput, Icon, StatusBar, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationService from '../../Services/Navigation';
import Modal from "react-native-modal";

const { height, width } = Dimensions.get('screen')
// create a component
const SignupDetails = () => {
    const colors = useTheme()
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
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
                <Text style={{ ...styles.personal_txt, color: colors.secondaryFontColor }}>Company Details</Text>
                <View style={styles.img_view}>
                    <View style={{ ...styles.img_bix, borderColor: colors.borderColor }}>
                        <Image source={require('../../assets/images/addimg_logo.png')} style={styles.add_img} />
                    </View>
                    <View style={{ ...styles.upload_view, borderColor: colors.buttonColor }}>
                        <Text style={{ ...styles.upload_txt, color: colors.buttonColor }}>Upload Signature</Text>
                        <Icon name='upload-to-cloud' type='Entypo' color={colors.buttonColor} />
                    </View>
                </View>

                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Authorize Signature </Text>
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
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Phone</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Enter  Phone Number'
                />
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Email</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Enter  Email'
                />
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Password</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Password'
                />
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Confirm Password</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Confirm Password'
                />
                <Text style={{ ...styles.personal_txt, color: colors.secondaryFontColor }}>Company Details</Text>
                <View style={styles.img_view}>
                    <View style={{ ...styles.img_bix, borderColor: colors.borderColor }}>
                        <Image source={require('../../assets/images/addimg_logo.png')} style={styles.add_img} />
                    </View>
                    <View style={{ ...styles.upload_view, width: moderateScale(100), borderColor: colors.buttonColor }}>
                        <Text style={{ ...styles.upload_txt, color: colors.buttonColor }}>Upload </Text>
                        <Icon name='upload-to-cloud' type='Entypo' color={colors.buttonColor} />
                    </View>
                </View>
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>GST Number</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='07AAPCA6346P1ZX'
                />
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Business Name</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='xyz technology'
                />
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Business Email</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='xyz@mail.com'
                />
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Business Phone Number</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='+91 5565442458'
                />
                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Business address</Text>
                <AppTextInput
                    numberOfLines={6}
                    inputContainerStyle={{ ...styles.address_inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Dunlop Kolkata 700250'
                    textAlignVertical='top'
                />

                <AppButton
                    textStyle={{ ...styles.buttn_txt, color: colors.buttontxtColor }}
                    style={styles.button_sty}
                    title="Submit"
                    onPress={toggleModal}
                />

            </KeyboardAwareScrollView>

            <Modal isVisible={isModalVisible}
                onBackButtonPress={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Image source={require('../../assets/images/successlogo.png')} style={{ height: 60, width: 60 }} />
                    <Text style={{...styles.modal_massege,color:colors.primaryFontColor}}>Registration  Successful</Text>

                    <TouchableOpacity
                        onPress={() => NavigationService.navigate('UserStack')}
                        style={{...styles.modalbutton_sty,backgroundColor:colors.buttonColor}}>

                        <Text style={{...styles.button_txt_sty, color: colors.buttontxtColor}}>Ok</Text>


                    </TouchableOpacity>
                </View>
            </Modal>

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
    personal_txt: {
        fontFamily: FONTS.Jost.semibold,
        marginHorizontal: moderateScale(15),
        fontSize: moderateScale(16),
        marginTop: moderateScale(20)
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
    address_inputcontainer_sty: {
        borderWidth: 0,
        alignSelf: 'center',
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
    img_view: {
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(15),
        flexDirection: 'row',
        alignItems: 'center'
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
    modalView: {
        backgroundColor: "white",
        borderRadius: moderateScale(10),
        padding: moderateScale(20),
        alignItems: 'center'
    },
    modal_massege: {
        fontFamily: FONTS.Jost.regular,
        fontSize: moderateScale(20),
        marginTop: moderateScale(10)
    },
    modalbutton_sty: {
        borderRadius: moderateScale(10),
        height: moderateScale(30),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: moderateScale(60),
        marginTop: moderateScale(20)
    },
    button_txt_sty: {
        fontFamily: FONTS.Jost.bold,
        fontSize: moderateScale(13),
        alignSelf: 'center',
    },
});

//make this component available to the app
export default SignupDetails;
