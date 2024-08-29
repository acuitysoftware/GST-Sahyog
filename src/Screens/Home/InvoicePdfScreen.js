//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { AppButton, Card, Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { ScrollView } from 'react-native';

const { height, width } = Dimensions.get('screen')
// create a component
const InvoicePdfScreen = () => {
    const colors = useTheme()
    return (
        <View style={styles.container}>
            <BackHeader title='invoice' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Card style={{ ...styles.card_sty, backgroundColor: colors.cardColor }}>
                    <View>
                        <View style={styles.shop_view}>
                            <View>
                                <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>Fashion Shop</Text>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>GSTIN : <Text style={styles.gstin_number}>29AAACH7409R1ZX</Text></Text>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>State Code  : <Text style={styles.gstin_number}>09</Text></Text>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Register Office : <Text style={styles.gstin_number}>Kolkata ,700050 </Text></Text>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Mobile : <Text style={styles.gstin_number}>987524447</Text></Text>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Email : <Text style={styles.gstin_number}>fashion@mail.com</Text></Text>
                            </View>
                            <View style={{ ...styles.img_view, backgroundColor: colors.borderColor }}>
                                <Image source={require('../../assets/images/fashion.png')} style={styles.shop_img} />
                            </View>
                        </View>
                        <View style={styles.shop_bottom_view}>
                            <View>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Invoice Number : </Text>
                                <Text style={{ ...styles.gstin_number, marginTop: 0, color: colors.secondaryFontColor }}> WBSTC5K545555</Text>
                            </View>
                            <View>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Invoice Date : </Text>
                                <Text style={{ ...styles.gstin_number, marginTop: 0, color: colors.secondaryFontColor }}>07/29/2024</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ ...styles.line, borderColor: colors.borderColor }} />
                    <View style={{ marginTop: moderateScale(10) }}>
                        <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>Bill To</Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>GSTIN : <Text style={styles.gstin_number}>29AAACH7409R1ZX</Text></Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>State Code  : <Text style={styles.gstin_number}>91</Text></Text>
                        <Text style={{ ...styles.shop_name, marginTop: moderateScale(5), color: colors.secondaryFontColor }}>Jhon Deo</Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>Address  : <Text style={styles.gstin_number}>Shanthi Kolkata</Text></Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>Pin Code  : <Text style={styles.gstin_number}>700052</Text></Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>Mobile  : <Text style={styles.gstin_number}>987524447</Text></Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>Email  : <Text style={styles.gstin_number}>jhon@mail.com</Text></Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>Eway bill Number  : <Text style={styles.gstin_number}>545585</Text></Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>Einvoice Number  : <Text style={styles.gstin_number}>54845585</Text></Text>
                    </View>
                    <View style={{ marginTop: moderateScale(15) }}>
                        <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>Ship To</Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>GSTIN : <Text style={styles.gstin_number}>29AAACH7409R1ZX</Text></Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>State Code  : <Text style={styles.gstin_number}>91</Text></Text>
                        <Text style={{ ...styles.shop_name, marginTop: moderateScale(5), color: colors.secondaryFontColor }}>Jhon Deo</Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>Address  : <Text style={styles.gstin_number}>Shanthi Kolkata</Text></Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>Pin Code  : <Text style={styles.gstin_number}>700052</Text></Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>Mobile  : <Text style={styles.gstin_number}>987524447</Text></Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>Email  : <Text style={styles.gstin_number}>jhon@mail.com</Text></Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>Eway bill Number  : <Text style={styles.gstin_number}>545585</Text></Text>
                        <Text style={{
                            ...styles.gstin_txt,
                            color: colors.secondaryFontColor
                        }}>Einvoice Number  : <Text style={styles.gstin_number}>54845585</Text></Text>
                    </View>
                    <View style={{ ...styles.line, borderColor: colors.borderColor }} />

                    <Text style={{ ...styles.shop_name, marginTop: moderateScale(10), color: colors.secondaryFontColor }}>Item (3 Product)</Text>

                    <View style={styles.sample_view}>
                        <View>
                            <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>Sample Product </Text>
                            <Text style={{ ...styles.sample_id, color: colors.buttonColor }}>(HSN 0005455554)</Text>
                        </View>
                        <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>₹ 100.00</Text>
                    </View>
                    <View style={{ ...styles.line, borderColor: colors.borderColor }} />

                    <View style={styles.sample_view}>
                        <View>
                            <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>Sample Product </Text>
                            <Text style={{ ...styles.sample_id, color: colors.buttonColor }}>(HSN 0005455554)</Text>
                        </View>
                        <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>₹ 100.00</Text>
                    </View>
                    <View style={{ ...styles.line, borderColor: colors.borderColor }} />
                    <View style={styles.sample_view}>
                        <View>
                            <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>Sample Product </Text>
                            <Text style={{ ...styles.sample_id, color: colors.buttonColor }}>(HSN 0005455554)</Text>
                        </View>
                        <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>₹ 100.00</Text>
                    </View>
                    <View style={{ ...styles.line, borderColor: colors.secondaryFontColor }} />
                    <View style={{ ...styles.sample_view, marginTop: moderateScale(10) }}>
                        <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>Sub Total </Text>
                        <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>₹390.00</Text>
                    </View>
                    <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                        <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>CGST (9%) </Text>
                        <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹ 35.1</Text>
                    </View>
                    <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                        <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>SGST (9%) </Text>
                        <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹ 35.1</Text>
                    </View>
                    <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                        <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>Delivery Charge  </Text>
                        <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹50.00</Text>
                    </View>
                    <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                        <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>Service Charge </Text>
                        <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹50.00</Text>
                    </View>
                    <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                        <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>GST (18%) </Text>
                        <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹09.00</Text>
                    </View>
                    <View style={{ ...styles.sample_view, marginTop: moderateScale(15) }}>
                        <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>Additional Charge  </Text>
                        <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹50.00</Text>
                    </View>
                    <View style={{ ...styles.totalbox_view, backgroundColor: colors.primaryFontColor }}>
                        <Text style={{ ...styles.gst_percentage, color: colors.secondaryThemeColor }}>Total  </Text>
                        <Text style={{ ...styles.gst_percentage, color: colors.secondaryThemeColor }}> ₹619.2</Text>
                    </View>
                    <View style={{ ...styles.note_view, borderColor: colors.borderColor }}>
                        <Text style={{
                            ...styles.gst_percentage, color: colors.secondaryFontColor
                        }}>Note : <Text style={styles.note_txt}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text></Text>
                    </View>

                    <Text style={{ ...styles.shop_name, marginTop: moderateScale(10), color: colors.secondaryFontColor }}>Authorized Signature</Text>
                    <Image source={require('../../assets/images/Signature.png')} style={styles.Signature_img} />

                    <View style={styles.date_view}>
                        <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>Date :</Text>
                        <View>
                            <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>12/09/90</Text>
                            <View style={{ ...styles.date_line, borderColor: colors.secondaryFontColor }} />
                        </View>
                    </View>
                    <Text style={{
                        ...styles.shop_name,
                        marginTop: moderateScale(10),
                        color: colors.secondaryFontColor,
                        fontSize: moderateScale(16)
                    }}>Terms and Conditions</Text>
                    <View style={styles.terms_view}>
                        <Icon name='dot-fill' type='Octicons' />
                        <Text style={{
                            ...styles.note_txt,
                            marginLeft: moderateScale(10),
                            marginTop: moderateScale(5),
                            color: colors.secondaryFontColor,
                            fontSize: moderateScale(13)
                        }}>Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry.</Text>
                    </View>
                    <Text style={{ ...styles.info_txt, color: colors.secondaryFontColor, }}>This Is computer Generated invoice no stamp & signature required</Text>

                    <Text style={{
                        ...styles.info_txt,
                        fontFamily: FONTS.OpenSans.semibold,
                        color: colors.secondaryFontColor,
                    }}>Customer Care (For Store): 9876543210</Text>

                    <AppButton
                        textStyle={{ ...styles.buttn_txt, color: colors.buttontxtColor }}
                        style={{...styles.button_sty,backgroundColor:colors.invoicebutton}}
                        title="Download"
                    />
                </Card>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card_sty: {
        margin: moderateScale(15),
        marginTop: moderateScale(15)
    },
    shop_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shop_name: {
        fontFamily: FONTS.OpenSans.semibold,
        fontSize: moderateScale(14)
    },
    gstin_txt: {
        fontFamily: FONTS.OpenSans.semibold,
        fontSize: moderateScale(13),
        marginTop: moderateScale(5)
    },
    gstin_number: {
        fontFamily: FONTS.OpenSans.medium,
        fontSize: moderateScale(13),
        marginTop: moderateScale(5)
    },
    shop_img: {
        height: moderateScale(70),
        width: moderateScale(70),
        borderRadius: moderateScale(40),
        resizeMode: 'cover'
    },
    img_view: {
        height: moderateScale(72),
        width: moderateScale(72),
        borderRadius: moderateScale(37),
        alignItems: 'center',
        justifyContent: 'center'
    },
    shop_bottom_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(10),
        width: '90%'
    },
    line: {
        borderWidth: moderateScale(0.3),
        marginTop: moderateScale(10)
    },
    sample_view: {
        marginTop: moderateScale(15),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sample_id: {
        fontFamily: FONTS.OpenSans.regular,
        fontSize: moderateScale(13)
    },
    gst_percentage: {
        fontFamily: FONTS.OpenSans.medium,
        fontSize: moderateScale(13)
    },
    totalbox_view: {
        padding: moderateScale(10),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(10),
    },
    note_view: {
        marginTop: moderateScale(15),
        padding: moderateScale(10),
        borderRadius: moderateScale(5),
        borderWidth: moderateScale(0.5),
    },
    note_txt: {
        fontFamily: FONTS.OpenSans.regular,
        fontSize: moderateScale(11)
    },
    Signature_img: {
        height: moderateScale(60),
        width: moderateScale(100),
        resizeMode: 'contain',
        marginTop: moderateScale(5)
    },
    date_view: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    date_line: {
        borderWidth: moderateScale(0.3),
        width: moderateScale(100)
    },
    terms_view: {
        flexDirection: 'row',
        marginTop: moderateScale(10)
    },
    info_txt: {
        fontFamily: FONTS.OpenSans.regular,
        fontSize: moderateScale(13),
        textAlign: 'center',
        marginTop: moderateScale(10)
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
export default InvoicePdfScreen;
