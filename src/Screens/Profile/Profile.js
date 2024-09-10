//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, Pressable, PermissionsAndroid } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { AppButton, AppTextInput, Icon, Picker, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import HomeService from '../../Services/HomeServises';
import Toast from "react-native-simple-toast";
import NavigationService from '../../Services/Navigation';
import AuthService from '../../Services/Auth';
import { setUser } from '../../Redux/reducer/User';
import Modal from "react-native-modal";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const { height, width } = Dimensions.get('screen')
// create a component
const Profile = () => {
    const colors = useTheme()
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.User)
    const [loading, setLoading] = useState(true);
    const [authSignature, setAuthSignature] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [buttonLoader, setButtonLoader] = useState(false);
    const [Satate, setSatate] = useState([]);
    const [stateId, setStateId] = useState('')

    const [isModalimg, setModalImg] = useState(false);
    const [isModalCompanyimg, setModalCompanyImg] = useState(false);
    const [ImageSignData, setImageSignData] = useState(" ");
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [ImageCompanyData, setImageCompanyData] = useState(" ");
    const [selectedCompanyDocuments, setSelectedCompanyDocuments] = useState([]);



    console.log('imgggggggggggggggggggggggggggggdoccccccccccggggggggggggggggggg', ImageCompanyData);
    console.log('imgcommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', ImageSignData);



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
                    console.log('File Details:', file);

                    // Create form data for the file upload
                    const formData = new FormData();
                    formData.append('file', file);

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
                        // Handle the response
                        if (responseJson?.url) {
                            console.log('Upload Successful:=============', responseJson.url);
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
                console.log('Selected Image:', asset);
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
                    formData.append('file', file);

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


    useEffect(() => {
        getUserProfile()
        getState();
    }, [getUpdateProfile])

    const getUserProfile = (() => {
        let data = {
            "userid": userData.userid
        }
        setLoading(true)
        HomeService.setUserProfile(data)
            .then((res) => {
                console.log('usepppppppppppppppppppppppppppppppp', res);

                if (res && res.error == false) {
                    setAuthSignature(res?.data?.auth_signature)
                    setName(res?.data?.name)
                    setEmail(res?.data?.email)
                    setPhoneNumber(res?.data?.phone)
                    setAddress(res?.data?.address)
                    setStateId(res?.data?.state)
                    setImageSignData(res?.data?.signature_img_url)
                    setImageCompanyData(res?.data?.customer_img_url)
                    setSelectedCompanyDocuments(res?.data?.customer_img_url)
                    setSelectedDocuments(res?.data?.signature_img_url)
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log('fatchprofileerrrrrrr', err);
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


    const getUpdateProfile = (() => {
        let data = {
            "auth_signature": authSignature,
            "name": name,
            "phone": phoneNumber,
            "email": email,
            "userid": userData.userid,
            "state": stateId,
            "address": address,
            "signature_img_url": ImageSignData,
            "customer_img_url": ImageCompanyData
        }
        console.log('udaaaaaaatatttttttttt=========', data);
        setButtonLoader(true)
        HomeService.UpdateUserProfile(data)
            .then((res) => {
                console.log('updateeeeeeeeeeeeeeeeuserrrrrrrrrrrrrrrrrrrrrrrrrr', res);

                if (res && res.error == false) {
                    setButtonLoader(false)
                    Toast.show(res.message);
                    // dispatch(setUser({ ...userData, ...res.data }))
                    // AuthService.setAccount({ ...userData, ...res.data })
                    NavigationService.navigate('BottomTab', { screen: 'Home' })
                }
                else {
                    setButtonLoader(false)
                    Toast.show(res.message);
                }
            })
            .catch((err) => {
                console.log('updateprofileerrrr', err);
                setButtonLoader(false)
            })
    })
    return (
        <View style={styles.container}>
            <BackHeader title='My Account' />
            {
                loading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color={colors.buttonColor} />
                    </View>
                ) :
                    (
                        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ alignItems: 'center' }}>

                                {
                                    ImageCompanyData?.length > 0 ?
                                        <View style={{ ...styles.topimg_view, backgroundColor: colors.secondaryThemeColor }}>
                                            <Image
                                                source={{ uri: ImageCompanyData }}
                                                style={styles.img_sty}
                                            />
                                        </View>
                                        :
                                        <View style={{ ...styles.topimg_view, backgroundColor: colors.secondaryThemeColor }}>
                                            <Image source={require('../../assets/images/addimg_logo.png')} style={styles.add_img} />
                                        </View>

                                }


                                <TouchableOpacity
                                    onPress={() => setModalCompanyImg(true)}
                                    style={{ ...styles.camera_view, backgroundColor: colors.buttonColor }}>
                                    <Icon name='camera' size={18} type='AntDesign' color={colors.secondaryThemeColor} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.img_view}>
                                <View style={{ ...styles.img_bix, borderColor: colors.borderColor }}>
                                    {
                                        ImageSignData?.length > 0 ?
                                            <Image
                                                source={{ uri: ImageSignData }}
                                                style={styles.add_img_sty}
                                            />
                                            :
                                            <Image source={require('../../assets/images/addimg_logo.png')} style={styles.add_img} />
                                    }
                                </View>

                                <Pressable onPress={() => setModalImg(true)} style={{ ...styles.upload_view, borderColor: colors.buttonColor }}>
                                    <Text style={{ ...styles.upload_txt, color: colors.buttonColor }}>Upload Signature</Text>
                                    <Icon name='upload-to-cloud' type='Entypo' color={colors.buttonColor} />
                                </Pressable>

                            </View>
                            <Text style={{ ...styles.input_title, marginTop: moderateScale(20), color: colors.secondaryFontColor }}>Authorize Signature </Text>
                            <AppTextInput
                                inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                placeholder='Enter Name'
                                value={authSignature}
                                onChangeText={(val) => setAuthSignature(val)}
                            />
                            <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Name</Text>
                            <AppTextInput
                                inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                placeholder='Enter Name'
                                value={name}
                                onChangeText={(val) => setName(val)}
                            />
                            <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Email</Text>
                            <AppTextInput
                                inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                placeholder='Enter  Email'
                                value={email}
                                onChangeText={(val) => setEmail(val)}
                            />
                            <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Phone Number</Text>
                            <AppTextInput
                                inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                placeholder='Enter  Phone Number'
                                maxLength={10}
                                keyboardType='phone-pad'
                                value={phoneNumber}
                                onChangeText={(val) => setPhoneNumber(val)}
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
                                onValueChange={(val) => setStateId(val)}
                            />
                            <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Address</Text>
                            <AppTextInput
                                inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                placeholder='Enter Address'
                                value={address}
                                onChangeText={(val) => setAddress(val)}
                            />

                            <AppButton
                                textStyle={{ ...styles.buttn_txt, color: colors.buttontxtColor }}
                                style={styles.button_sty}
                                title="Save"
                                onPress={() => getUpdateProfile()}
                                loader={buttonLoader ? { position: "right", color: "#fff", size: "small" } : null}
                                disabled={buttonLoader}
                            />
                        </KeyboardAwareScrollView>
                    )}

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
    topimg_view: {
        height: moderateScale(110),
        width: moderateScale(110),
        borderRadius: moderateScale(60),
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: moderateScale(30)
    },
    img_sty: {
        height: moderateScale(90),
        width: moderateScale(90),
        resizeMode: 'cover',
        borderRadius: moderateScale(45)
    },
    camera_view: {
        height: moderateScale(30),
        width: moderateScale(30),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        borderRadius: moderateScale(15),
        position: 'absolute',
        bottom: moderateScale(18),
        right: moderateScale(110)
    },
    img_view: {
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(15),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(20)
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
    add_img_sty: {
        height: moderateScale(120),
        width: moderateScale(120),
        borderRadius: moderateScale(10),
        resizeMode: 'cover'
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
export default Profile;
