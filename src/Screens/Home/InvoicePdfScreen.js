//import liraries
import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions, ActivityIndicator, RefreshControl, Platform, Alert, PermissionsAndroid } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { AppButton, Card, Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import NavigationService from '../../Services/Navigation';
import { useSelector } from 'react-redux';
import HomeService from '../../Services/HomeServises';
import RNFS from 'react-native-fs';
import { request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

const { height, width } = Dimensions.get('screen')
// create a component
const InvoicePdfScreen = () => {
    const colors = useTheme()
    const route = useRoute()
    const { userData } = useSelector(state => state.User);
    const Invoice_ID = route.params.invoiceIDdata;
    const [loading, setLoading] = useState(true);
    const [invoiceFullData, setInvoiceFullData] = useState({})
    console.log('fulllllllllllllllllllllllllllllllllllllldataaaaaaaaaaaaaaaaaaaaaaaaaa', invoiceFullData);
    const [totalQuantity, setTotalQuantity] = useState(null);
    const [getPdfUrl, setGetPdfUrl] = useState('');
    console.log('pdfffffffffffffffffffffffffffffffffffffffffffffffffffffffff', getPdfUrl);
    const [totalProduct, setTotalProduct] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    console.log('invvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', Invoice_ID)




    useEffect(() => {
        getInvoiceData();
    }, [])

    const getInvoiceData = (() => {
        let data = {
            "userid": userData?.userid,
            "invoice_id": Invoice_ID
        }

        setLoading(true)
        HomeService.FetchFullInvoiceData(data)
            .then((res) => {
                console.log('fullllllllllllllllllllllinvoice=========================================', JSON.stringify(res, null, 2));
                if (res && res.error == false) {
                    setInvoiceFullData(res.data)
                    setGetPdfUrl(res?.data?.invoice_create_pdf_url)
                    setTotalProduct(res?.data?.product)
                    const totalQuantity = res?.data?.product?.reduce((sum, item) => sum + parseFloat(item.quantity), 0);
                    setTotalQuantity(totalQuantity)
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log('invoicedataerrr', err);
                setLoading(false)
            })
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simulate an API call or data fetching
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);


    const requestStoragePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                // Check for Android 11 and above
                if (Platform.Version >= 30) {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
                        {
                            title: "App Storage Permission",
                            message: "App needs access to manage storage to download files",
                            buttonNeutral: "Ask Me Later",
                            buttonNegative: "Cancel",
                            buttonPositive: "OK"
                        }
                    );
    
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log("Storage permission granted");
                        downloadPDF(); // Your download logic here
                    } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
                        Alert.alert('Permission Denied', 'You need to allow storage access to download files.');
                    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                        handleBlockedPermission();
                    }
                } else {
                    // For Android versions below 11 (API level 30)
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        {
                            title: "App Storage Permission",
                            message: "App needs access to your storage to download files",
                            buttonNeutral: "Ask Me Later",
                            buttonNegative: "Cancel",
                            buttonPositive: "OK"
                        }
                    );
    
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log("Storage permission granted");
                        downloadPDF(); // Your download logic here
                    } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
                        Alert.alert('Permission Denied', 'You need to allow storage access to download files.');
                    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                        handleBlockedPermission();
                    }
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };
    
    // Function to handle when permission is blocked
    const handleBlockedPermission = () => {
        Alert.alert(
            'Permission Blocked',
            'Storage permission is blocked. Go to settings to enable it manually.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => openSettings() },
            ]
        );
    };
   
    const downloadPDF = async () => {
        const pdfUrl =getPdfUrl ;
        const fileName = 'invoice.pdf';
        const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;

        try {
            const response = await RNFS.downloadFile({
                fromUrl: pdfUrl,
                toFile: downloadDest,
            }).promise;

            if (response.statusCode === 200) {
                Alert.alert('Download Complete', `File downloaded to: ${downloadDest}`);
            } else {
                Alert.alert('Download Failed', 'An error occurred while downloading the file.');
            }
        } catch (error) {
            Alert.alert('Download Error', `An error occurred: ${error.message}`);
        }
    };

  
    // const downloadPDF = async () => {
    //     // Request permission for Android
    //     if (Platform.OS === 'android') {
    //         const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

    //         if (result !== RESULTS.GRANTED) {
    //             Alert.alert('Permission Denied', 'You need to give storage permission to download the file.');
    //             return;
    //         }
    //     }

    //     const fileName = 'invoice.pdf';
    //     const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    //     try {
    //         // Download the file
    //         const response = await RNFS.downloadFile({
    //             fromUrl: pastedURL,
    //             toFile: downloadDest,
    //         }).promise;

    //         // Check if download was successful
    //         if (response.statusCode === 200) {
    //             Alert.alert('Download Complete', `File downloaded to: ${downloadDest}`);
    //         } else {
    //             Alert.alert('Download Failed', 'An error occurred while downloading the file.');
    //         }
    //     } catch (error) {
    //         Alert.alert('Download Error', `An error occurred: ${error.message}`);
    //     }
    // };





    return (
        <View style={styles.container}>
            <BackHeader title='invoice' />
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.buttonColor} />
                </View>
            ) :
                (
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        showsVerticalScrollIndicator={false}>
                        <Card style={{ ...styles.card_sty, backgroundColor: colors.cardColor }}>
                            <View>
                                <View style={styles.shop_view}>
                                    <View>
                                        <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>Fashion Shop</Text>
                                        {/* <Text style={{
                                            ...styles.gstin_txt,
                                            color: colors.secondaryFontColor
                                        }}>GSTIN : <Text style={styles.gstin_number}>29AAACH7409R1ZX</Text></Text> */}
                                        <Text style={{
                                            ...styles.gstin_txt,
                                            color: colors.secondaryFontColor
                                        }}>State Code  : <Text style={styles.gstin_number}>{invoiceFullData?.user_state}</Text></Text>
                                        <Text style={{
                                            ...styles.gstin_txt,
                                            color: colors.secondaryFontColor
                                        }}>Mobile : <Text style={styles.gstin_number}>{invoiceFullData?.user_phone}</Text></Text>
                                        <Text style={{
                                            ...styles.gstin_txt,
                                            color: colors.secondaryFontColor
                                        }}>Email : <Text style={styles.gstin_number}>{invoiceFullData?.user_email}</Text></Text>
                                        <Text style={{
                                            ...styles.gstin_txt,
                                            color: colors.secondaryFontColor
                                        }}>Name : <Text style={styles.gstin_number}>{invoiceFullData?.user_name}</Text></Text>


                                    </View>
                                    <View style={{ ...styles.img_view, backgroundColor: colors.borderColor }}>

                                        <Image source={{ uri: invoiceFullData?.customer_img_url }} style={styles.shop_img} />
                                        {/* <Image source={require('../../assets/images/fashion.png')} style={styles.shop_img} /> */}
                                    </View>
                                </View>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Register Office : <Text style={styles.gstin_number}>{invoiceFullData?.user_address}</Text></Text>
                                <View style={styles.shop_bottom_view}>
                                    <View>
                                        <Text style={{
                                            ...styles.gstin_txt,
                                            color: colors.secondaryFontColor
                                        }}>Invoice Number : </Text>
                                        <Text style={{ ...styles.gstin_number, marginTop: 0, color: colors.secondaryFontColor }}>{invoiceFullData?.invoice_number}</Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            ...styles.gstin_txt,
                                            color: colors.secondaryFontColor
                                        }}>Invoice Date : </Text>
                                        <Text style={{ ...styles.gstin_number, marginTop: 0, color: colors.secondaryFontColor }}>{invoiceFullData?.create_date}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ ...styles.line, borderColor: colors.borderColor }} />
                            <View style={{ marginTop: moderateScale(10) }}>
                                <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>Bill To</Text>
                                {/* <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>GSTIN : <Text style={styles.gstin_number}>29AAACH7409R1ZX</Text></Text> */}
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>State Code  : <Text style={styles.gstin_number}>{invoiceFullData?.customer?.state}</Text></Text>
                                <Text style={{ ...styles.shop_name, marginTop: moderateScale(5), color: colors.secondaryFontColor }}>{invoiceFullData?.customer?.name}</Text>

                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>
                                    Address: <Text style={styles.gstin_number}>
                                        {invoiceFullData?.customer?.address}
                                    </Text>
                                </Text>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Pin Code  : <Text style={styles.gstin_number}>{invoiceFullData?.customer?.pin_code}</Text></Text>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Mobile  : <Text style={styles.gstin_number}>{invoiceFullData?.customer?.phone_number}</Text></Text>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Email  : <Text style={styles.gstin_number}>{invoiceFullData?.customer?.email}</Text></Text>
                                {/* <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Eway bill Number  : <Text style={styles.gstin_number}>545585</Text></Text>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Einvoice Number  : <Text style={styles.gstin_number}>54845585</Text></Text> */}
                            </View>
                            <View style={{ marginTop: moderateScale(15) }}>
                                <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>Ship To</Text>
                                {/* <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>GSTIN : <Text style={styles.gstin_number}>29AAACH7409R1ZX</Text></Text> */}
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>State Code  : <Text style={styles.gstin_number}>{invoiceFullData?.shipping_address?.state}</Text></Text>
                                <Text style={{ ...styles.shop_name, marginTop: moderateScale(5), color: colors.secondaryFontColor }}>{invoiceFullData?.customer?.name}</Text>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>
                                    Address: <Text style={styles.gstin_number}>
                                        {invoiceFullData?.shipping_address?.address1 + ' '
                                            + invoiceFullData?.shipping_address?.address2 + ' '
                                            + invoiceFullData?.shipping_address?.city
                                        }
                                    </Text>
                                </Text>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Pin Code  : <Text style={styles.gstin_number}>{invoiceFullData?.shipping_address?.pincode}</Text></Text>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Mobile  : <Text style={styles.gstin_number}>{invoiceFullData?.customer?.phone_number}</Text></Text>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Email  : <Text style={styles.gstin_number}>{invoiceFullData?.customer?.email}</Text></Text>
                                {/* <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Eway bill Number  : <Text style={styles.gstin_number}>545585</Text></Text>
                                <Text style={{
                                    ...styles.gstin_txt,
                                    color: colors.secondaryFontColor
                                }}>Einvoice Number  : <Text style={styles.gstin_number}>54845585</Text></Text> */}
                            </View>
                            <View style={{ ...styles.line, borderColor: colors.borderColor }} />

                            <Text style={{ ...styles.shop_name, marginTop: moderateScale(10), color: colors.secondaryFontColor }}>{`Item (${totalQuantity} Product)`}</Text>
                            {
                                totalProduct.map((product, ind) => {
                                    return (
                                        <View key={ind}>
                                            <View style={styles.sample_view}>
                                                <View>
                                                    <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>{product?.name}</Text>
                                                    <Text style={{
                                                        ...styles.sample_id,
                                                        fontSize: moderateScale(12),
                                                        color: colors.secondaryFontColor
                                                    }}>{`(qty: ${product?.quantity})`}</Text>
                                                    <Text style={{ ...styles.sample_id, color: colors.buttonColor }}>{`(HSN ${product?.hsn_code})`}</Text>
                                                </View>
                                                <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>₹ {product?.product_price}</Text>
                                            </View>
                                            <View style={{ ...styles.line, borderColor: colors.borderColor }} />
                                        </View>
                                    )
                                })
                            }

                            <View style={{ ...styles.line, marginTop: 0, borderColor: colors.secondaryFontColor }} />
                            <View style={{ ...styles.sample_view, marginTop: moderateScale(10) }}>
                                <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>Sub Total </Text>
                                <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>₹{invoiceFullData?.subtotal}</Text>
                            </View>

                            {invoiceFullData?.totalgst && (
                                <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                                    <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>CGST (9%) </Text>
                                    <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹ {invoiceFullData?.totalgst}</Text>
                                </View>
                            )}

                            {/* {invoiceFullData?.igst && (
                                <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                                    <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>IGST (9%) </Text>
                                    <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹ {invoiceFullData?.igst}</Text>
                                </View>
                            )} */}

                            {/* {invoiceFullData?. && (
                                <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>SGST (9%) </Text>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹ {invoiceFullData?.}</Text>
                            </View> 
                            )} */}

                            {invoiceFullData?.totalcess && (
                                <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                                    <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>CESS (9%) </Text>
                                    <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹ {invoiceFullData?.totalcess}</Text>
                                </View>
                            )}

                            {invoiceFullData?.shipping_charge && (
                                <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                                    <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>Delivery Charge  </Text>
                                    <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹{invoiceFullData?.shipping_charge}</Text>
                                </View>
                            )}

                            {invoiceFullData?.service_charge?.total && (
                                <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                                    <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>Service Charge </Text>
                                    <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹{invoiceFullData?.service_charge?.total}</Text>
                                </View>
                            )}

                            {/* <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>GST (18%) </Text>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹ 90cg </Text>
                            </View> */}

                            {invoiceFullData?.additional_charge && (
                                <View style={{ ...styles.sample_view, marginTop: moderateScale(15) }}>
                                    <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>Additional Charge  </Text>
                                    <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹{invoiceFullData?.additional_charge}</Text>
                                </View>
                            )}

                            {invoiceFullData?.total && (
                                <View style={{ ...styles.totalbox_view, backgroundColor: colors.primaryFontColor }}>
                                    <Text style={{ ...styles.gst_percentage, color: colors.secondaryThemeColor }}>Total  </Text>
                                    <Text style={{ ...styles.gst_percentage, color: colors.secondaryThemeColor }}>₹ {invoiceFullData?.totalprice}</Text>
                                </View>
                            )}

                            {invoiceFullData?.note && (
                                <View style={{ ...styles.note_view, borderColor: colors.borderColor }}>
                                    <Text style={{
                                        ...styles.gst_percentage, color: colors.secondaryFontColor
                                    }}>Note : <Text style={styles.note_txt}>{invoiceFullData?.note}</Text></Text>
                                </View>
                            )}

                            <Text style={{ ...styles.shop_name, marginTop: moderateScale(10), color: colors.secondaryFontColor }}>Authorized Signature</Text>

                            <Image source={{ uri: invoiceFullData?.signature_image }} style={styles.Signature_img} />
                            {/* <Image source={require('../../assets/images/Signature.png')} style={styles.Signature_img} /> */}

                            <View style={styles.date_view}>
                                <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>Date :</Text>
                                <View>
                                    <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>{invoiceFullData?.create_date}</Text>
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
                                style={{ ...styles.button_sty, backgroundColor: colors.invoicebutton }}
                                title="Download"
                                // onPress={() => NavigationService.navigate('BottomTab', { screen: 'Home' })}

                                // onPress={() => { requestStoragePermission() }}

                            />
                        </Card>
                    </ScrollView>
                )}

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: moderateScale(120),
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