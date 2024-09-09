//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import { AppButton, AppTextInput, Picker, useTheme } from 'react-native-basic-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import HomeService from '../../Services/HomeServises';
import Toast from "react-native-simple-toast";
import NavigationService from '../../Services/Navigation';
import { useRoute } from '@react-navigation/native';

const { height, width } = Dimensions.get('screen')
// create a component
const EditCustomerFrom = () => {
    const colors = useTheme()
    const { userData } = useSelector(state => state.User)
    // console.log('userdataaaaaaaaaaaaaaaaaaaacustomer------------------', userData);
    const route = useRoute();
    const getCustomerId = route.params.customerId;
    const [customerName, setCustomerName] = useState('')
    const [customerMobile, setCustomerMobile] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [customerPin, setCustomerPin] = useState('')
    const [customerAddress, setCustomerAddress] = useState('')
    const [buttonLoader, setButtonLoader] =useState(false);
    const [loading, setLoading] = useState(true);
    const [Satate, setSatate] = useState([]);
    const [stateId,setStateId] = useState('')


    useEffect(() => {
        fatchCustomer()
        getState();
    }, [])

    const fatchCustomer = (() => {
        let data = {
            "userid": userData?.userid,
            "customer_id": getCustomerId
        }
        setLoading(true)
        HomeService.getCustomerSingle(data)
        .then((res)=>{
            // console.log('getttttttttttttttttttcustomerrrrrrrrr',res);
            if (res && res.error == false) {
                setCustomerName(res?.data?.name)
                setCustomerMobile(res?.data?.phone_number)
                setCustomerEmail(res?.data?.email)
                setCustomerPin(res?.data?.pin_code)
                setStateId(res?.data?.state)
                setCustomerAddress(res?.data?.address)
                setLoading(false)
            }
            
        })
        .catch((err)=>{console.log('singlecustomerErrr',err);
            setLoading(false)
        })
        
    })

    const getState = () => {
        let data = {
            "userid": userData?.userid
        };
        HomeService.getState(data)
            .then((res) => {
                if (res && res.error == false) {
                    setSatate(res.data);
                }
            })
            .catch((err) => {
                console.log('stateError', err);
            });
    };


    const getUpdateCustomer = (() => {
        let hasError = false;
        if (customerName == '') {
            Toast.show('Please enter Name');
            hasError = true;
            return false
        }
        if (customerMobile == '') {
            Toast.show('Please enter Phone Number');
            hasError = true;
            return false
        }
        if (customerEmail == '') {
            Toast.show('Please enter Email Id');
            hasError = true;
            return false
        }
        if (customerPin == '') {
            Toast.show('Please enter PIN');
            hasError = true;
            return false
        }
        if (customerAddress == '') {
            Toast.show('Please enter Address');
            hasError = true;
            return false
        }
        if (hasError) return;
        let data = {
            "userid": userData?.userid,
            "name": customerName,
            "phone_number": customerMobile,
            "email": customerEmail,
            "pin_code": customerPin,
            "address": customerAddress,
            "customer_id":getCustomerId
        }
        // console.log('adddddddcusssssssssssss', data);
        setButtonLoader(true)
        HomeService.setUpdateCustomer(data)
            .then((res) => {
                // console.log('customerrrrrrrrrrrrrrrrrrrrrrrresssss565555555555555', res);
                if (res && res.error === false) {
                    setButtonLoader(false)
                    Toast.show(res.message);
                    NavigationService.navigate('BottomTab', { screen: 'Customer' })
                    
                } else {
                    setButtonLoader(false)
                    Toast.show(res.message);
                }

            })
            .catch((err) => {
                console.log('addcustomerrrrrrerrrr', err);
                setButtonLoader(false)
            })

    })


    return (
        <View style={styles.container}>
            <BackHeader title='Add Customer' />
            {
                loading?(
                    <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.buttonColor} />
                </View>
                ):
                (
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ backgroundColor: colors.secondaryThemeColor, paddingBottom: moderateScale(10) }}>
                        <Text style={{ ...styles.personal_txt, color: colors.secondaryFontColor }}>Company Details</Text>
                        <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Name </Text>
                        <AppTextInput
                            inputContainerStyle={{ ...styles.inputcontainer_sty }}
                            inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                            placeholder='Enter Name'
                            value={customerName}
                            onChangeText={(val) => setCustomerName(val)}
                        />
                        <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Phone Number </Text>
                        <AppTextInput
                            inputContainerStyle={{ ...styles.inputcontainer_sty }}
                            inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                            placeholder='Enter Number'
                            maxLength={10}
                            keyboardType='phone-pad'
                            value={customerMobile}
                            onChangeText={(val) => setCustomerMobile(val)}
                        />
                        <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Email </Text>
                        <AppTextInput
                            inputContainerStyle={{ ...styles.inputcontainer_sty }}
                            inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                            placeholder='Enter email'
                            value={customerEmail}
                            onChangeText={(val) => setCustomerEmail(val)}
                        />
                        <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Pin </Text>
                        <AppTextInput
                            inputContainerStyle={{ ...styles.inputcontainer_sty }}
                            inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                            placeholder='Enter Pin'
                            keyboardType='phone-pad'
                            value={customerPin}
                            onChangeText={(val) => setCustomerPin(val)}
                        />
                         <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>State</Text>
                            <Picker
                                labelKey="name"
                                valueKey="id"
                                placeholder="Select State"
                                options={Satate}
                                textStyle={{ ...styles.picker_txt, color: colors.secondaryFontColor }}
                                containerStyle={{ ...styles.picker_sty, borderColor: colors.borderColor }}
                                selectedValue={stateId}
                                onValueChange={(val)=>setStateId(val)}
                            />
                        <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Address</Text>
                        <AppTextInput
                            multiline={true}
                            numberOfLines={4}
                            inputContainerStyle={{ ...styles.address_inputcontainer_sty }}
                            inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                            placeholder='Address'
                            textAlignVertical='top'
                            value={customerAddress}
                            onChangeText={(val) => setCustomerAddress(val)}
                        />
                    </View>
                    <View style={{ backgroundColor: colors.secondaryThemeColor, marginTop: moderateScale(10), paddingBottom: moderateScale(10) }}>
                        <Text style={{ ...styles.personal_txt, color: colors.secondaryFontColor }}>Company Details</Text>
                        <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>GST Number </Text>
                        <AppTextInput
                            inputContainerStyle={{ ...styles.inputcontainer_sty }}
                            inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                            placeholder='Enter GST Number'
                        />
                        <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Company Name </Text>
                        <AppTextInput
                            inputContainerStyle={{ ...styles.inputcontainer_sty, backgroundColor: colors.borderColor }}
                            inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        />
                        <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Company Email </Text>
                        <AppTextInput
                            inputContainerStyle={{ ...styles.inputcontainer_sty, backgroundColor: colors.borderColor }}
                            inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        />
                        <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Company Phone </Text>
                        <AppTextInput
                            inputContainerStyle={{ ...styles.inputcontainer_sty, backgroundColor: colors.borderColor }}
                            inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                            maxLength={10}
                            keyboardType='number-pad'
                        />
                        <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Company Address </Text>
                        <AppTextInput
                            inputContainerStyle={{ ...styles.inputcontainer_sty, backgroundColor: colors.borderColor }}
                            inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        />
                    </View>
                    <AppButton
                        textStyle={{ ...styles.buttn_txt, color: colors.buttontxtColor }}
                        style={styles.button_sty}
                        title="Update Customer"
                        onPress={() => getUpdateCustomer()}
                        loader={buttonLoader ? { position: "right", color: "#fff", size: "small" } : null}
                        disabled={buttonLoader}
                    />
                </KeyboardAwareScrollView>
                )}
          
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
        borderWidth: 1,
        alignSelf: 'center',
        height: moderateScale(45),
        borderRadius: moderateScale(5),
        borderWidth: 1,
        paddingLeft: moderateScale(7),
        marginHorizontal: moderateScale(15)
    },
    address_inputcontainer_sty: {
        borderWidth: 1,
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
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
export default EditCustomerFrom;
