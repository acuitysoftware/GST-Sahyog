//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppButton, AppTextInput, Icon, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';

const { height, width } = Dimensions.get('screen')
// create a component
const AddProductFrom = () => {
    const colors = useTheme()
    return (
        <View style={styles.container}>
            <BackHeader title='Add Product' />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: colors.secondaryThemeColor, paddingBottom: moderateScale(10) }}>
                    <Text style={{ ...styles.personal_txt, color: colors.secondaryFontColor }}>Product Details</Text>
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Name </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    // placeholder='Enter Name'
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>MRP</Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType='phone-pad'
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Discounted Price </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType='phone-pad'
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Taxable value </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType='phone-pad'
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>HSN Code </Text>
                    <View style={styles.hsn_view}>
                        <AppTextInput
                            inputContainerStyle={{ ...styles.HNSinputcontainer_sty }}
                            inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                            keyboardType='phone-pad'
                        />
                        <Pressable style={{ ...styles.hns_seacrch_view, backgroundColor: colors.buttonColor }}>
                            <Icon name='search' type='Fontisto' color={colors.secondaryThemeColor} />
                        </Pressable>
                    </View>
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>CGST </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType='phone-pad'
                        placeholder='9%'
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>SGST </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType='phone-pad'
                        placeholder='9%'
                    />

                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>cess </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType='phone-pad'
                        placeholder='4%'
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Product Price </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType='phone-pad'
                    />

                    <AppButton
                        textStyle={{ ...styles.buttn_txt, color: colors.buttontxtColor }}
                        style={styles.button_sty}
                        title="Add Customer"
                    />

                </View>
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
    hsn_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: moderateScale(15),
    },
    HNSinputcontainer_sty: {
        borderWidth: 1,
        alignSelf: 'center',
        height: moderateScale(45),
        borderRadius: moderateScale(5),
        borderWidth: 1,
        paddingLeft: moderateScale(7),
        width: moderateScale(250)
    },
    hns_seacrch_view: {
        height: moderateScale(44),
        width: moderateScale(44),
        borderRadius: moderateScale(7),
        alignItems: 'center',
        justifyContent: 'center'
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
        marginTop: moderateScale(30),
        marginBottom: moderateScale(20)
    },
});

//make this component available to the app
export default AddProductFrom;
