//import liraries
import React, { Component, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, PermissionsAndroid, Pressable, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { AppButton, AppTextInput, Icon, StatusBar, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationService from '../../Services/Navigation';
import Modal from "react-native-modal";
import { useRoute } from '@react-navigation/native';
import AuthService from '../../Services/Auth';
import { Formik } from 'formik';
import * as yup from 'yup';
import Toast from "react-native-simple-toast";
import HttpClient from '../../Utils/HttpClient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const { height, width } = Dimensions.get('screen')
// create a component
const SignupDetails = () => {
    const colors = useTheme()
    const route = useRoute()
    const regData = route.params.allData
    // console.log('resssssssssssssssssssssss=========================', regData);
    const [GSTno, setGSTno] = useState(regData?.gst_no)
    const [buttonLoader, setButtonLoader] = useState(false);
    const [allRegData, setAllRegData] = useState({})
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCnf, setShowPasswordCnf] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [isModalimg, setModalImg] = useState(false);
    const [isModalCompanyimg, setModalCompanyImg] = useState(false);
    const [ImageSignData, setImageSignData] = useState(" ");
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [ImageCompanyData, setImageCompanyData] = useState(" ");
    const [selectedCompanyDocuments, setSelectedCompanyDocuments] = useState([]);

    const SignupSchema = yup.object().shape({
        signature: yup.string().required('Authorize Signature is required'),
        name: yup.string().required('Name is required'),
        mobile: yup.string().matches(/^[6-9]\d{9}$/, 'Invalid mobile number').required('Phone number is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            'Password must contain at least one letter, one number, and one special character'
        )
        .required('Password is required'),
        Cnfpassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        // Add other fields validations here
    });

    const openCamera = async (type, options) => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "App Camera Permission",
                        message: "App needs access to your camera",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Camera permission denied");
                    return;
                }
            }
            onButtonPress(type, options);
        } catch (err) {
            console.warn(err);
        }
    };


    const onButtonPress = async (type, options) => {
        try {
            // Capture or select image from the library
            const result = type === 'capture'
                ? await launchCamera(options)
                : await launchImageLibrary({ ...options, selectionLimit: 1 });

            if (result?.assets && result.assets.length > 0) {
                const asset = result.assets[0]; // First image selected
                console.log('Selected Image0:========================', asset);
                setSelectedDocuments([asset]);

                // Prepare the file object for upload
                const file = {
                    uri: asset.uri,
                    type: asset.type,
                    name: asset.fileName || `image_${Date.now()}.jpg`, // Fallback to timestamp if no name
                };

                if (file.uri && file.type && file.name) {
                    console.log('File Details:=====================', file);

                    // Create form data for the file upload
                    const formData = new FormData();
                    formData.append('file',file);

                    try {
                        console.log('Uploading file:==============================', JSON.stringify(formData));
                        // Use the fetch API to send a POST request
                        const response = await fetch('https://sahyog.acuitysoftware.in/sahyog/upload_signature.php', {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });
                        const responseJson = await response.json();
                        console.log('Upload Successful:=============================signnnnnnnnnnnnnn======================', responseJson);
                        // Handle the response
                        if (responseJson?.url) {
                            // console.log('Upload Successful:===================================================', responseJson.url);
                            setImageSignData(responseJson.url);
                        } else {
                            console.log('Upload Response:', responseJson);
                        }
                    } catch (uploadError) {
                        console.error('Image Upload Error:', uploadError);
                    }
                } else {
                    console.error('Invalid file object properties:', file);
                }

                setModalImg(false);
            }
        } catch (error) {
            console.error('Error in onButtonPress:', error);
        }
    };

    const openCameraModal = async (type, options) => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "App Camera Permission",
                        message: "App needs access to your camera",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Camera permission denied");
                    return;
                }
            }
            OpenButtonPress(type, options);
        } catch (err) {
            console.warn(err);
        }
    };

    const OpenButtonPress = async (type, options) => {
        try {
            // Capture or select image from the library
            const result = type === 'capture'
                ? await launchCamera(options)
                : await launchImageLibrary({ ...options, selectionLimit: 1 });

            if (result?.assets && result.assets.length > 0) {
                const asset = result.assets[0]; // First image selected
                console.log('Selected Image:======================', asset);
                setSelectedCompanyDocuments([asset]);

                // Prepare the file object for upload
                const file = {
                    uri: asset.uri,
                    type: asset.type,
                    name: asset.fileName || `image_${Date.now()}.jpg`, // Fallback to timestamp if no name
                };

                if (file.uri && file.type && file.name) {
                    console.log('File Details:', file);
                    // Create form data for the file upload
                    const formData = new FormData();
                    formData.append('file',file);

                    try {
                        console.log('Uploading file:', JSON.stringify(formData));
                        // Use the fetch API to send a POST request
                        const response = await fetch('https://sahyog.acuitysoftware.in/sahyog/upload_customer.php', {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });
                        const responseJson = await response.json();
                        console.log('Upload Successful:============================customerrrrrrrrrrrrrrrrrrrr=====================', responseJson);
                        // Handle the response
                        if (responseJson?.url) {
                            console.log('Upload Successful:', responseJson.url);
                            setImageCompanyData(responseJson.url);
                        } else {
                            console.log('Upload Response:', responseJson);
                        }
                    } catch (uploadError) {
                        console.error('Image Upload Error:', uploadError);
                    }
                } else {
                    console.error('Invalid file object properties:', file);
                }

                setModalCompanyImg(false);
            }
        } catch (error) {
            console.error('Error in onButtonPress:', error);
        }
    };

    // Additional logs
    console.log('Selected Documents:===================11111111111111', selectedDocuments);


    const getSignupDetails = (values) => {
        let data = {
            "signature_img_url": ImageSignData,
            "gst_no": values.GSTno || " ",
            "mobile_no": values.mobile,
            "auth_signature": values.signature,
            "name": values.name,
            "phone": values.mobile,
            "email": values.email,
            "password": values.password,
            "customer_img_url": ImageCompanyData
        };
        console.log('Signup Data:============', data);
        setAllRegData(data)
        setModalVisible(true)
    };

    const handelUserResister = () => {
        setButtonLoader(true);
        AuthService.setSignUpDetails(allRegData)
            .then((res) => {
                console.log('signup resulttttttttttttttttttttttttttttt', res);
                if (res && res.error == false) {
                    NavigationService.navigate('OldLogin', { allData: res?.data });
                    Toast.show(res.message);
                    setButtonLoader(false);
                } else {
                    Toast.show(res.message);
                    setButtonLoader(false);
                }

            })
            .catch((err) => {
                setButtonLoader(false);
                console.log('Error:', err);
            });
    }

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
                <Text style={{ ...styles.personal_txt, color: colors.secondaryFontColor }}>Personal Details</Text>
                <View style={styles.img_view}>
                    <View style={{ ...styles.img_bix, borderColor: colors.borderColor }}>
                        {
                            selectedDocuments.length > 0 ?
                                <Image
                                    source={{ uri: selectedDocuments[0]?.uri }}
                                    style={styles.add_img_sty}
                                />
                                :
                                <Image source={require('../../assets/images/addimg_logo.png')} style={styles.add_img} />
                        }


                    </View>
                    <Pressable
                        onPress={() => setModalImg(true)}
                        style={{ ...styles.upload_view, borderColor: colors.buttonColor }}>
                        <Text style={{ ...styles.upload_txt, color: colors.buttonColor }}>Upload Signature</Text>
                        <Icon name='upload-to-cloud' type='Entypo' color={colors.buttonColor} />
                    </Pressable>
                </View>

                <Formik
                    initialValues={{
                        signature: '',
                        name: '',
                        mobile: regData?.mobile_no || '',
                        email: '',
                        password: '',
                        Cnfpassword: '',
                        GSTno: regData?.gst_no || ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={getSignupDetails}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            {/* Signature Field */}
                            <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Authorize Signature </Text>
                            <AppTextInput
                                inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                placeholder='Enter Signature'
                                value={values.signature}
                                onChangeText={handleChange('signature')}
                                onBlur={handleBlur('signature')}
                            // errorMessage={touched.signature && errors.signature ? errors.signature : ''}
                            />
                            {errors.signature && touched.signature && (
                                <Text style={styles.errorText}>{errors.signature}</Text>
                            )}

                            {/* Name Field */}
                            <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Name</Text>
                            <AppTextInput
                                inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                placeholder='Enter Name'
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                            />
                            {errors.name && touched.name && (
                                <Text style={styles.errorText}>{errors.name}</Text>
                            )}

                            {/* Mobile Field */}
                            <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Phone</Text>
                            <AppTextInput
                                inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                value={values.mobile}
                                onChangeText={handleChange('mobile')}
                                onBlur={handleBlur('mobile')}
                                editable={false}
                                maxLength={10}
                            />
                            {errors.mobile && touched.mobile && (
                                <Text style={styles.errorText}>{errors.mobile}</Text>
                            )}

                            {/* Email Field */}
                            <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Email</Text>
                            <AppTextInput
                                inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                placeholder='Enter Email'
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            // errorMessage={touched.email && errors.email ? errors.email : ''}
                            />
                            {errors.email && touched.email && (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            )}

                            {/* Password Field */}
                            <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Password</Text>
                            <AppTextInput
                                inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                placeholder='Password'
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                secureTextEntry={!showPassword}
                                rightAction={
                                    <Icon
                                        name={showPassword ? 'eye-off' : 'eye'}
                                        type='Ionicon'
                                        onPress={() => setShowPassword(!showPassword)}  
                                    />
                                }
                            />
                            {errors.password && touched.password && (
                                <Text style={styles.errorText}>{errors.password}</Text>
                            )}

                            {/* Confirm Password Field */}
                            <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Confirm Password</Text>
                            <AppTextInput
                                inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                placeholder='Confirm Password'
                                value={values.Cnfpassword}
                                onChangeText={handleChange('Cnfpassword')}
                                onBlur={handleBlur('Cnfpassword')}
                                secureTextEntry={!showPasswordCnf}
                                rightAction={
                                    <Icon
                                        name={showPasswordCnf ? 'eye-off' : 'eye'}
                                        type='Ionicon'
                                        onPress={() => setShowPasswordCnf(!showPasswordCnf)}  
                                    />
                                }
                            />
                            {errors.Cnfpassword && touched.Cnfpassword && (
                                <Text style={styles.errorText}>{errors.Cnfpassword}</Text>
                            )}


                            <Text style={{ ...styles.personal_txt, color: colors.secondaryFontColor }}>Company Details</Text>
                            <View style={styles.img_view}>
                                <View style={{ ...styles.img_bix, borderColor: colors.borderColor }}>
                                    {
                                        selectedCompanyDocuments.length > 0 ?
                                            <Image
                                                source={{ uri: selectedCompanyDocuments[0]?.uri }}
                                                style={styles.add_img_sty}
                                            />
                                            :
                                            <Image source={require('../../assets/images/addimg_logo.png')} style={styles.add_img} />
                                    }

                                </View>

                                <Pressable
                                    onPress={() => setModalCompanyImg(true)}
                                    style={{ ...styles.upload_view, width: moderateScale(100), borderColor: colors.buttonColor }}>
                                    <Text style={{ ...styles.upload_txt, color: colors.buttonColor }}>Upload</Text>
                                    <Icon name='upload-to-cloud' type='Entypo' color={colors.buttonColor} />
                                </Pressable>

                            </View>
                            <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>GST Number</Text>
                            <AppTextInput
                                inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                placeholder='07AAPCA6346P1ZX'
                                value={GSTno}
                                onChangeText={(val) => setGSTno(val)}
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
                                maxLength={10}
                            />

                            <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Business address</Text>
                            <AppTextInput
                                multiline={true}
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
                                onPress={handleSubmit}
                            />

                        </>
                    )}
                </Formik>
            </KeyboardAwareScrollView>

            <Modal isVisible={isModalVisible}
                onBackButtonPress={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Image source={require('../../assets/images/successlogo.png')} style={{ height: 60, width: 60 }} />
                    <Text style={{ ...styles.modal_massege, color: colors.primaryFontColor }}>Registration  Successful</Text>

                    <TouchableOpacity
                        onPress={() => handelUserResister()}
                        style={{ ...styles.modalbutton_sty, backgroundColor: colors.buttonColor }}>
                        {buttonLoader ?
                            <ActivityIndicator size={'small'} color={'#fff'} />
                            :
                            <Text style={{ ...styles.button_txt_sty, color: colors.buttontxtColor }}>Ok</Text>
                        }
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal isVisible={isModalimg}
                onBackButtonPress={() => setModalImg(false)}
                onBackdropPress={() => setModalImg(false)}
                transparent={true}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Upload Photo!</Text>
                    <TouchableOpacity
                        style={styles.modalbutton}
                        onPress={() => openCamera('capture', {
                            saveToPhotos: true,
                            mediaType: 'photo',
                            includeBase64: false,
                            maxWidth: 500,
                            maxHeight: 500,
                            quality: 0.5
                        })}
                    >
                        <Text style={{ ...styles.modalbuttonText, color: colors.buttonColor }}>
                            <Icon name="camera" size={18} type='Entypo' color={colors.buttonColor} />
                            {" "}Camera
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.modalbutton}
                        onPress={() => openCamera('library', {
                            selectionLimit: 1,
                            mediaType: 'photo',
                            includeBase64: false,
                            maxWidth: 500,
                            maxHeight: 500,
                            quality: 0.5
                        })}
                    >
                        <Text style={{ ...styles.modalbuttonText, color: colors.buttonColor }}>
                            <Icon name="image" size={18} type='Entypo' color={colors.buttonColor} />
                            {" "}Library
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.modalCancel}
                        onPress={() => setModalImg(false)}>
                        <Text style={styles.modalCancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>


            <Modal isVisible={isModalCompanyimg}
                onBackButtonPress={() => setModalCompanyImg(false)}
                onBackdropPress={() => setModalCompanyImg(false)}
                transparent={true}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Upload Photo!</Text>
                    <TouchableOpacity
                        style={styles.modalbutton}
                        onPress={() => openCameraModal('capture', {
                            saveToPhotos: true,
                            mediaType: 'photo',
                            includeBase64: false,
                            maxWidth: 500,
                            maxHeight: 500,
                            quality: 0.5
                        })}
                    >
                        <Text style={{ ...styles.modalbuttonText, color: colors.buttonColor }}>
                            <Icon name="camera" size={18} type='Entypo' color={colors.buttonColor} />
                            {" "}Camera
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.modalbutton}
                        onPress={() => openCameraModal('library', {
                            selectionLimit: 1,
                            mediaType: 'photo',
                            includeBase64: false,
                            maxWidth: 500,
                            maxHeight: 500,
                            quality: 0.5
                        })}
                    >
                        <Text style={{ ...styles.modalbuttonText, color: colors.buttonColor }}>
                            <Icon name="image" size={18} type='Entypo' color={colors.buttonColor} />
                            {" "}Library
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.modalCancel}
                        onPress={() => setModalCompanyImg(false)}>
                        <Text style={styles.modalCancelText}>Cancel</Text>
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
    add_img_sty: {
        height: moderateScale(120),
        width: moderateScale(120),
        borderRadius: moderateScale(10),
        resizeMode: 'cover'
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
    errorText: {
        fontSize: moderateScale(12),
        color: 'red',
        fontFamily: FONTS.Jost.medium,
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(5)
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: moderateScale(20),
        margin: moderateScale(20),
        borderRadius: moderateScale(10),
        alignItems: 'center',
    },
    modalTitle: {
        padding: moderateScale(10),
        borderBottomWidth: 1,
        marginBottom: moderateScale(15),
        fontSize: moderateScale(18),
        fontFamily: FONTS.Jost.semibold,
    },
    modalbutton: {
        marginBottom: moderateScale(10),
    },
    modalbuttonText: {
        fontSize: moderateScale(18),
        padding: moderateScale(10),
        fontFamily: FONTS.Jost.medium,
    },
    modalCancelText: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Jost.regular,
        color: '#000'
    }
});

//make this component available to the app
export default SignupDetails;
