//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import { AppButton, AppTextInput, useTheme } from 'react-native-basic-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { height, width } = Dimensions.get('screen')
// create a component
const AddCustomerFrom = () => {
    const colors = useTheme()
    return (
        <View style={styles.container}>
            <BackHeader title='Add Customer' />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: colors.secondaryThemeColor, paddingBottom: moderateScale(10) }}>
                    <Text style={{ ...styles.personal_txt, color: colors.secondaryFontColor }}>Company Details</Text>
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Name </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        placeholder='Enter Name'
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Phone Number </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        placeholder='Enter Number'
                        maxLength={10}
                        keyboardType='phone-pad'
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Email </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        placeholder='Enter email'
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Pin </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        placeholder='Enter Pin'
                        keyboardType='phone-pad'
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Address</Text>
                    <AppTextInput
                        multiline={true}
                        numberOfLines={4}
                        inputContainerStyle={{ ...styles.address_inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        placeholder='Address'
                        textAlignVertical='top'
                    />
                </View>
                <View style={{ backgroundColor: colors.secondaryThemeColor, marginTop:moderateScale(10),paddingBottom: moderateScale(10) }}>
                    <Text style={{ ...styles.personal_txt, color: colors.secondaryFontColor }}>Company Details</Text>
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>GST Number </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        placeholder='Enter GST Number'
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Company Name </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty,backgroundColor:colors.borderColor }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Company Email </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty,backgroundColor:colors.borderColor }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Company Phone </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty,backgroundColor:colors.borderColor }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        maxLength={10}
                        keyboardType='number-pad'
                    />
                   <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Company Address </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty,backgroundColor:colors.borderColor }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    />
                </View>
                <AppButton
                    textStyle={{ ...styles.buttn_txt, color: colors.buttontxtColor }}
                    style={styles.button_sty}
                    title="Add Customer"
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
    personal_txt: {
        fontFamily: FONTS.Jost.semibold,
        marginHorizontal: moderateScale(15),
        fontSize: moderateScale(16),
        marginTop: moderateScale(15)
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
});

//make this component available to the app
export default AddCustomerFrom;
