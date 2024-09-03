//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { AppButton, AppTextInput, Icon, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import Modal from "react-native-modal";

const { height, width } = Dimensions.get('screen')
// create a component
const CreateInvoice = () => {
    const colors = useTheme()
    const [invoiceNo, setInvoiceNo] = useState('WBSTC5K545555')
    const [ShippingChargeModal, setShippingChargeModal] = useState(false);
    const [ServiceChargeModal, setServiceChargeModal] = useState(false);
    const [AdditionalChargeModal, setAdditionalChargeModal] = useState(false);
    const [AddNoteModal, setAddNoteModal] = useState(false);
    const [number, setNumber] = useState(1);
    const handleIncrement = () => {
        setNumber(prevNumber => prevNumber + 1);
    };
    const handleDecrement = () => {
        if (number > 1) {
            setNumber(prevNumber => prevNumber - 1);
        }
    };

    const handleShipingCharge = () => {
        setShippingChargeModal(!ShippingChargeModal);
    };
    const handleServiceCharge = () => {
        setServiceChargeModal(!ServiceChargeModal);
    };
    const handleAddtionalCharge = () => {
        setAdditionalChargeModal(!AdditionalChargeModal);
    };
    const handleAddNote = () => {
        setAddNoteModal(!AddNoteModal);
    };
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
                        inputContainerStyle={{ ...styles.inputcontainer_sty, backgroundColor: colors.borderColor }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        value={invoiceNo}
                        onChangeText={(val) => setInvoiceNo(val.toUpperCase())}
                        keyboardType='name-phone-pad'
                    />
                </View>

                <TouchableOpacity
                    onPress={() => NavigationService.navigate('BottomTab', { screen: 'Customer' })}
                    style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Image source={require('../../assets/images/customer.png')}
                        style={{ ...styles.addcustomer_img, tintColor: colors.buttonColor }} />
                    <Text style={{ ...styles.addcustomer_txt, color: colors.buttonColor }}>Add Customer</Text>
                </TouchableOpacity>

                {/* ========================after add customer ====================== */}
                <TouchableOpacity onPress={() => NavigationService.navigate('AddCustomerFrom')}
                    style={{ ...styles.customer_view, backgroundColor: colors.secondaryThemeColor }}>
                    <View>
                        <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>Web skill</Text>
                        <Text style={{ ...styles.webskill_number, color: colors.tintText }}>9845125548</Text>
                    </View>
                    <Icon name='pen' type='FontAwesome5' color={colors.buttonColor} />
                </TouchableOpacity>
                {/* ===========================END================================= */}

                <TouchableOpacity
                    onPress={() => NavigationService.navigate('SelectProduct')}
                    style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Image source={require('../../assets/images/box.png')}
                        style={{ ...styles.addcustomer_img, tintColor: colors.buttonColor }} />
                    <Text style={{ ...styles.addcustomer_txt, color: colors.buttonColor }}>Add Product</Text>
                </TouchableOpacity>
                {/* ==========================after add product=========================== */}

                <View style={{ ...styles.addpeoduct_view, backgroundColor: colors.secondaryThemeColor }}>
                    <View style={{ ...styles.addpeoductprimary_view }}>
                        <View>
                            <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>Test Product</Text>
                            <Text style={{ ...styles.webskill_number, marginTop: moderateScale(7), fontFamily: FONTS.OpenSans.semibold, color: colors.buttonColor }}>₹100.00</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.number_up_down_view}>
                                <Pressable onPress={handleDecrement}>
                                    <Icon name='minus-square' type='Feather' color={colors.buttonColor} />
                                </Pressable>
                                <Text style={{ ...styles.number_up_down_txt, color: colors.secondaryFontColor }}>{number.toString().padStart(2, '0')}</Text>
                                <Pressable onPress={handleIncrement}>
                                    <Icon name='plus-square' type='Feather' color={colors.buttonColor} />
                                </Pressable>
                            </View>
                            <Text style={{ ...styles.webskill_number, marginTop: moderateScale(7), color: colors.buttonColor }}>Edit</Text>
                        </View>
                    </View>
                    <View style={styles.addproductBottom_view}>
                        <Text style={{ ...styles.cgst_txt, color: colors.secondaryFontColor }}>CGST : <Text style={styles.cgst_number}>₹9.00</Text></Text>
                        <Text style={{ ...styles.cgst_txt, color: colors.secondaryFontColor }}>SGST : <Text style={styles.cgst_number}>₹9.00</Text></Text>
                    </View>
                </View>
                {/* ==========================END=========================== */}

                {/* =============================Add More Product================================= */}
                <TouchableOpacity
                    onPress={() => NavigationService.navigate('SelectProduct')}
                    style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Image source={require('../../assets/images/box.png')}
                        style={{ ...styles.addcustomer_img, tintColor: colors.buttonColor }} />
                    <Text style={{ ...styles.addcustomer_txt, color: colors.buttonColor }}>Add More Product</Text>
                </TouchableOpacity>
                {/* =========================================================END=========================== */}


                <TouchableOpacity
                    onPress={() => NavigationService.navigate('ShippingAddressFrom')}
                    style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>Shipping  Address </Text>
                </TouchableOpacity>

                {/* =============================Add More Shipping address ================================= */}
                <TouchableOpacity onPress={() => NavigationService.navigate('ShippingAddressFrom')}
                    style={{ ...styles.customer_view, backgroundColor: colors.secondaryThemeColor }}>
                    <View>
                        <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>Shipping Address</Text>
                        <Text style={{ ...styles.webskill_number, color: colors.tintText }}>121/2 Ramral agarwal lane kolkata 700050</Text>
                    </View>
                    <Icon name='pen' type='FontAwesome5' color={colors.buttonColor} />
                </TouchableOpacity>
                {/* =========================================================END=========================== */}

                <TouchableOpacity onPress={handleShipingCharge}
                    style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>Shipping Charge </Text>
                </TouchableOpacity>

                {/* =============================Add More Shipping charge ================================= */}
                <TouchableOpacity onPress={handleShipingCharge}
                    style={{ ...styles.customer_view, backgroundColor: colors.secondaryThemeColor }}>
                    <View>
                        <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>Shipping Charge</Text>
                        <Text style={{ ...styles.webskill_number, color: colors.tintText }}>₹50.00</Text>
                    </View>
                    <Icon name='pen' type='FontAwesome5' color={colors.buttonColor} />
                </TouchableOpacity>
                {/* =========================================================END=========================== */}

                <TouchableOpacity onPress={handleServiceCharge} style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>Service Charge</Text>
                </TouchableOpacity>

                {/* =============================Add  Service charge ================================= */}
                <TouchableOpacity onPress={handleServiceCharge}
                    style={{ ...styles.customer_view, backgroundColor: colors.secondaryThemeColor }}>
                    <View>
                        <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>Service Charge</Text>
                        <Text style={{ ...styles.webskill_number, color: colors.tintText }}>₹50.00</Text>
                    </View>
                    <Icon name='pen' type='FontAwesome5' color={colors.buttonColor} />
                </TouchableOpacity>
                {/* =========================================================END=========================== */}

                <TouchableOpacity onPress={handleAddtionalCharge} style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>Additional Charge </Text>
                </TouchableOpacity>

                {/* =============================Add Additional charge ================================= */}
                <TouchableOpacity onPress={handleAddtionalCharge}
                    style={{ ...styles.customer_view, backgroundColor: colors.secondaryThemeColor }}>
                    <View>
                        <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>Additional Charge </Text>
                        <Text style={{ ...styles.webskill_number, color: colors.tintText }}>₹50.00</Text>
                    </View>
                    <Icon name='pen' type='FontAwesome5' color={colors.buttonColor} />
                </TouchableOpacity>
                {/* =========================================================END=========================== */}


                <TouchableOpacity onPress={handleAddNote} style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                    <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>Add Note</Text>
                </TouchableOpacity>

                
                {/* =============================Add notes ================================= */}
                <TouchableOpacity onPress={handleAddNote}
                    style={{ ...styles.customer_view, backgroundColor: colors.secondaryThemeColor }}>
                    <View>
                        <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>Additional Charge </Text>
                        <Text numberOfLines={2} style={{ ...styles.webskill_number, maxWidth:'90%', color: colors.tintText }}>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}</Text>
                    </View>
                    <Icon name='pen' type='FontAwesome5' color={colors.buttonColor} />
                </TouchableOpacity>
                {/* =========================================================END=========================== */}

                <View style={{ ...styles.customer_view, backgroundColor: colors.secondaryThemeColor }}>
                 <Text style={{...styles.total_txt,color:colors.secondaryFontColor}}>Total  <Text>₹ 0.00</Text></Text>
                 <Pressable 
                 onPress={()=>NavigationService.navigate('InvoicePdfScreen')}
                 style={{
                    ...styles.genarate_btn,
                    backgroundColor:colors.buttonColor
                    }}>
                    <Text style={{
                        ...styles.genarate_btn_txt,
                        color:colors.secondaryThemeColor
                    }}>Generate</Text>
                 </Pressable>
                </View>

            </ScrollView>

            <Modal
                isVisible={ShippingChargeModal}
                style={{ justifyContent: 'flex-end', marginHorizontal: 0, marginBottom: 0, }}
                onBackButtonPress={() => setShippingChargeModal(false)}
                onBackdropPress={() => setShippingChargeModal(false)}
            >
                <View style={styles.modalView}>
                    <Text style={{ ...styles.modal_title, color: colors.secondaryFontColor }}>Shipping  Charge </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.Modal_inputcontainer_sty }}
                        inputStyle={{ ...styles.Modal_text_input, color: colors.secondaryFontColor }}
                        rightAction={<Icon
                            name='rupee'
                            type='FontAwesome'
                            size={16}
                            color={colors.primaryFontColor}
                        />}
                    />
                    <AppButton
                        textStyle={{ ...styles.Modal_buttn_txt, color: colors.buttontxtColor }}
                        style={styles.Modal_button_sty}
                        title="Save"
                    />
                </View>
            </Modal>

            <Modal
                isVisible={ServiceChargeModal}
                style={{ justifyContent: 'flex-end', marginHorizontal: 0, marginBottom: 0, }}
                onBackButtonPress={() => setServiceChargeModal(false)}
                onBackdropPress={() => setServiceChargeModal(false)}
            >
                <View style={styles.servimemodalView}>
                    <Text style={{ ...styles.modal_title, color: colors.secondaryFontColor }}>Services Charge </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.Modal_inputcontainer_sty }}
                        inputStyle={{ ...styles.Modal_text_input, color: colors.secondaryFontColor }}
                        rightAction={<Icon
                            name='rupee'
                            type='FontAwesome'
                            size={16}
                            color={colors.primaryFontColor}
                        />}
                    />
                    <Text style={{ ...styles.input_title, marginHorizontal: 0, color: colors.secondaryFontColor }}>GST (%) optional  </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty, marginHorizontal: 0, }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        placeholder='18'
                    />

                    <AppButton
                        textStyle={{ ...styles.Modal_buttn_txt, color: colors.buttontxtColor }}
                        style={styles.Modal_button_sty}
                        title="Save"
                    />
                </View>
            </Modal>

            <Modal
                isVisible={AdditionalChargeModal}
                style={{ justifyContent: 'flex-end', marginHorizontal: 0, marginBottom: 0, }}
                onBackButtonPress={() => setAdditionalChargeModal(false)}
                onBackdropPress={() => setAdditionalChargeModal(false)}
            >
                <View style={styles.modalView}>
                    <Text style={{ ...styles.modal_title, color: colors.secondaryFontColor }}>Additional Charge</Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.Modal_inputcontainer_sty }}
                        inputStyle={{ ...styles.Modal_text_input, color: colors.secondaryFontColor }}
                        rightAction={<Icon
                            name='rupee'
                            type='FontAwesome'
                            size={16}
                            color={colors.primaryFontColor}
                        />}
                    />
                    <AppButton
                        textStyle={{ ...styles.Modal_buttn_txt, color: colors.buttontxtColor }}
                        style={styles.Modal_button_sty}
                        title="Add"
                    />
                </View>
            </Modal>

            <Modal
                isVisible={AddNoteModal}
                style={{ justifyContent: 'flex-end', marginHorizontal: 0, marginBottom: 0, }}
                onBackButtonPress={() => setAddNoteModal(false)}
                onBackdropPress={() => setAddNoteModal(false)}
            >
                <View style={styles.servimemodalView}>
                    <Text style={{ ...styles.modal_title, color: colors.secondaryFontColor }}>Notes</Text>
                    <AppTextInput
                        multiline={true}
                        numberOfLines={6}
                        inputContainerStyle={{ ...styles.address_inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        placeholder='Say Something.....'
                        textAlignVertical='top'
                    />

                    <AppButton
                        textStyle={{ ...styles.Modal_buttn_txt, color: colors.buttontxtColor }}
                        style={styles.Modal_button_sty}
                        title="Save"
                    />
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
        // marginLeft: moderateScale(13)
    },
    webskill_txt: {
        fontFamily: FONTS.OpenSans.semibold,
        fontSize: moderateScale(13)
    },
    webskill_number: {
        fontFamily: FONTS.OpenSans.regular,
        fontSize: moderateScale(13),
        marginTop: moderateScale(5)
    },
    customer_view: {
        padding: moderateScale(17),
        flexDirection: 'row',
        marginTop: moderateScale(10),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    number_up_down_view: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    number_up_down_txt: {
        fontFamily: FONTS.OpenSans.semibold,
        fontSize: moderateScale(13),
        marginHorizontal: moderateScale(3)
    },
    addpeoduct_view: {
        padding: moderateScale(17),
        marginTop: moderateScale(10),
    },
    addpeoductprimary_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addproductBottom_view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(7),
        width: '53%',
        justifyContent: 'space-between'
    },
    cgst_txt: {
        fontFamily: FONTS.OpenSans.regular,
        fontSize: moderateScale(13)
    },
    cgst_number: {
        fontFamily: FONTS.OpenSans.semibold,
        fontSize: moderateScale(13)
    },
    modalView: {
        backgroundColor: "white",
        padding: moderateScale(20),
        height: height / 3.8,
        borderTopLeftRadius: moderateScale(15),
        borderTopRightRadius: moderateScale(15)
    },
    modal_title: {
        fontFamily: FONTS.OpenSans.semibold,
        fontSize: moderateScale(18)
    },
    Modal_inputcontainer_sty: {
        borderWidth: 1,
        alignSelf: 'center',
        height: moderateScale(45),
        borderRadius: moderateScale(5),
        borderWidth: 1,
        paddingLeft: moderateScale(7),
        marginTop: moderateScale(20)
    },
    Modal_buttn_txt: {
        fontFamily: FONTS.Jost.semibold,
        fontSize: moderateScale(15)
    },
    Modal_button_sty: {
        height: moderateScale(48),
        width: width - moderateScale(40),
        borderRadius: moderateScale(7),
        alignSelf: 'center',
        marginTop: moderateScale(30),
    },
    servimemodalView: {
        backgroundColor: "white",
        padding: moderateScale(20),
        height: height / 2.7,
        borderTopLeftRadius: moderateScale(15),
        borderTopRightRadius: moderateScale(15)
    },
    address_inputcontainer_sty: {
        alignSelf: 'center',
        borderRadius: moderateScale(5),
        borderWidth: 1,
        paddingLeft: moderateScale(7),
        marginTop:moderateScale(15)
    },
    genarate_btn:{
        height:moderateScale(40),
        width:moderateScale(85),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:moderateScale(10)
    },
    genarate_btn_txt:{
        fontFamily:FONTS.OpenSans.semibold,
        fontSize:moderateScale(13)
    },
    total_txt:{
        fontFamily:FONTS.OpenSans.semibold,
        fontSize:moderateScale(14)
    }
});

//make this component available to the app
export default CreateInvoice;
