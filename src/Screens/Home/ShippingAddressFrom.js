//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppButton, AppTextInput, Picker, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import { useSelector } from 'react-redux';
import HomeService from '../../Services/HomeServises';
import NavigationService from '../../Services/Navigation';
import Toast from "react-native-simple-toast";


const { height, width } = Dimensions.get('screen')
// create a component
const ShippingAddressFrom = ({ route, navigation }) => {
    const colors = useTheme();
    const { userData } = useSelector(state => state.User);
    const [Satate, setSatate] = useState([]);
    const [formData, setFormData] = useState({
        address1: '',
        address2: '',
        pincode: '',
        city: '',
        state: '',
        stateName: '',
    });

    useEffect(() => {
        getState();
        if (route.params?.existingAddress) {
            setFormData(route.params.existingAddress);
        }
    }, [route.params]);

    const handleInputChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        console.log(`Updating ${name} to ${value}`);
    };
    const handleStateChange = (stateId) => {
        const selectedState = Satate.find(state => state.id === stateId);
        const stateName = selectedState ? selectedState.name : '';

        setFormData(prevState => ({
            ...prevState,
            state: stateId,
            stateName: stateName,
        }));
        console.log(`Selected state ID: ${stateId}, Name: ${stateName}`);
    };

    const validateForm = () => {
        let hasError = false;
    
        if (formData.address1.trim() === '') {
            Toast.show('Address 1 is required.');
            hasError = true;
            return false
        }
        if (formData.pincode.trim() === '') {
            Toast.show('Pincode is required.');
            hasError = true;
            return false
        }
        if (formData.city.trim() === '') {
            Toast.show('City is required.');
            hasError = true;
            return false
        }
        if (formData.state.trim() === '') {
            Toast.show('State is required.');
            hasError = true;
            return false
        }

        return !hasError;
    };
    
    const handleSubmit = () => {
        if (validateForm()) {
            // Pass the data back to the previous screen
            NavigationService.navigate('CreateInvoice', { updatedAddress: formData });
        }
    };


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


    return (
        <View style={styles.container}>
            <BackHeader title='Shipping Address' />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: colors.secondaryThemeColor, paddingBottom: moderateScale(20) }}>
                    <Text style={{ ...styles.personal_txt, color: colors.secondaryFontColor }}>Enter Address</Text>
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Address 1</Text>
                    <AppTextInput
                        inputContainerStyle={styles.inputcontainer_sty}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        value={formData.address1}
                        onChangeText={(value) => handleInputChange('address1', value)}
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Address 2</Text>
                    <AppTextInput
                        inputContainerStyle={styles.inputcontainer_sty}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        value={formData.address2}
                        onChangeText={(value) => handleInputChange('address2', value)}
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Pincode</Text>
                    <AppTextInput
                        inputContainerStyle={styles.inputcontainer_sty}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType='phone-pad'
                        value={formData.pincode}
                        onChangeText={(value) => handleInputChange('pincode', value)}
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>City</Text>
                    <AppTextInput
                        inputContainerStyle={styles.inputcontainer_sty}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        value={formData.city}
                        onChangeText={(value) => handleInputChange('city', value)}
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>State</Text>
                    <Picker
                        labelKey="name"
                        valueKey="id"
                        placeholder="Select State"
                        options={Satate}
                        textStyle={{ ...styles.picker_txt, color: colors.secondaryFontColor }}
                        containerStyle={{ ...styles.picker_sty, borderColor: colors.borderColor }}
                        selectedValue={formData.state}
                        onValueChange={handleStateChange}
                    />
                </View>
                <View style={{ height: moderateScale(90) }} />
                <AppButton
                    textStyle={{ ...styles.buttn_txt, color: colors.buttontxtColor }}
                    style={styles.button_sty}
                    title="Add Address"
                    onPress={handleSubmit}
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
