//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppButton, AppTextInput, Picker, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';


const { height, width } = Dimensions.get('screen')
// create a component
const ShippingAddressFrom = () => {
    const colors = useTheme()
    const [dropdownValue, setDropdownValue] = useState('');
    return (
        <View style={styles.container}>
            <BackHeader title='Shipping Address' />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: colors.secondaryThemeColor, paddingBottom: moderateScale(20) }}>
                    <Text style={{ ...styles.personal_txt, color: colors.secondaryFontColor }}>Enter Address</Text>
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Address 1  </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Address 2  </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Pincode   </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType='phone-pad'
                    />

                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>City</Text>
                    <Picker
                        // labelKey="name"
                        // valueKey="id"
                        // placeholder="Choose Your Report"
                        // options={Satate}
                        options={[
                            {
                                label: 'Item 1',
                                value: 'item1'
                            },
                            {
                                label: 'Item 2',
                                value: 'item2'
                            }
                        ]}
                        textStyle={{ ...styles.picker_txt, color: colors.secondaryFontColor }}
                        containerStyle={{ ...styles.picker_sty, borderColor: colors.borderColor }}
                        selectedValue={dropdownValue}
                        onValueChange={(val) => setDropdownValue(val)}
                    />

                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>State</Text>
                    <Picker
                        // labelKey="name"
                        // valueKey="id"
                        // placeholder="Choose Your Report"
                        // options={Satate}
                        options={[
                            {
                                label: 'Item 1',
                                value: 'item1'
                            },
                            {
                                label: 'Item 2',
                                value: 'item2'
                            }
                        ]}
                        textStyle={{ ...styles.picker_txt, color: colors.secondaryFontColor }}
                        containerStyle={{ ...styles.picker_sty, borderColor: colors.borderColor }}
                        selectedValue={dropdownValue}
                        onValueChange={(val) => setDropdownValue(val)}
                    />

                </View>
                <View style={{height:moderateScale(90)}}/>
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
    picker_sty: {
        height: moderateScale(45),
        borderRadius: moderateScale(6),
        marginTop: moderateScale(10),
        marginHorizontal: moderateScale(15)
    },
    picker_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Jost.regular
    },
});

//make this component available to the app
export default ShippingAddressFrom;
