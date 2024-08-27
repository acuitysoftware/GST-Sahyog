//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { AppTextInput, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';


// create a component
const CreateInvoice = () => {
    const colors = useTheme()
    const [invoiceNo, setInvoiceNo] = useState('WBSTC5K545555')
    return (
        <View style={styles.container}>
            <BackHeader title='Create invoice' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    backgroundColor: colors.secondaryThemeColor,
                    paddingBottom: moderateScale(15)
                }}>
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Invoice Number</Text>
                    <AppTextInput
                        editable={false}
                        inputContainerStyle={{ ...styles.inputcontainer_sty, backgroundColor: colors.borderColor }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        value={invoiceNo}
                        onChangeText={(val) => setInvoiceNo(val)}
                    />
                </View>

                <TouchableOpacity onPress={() => NavigationService.navigate('AddCustomerFrom')}
                    style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Image source={require('../../assets/images/customer.png')}
                        style={{ ...styles.addcustomer_img, tintColor: colors.buttonColor }} />
                    <Text style={{ ...styles.addcustomer_txt, color: colors.buttonColor }}>Add Customer</Text>
                </TouchableOpacity>

                // TODO    ======================================== add customer======================================================
                //!
                //! this section =======================
                <TouchableOpacity onPress={() => NavigationService.navigate('AddCustomerFrom')}
                    style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Image source={require('../../assets/images/customer.png')}
                        style={{ ...styles.addcustomer_img, tintColor: colors.buttonColor }} />
                    <Text style={{ ...styles.addcustomer_txt, color: colors.buttonColor }}>Add Customer</Text>
                </TouchableOpacity>
                
              //!



                <View style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Image source={require('../../assets/images/box.png')}
                        style={{ ...styles.addcustomer_img, tintColor: colors.buttonColor }} />
                    <Text style={{ ...styles.addcustomer_txt, color: colors.buttonColor }}>Add Product</Text>
                </View>
                <View style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>Shipping  Address </Text>
                </View>
                <View style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>Shipping Charge </Text>
                </View>
                <View style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>Service Charge</Text>
                </View>
                <View style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>Additional Charge </Text>
                </View>
                <View style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>Add Note</Text>
                </View>
            </ScrollView>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input_title: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.OpenSans.semibold,
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(15)
    },
    inputcontainer_sty: {
        borderWidth: 0,
        alignSelf: 'center',
        height: moderateScale(45),
        borderRadius: moderateScale(5),
        borderWidth: 1,
        paddingLeft: moderateScale(7),
        marginHorizontal: moderateScale(15),
    },
    text_input: {
        fontFamily: FONTS.Jost.medium,
        fontSize: moderateScale(12)
    },
    addcustomer: {
        padding: moderateScale(17),
        flexDirection: 'row',
        marginTop: moderateScale(10)
    },
    addcustomer_img: {
        height: moderateScale(20),
        width: moderateScale(20),
        resizeMode: 'contain'
    },
    addcustomer_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.OpenSans.semibold,
        marginLeft: moderateScale(13)
    },
    sipping_address_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.OpenSans.regular,
        marginLeft: moderateScale(13)
    }
});

//make this component available to the app
export default CreateInvoice;
