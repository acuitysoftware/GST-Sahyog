//import libraries
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { AppButton, AppTextInput, StatusBar, Text, useTheme } from 'react-native-basic-elements';
import { Svg, Path } from 'react-native-svg';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationService from '../../Services/Navigation';
import AuthService from '../../Services/Auth';
import Toast from "react-native-simple-toast";

const { height, width } = Dimensions.get('screen');
// create a component
const Signup = () => {
    const colors = useTheme();
    const [gstNumber, setGstNumber] = useState('')
    const [mobile, setMobile] = useState('')
    const [buttonLoader, setButtonLoader] = useState(false);

    const validateMobile = (mobile) => {
        const regex = /^[6-9]\d{9}$/;
        return regex.test(mobile);
    };
    const getSignup = () => {
        if (!mobile || mobile.trim() === "") {
            Toast.show('Please enter mobile number.');
            return;
        }
        if (!validateMobile(mobile)) {
            Toast.show('Please enter a valid mobile number.');
            return;
        }
        let data = {
            "gst_no": gstNumber,
            "mobile_no": mobile
        }
        console.log('resdaaaaaaaaaaaa', data);
        setButtonLoader(true)
        AuthService.setSignUp(data)
            .then((res) => {
                if (res) {
                    setButtonLoader(false);
                    Toast.show(res.message);
                    NavigationService.navigate('SignupDetails', { allData: res });
                } else {
                    Toast.show(res.message,);
                    setButtonLoader(false);
                }
            })
            .catch((err) => {
                setButtonLoader(false);
                console.log('errrr', err);
                // Toast.show('An error occurred. Please try again.');
            });
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="transparent"
                barStyle="light-content"
                translucent={true}
            />
            <KeyboardAwareScrollView>
                <Svg
                    height={height / 2.8}
                    width={width}
                >
                    <Path
                        d={`
                        M 0 0 
                        H ${width} 
                        V ${height / 3.5 - moderateScale(90)} 
                        C ${width} ${height / 3 + moderateScale(20)}, 
                          0 ${height / 2.5 + moderateScale(0)}, 
                          0 ${height / 3.5 - moderateScale(80)} 
                        Z
                    `}
                        fill={colors.primaryThemeColor}
                    />
                    <Image source={require('../../assets/images/reg_gst.png')} style={styles.gst_img} />
                </Svg>

                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>GST Number</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Enter GST Number'
                    value={gstNumber}
                    onChangeText={(val) => setGstNumber(val)}
                />
                <Text style={{ ...styles.input_title, marginTop: moderateScale(15), color: colors.secondaryFontColor }}>Mobile Number</Text>
                <AppTextInput
                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                    placeholder='Enter Mobile Number'
                    value={mobile}
                    maxLength={10}
                    keyboardType='number-pad'
                    onChangeText={(val) => setMobile(val)}
                />
            </KeyboardAwareScrollView>
            <View style={{ flex: 1 }} />
            <AppButton
                textStyle={{ ...styles.buttn_txt, color: colors.buttontxtColor }}
                style={styles.button_sty}
                title="Signup"
                onPress={() => getSignup()}
                loader={
                    buttonLoader
                        ? {
                            position: "right",
                            color: "#fff",
                            size: "small",
                        }
                        : null
                }
                disabled={buttonLoader}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gst_img: {
        height: moderateScale(220),
        width: width,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: moderateScale(30)
    },
    input_title: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Jost.regular,
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(30)
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
        marginBottom: moderateScale(30),
        marginTop: moderateScale(10)
    },
});

//make this component available to the app
export default Signup;
