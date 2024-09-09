//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { AppButton, Card, Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import NavigationService from '../../Services/Navigation';
import { useSelector } from 'react-redux';
import HomeService from '../../Services/HomeServises';

const { height, width } = Dimensions.get('screen')
// create a component
const InvoicePdfScreen = () => {
    const colors = useTheme()
    const route = useRoute()
    const { userData } = useSelector(state => state.User);
    const InvoiceID = route.params.invoiceId
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState([])
    const [invoiceFullData, setInvoiceFullData] = useState({})
    console.log('fulllllllllllllllllllllllllllllllllllllldataaaaaaaaaaaaaaaaaaaaaaaaaa', invoiceFullData);
    const [totalQuantity, setTotalQuantity] = useState(null);
    const [totalProduct, setTotalProduct] = useState([])
    const [totalServiceCharge, setTotalServiceCharge] = useState({})
    const [totalProductPrice, setTotalProductPrice] = useState(0);
    const [cgstValue, setCgstValue] = useState(0);
    const [sgstValue, setSgstValue] = useState(0);
    const [gstValue, setGstValue] = useState(0);
    console.log('invvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', invoiceFullData?.service_charge?.serviceChargeAmount)


    useEffect(() => {
        if (invoiceFullData?.service_charge) {
            const parsedServiceCharge = JSON.parse(invoiceFullData.service_charge);
            setTotalServiceCharge(parsedServiceCharge)
            console.log('Service Charge Amount================:', parsedServiceCharge.serviceChargeAmount); 
        }
    }, [invoiceFullData]);


    useEffect(() => {
        getInvoiceData();
    }, [])

    useEffect(() => {
        getUserProfile()
    }, [])

    const getUserProfile = (() => {
        let data = {
            "userid": userData.userid
        }
        setLoading(true)
        HomeService.setUserProfile(data)
            .then((res) => {
                console.log('usepppppppppppppppppppppppppppppppp',res);
                
                if (res && res.error == false) {
                    setUserProfile(res?.data)
                    // setLoading(false)
                }
            })
            .catch((err) => {
                console.log('fatchprofileerrrrrrr', err);
                // setLoading(false)
            })
    })


    const getInvoiceData = (() => {
        let data = {
            "userid": userData?.userid,
            "invoice_id": InvoiceID
        }
        setLoading(true)
        HomeService.FetchFullInvoiceData(data)
            .then((res) => {
                console.log('fullllllllllllllllllllllinvoice=====================', JSON.stringify(res));
                if (res && res.error == false) {
                    setInvoiceFullData(res.data)
                    // setTotalServiceCharge(res?.data?.service_charge)
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


    useEffect(() => {
        let totalCgst = 0;
        let totalSgst = 0;
        let totalGst = 0;
        let totalPrice = 0;
      
        // Ensure `totalProduct` is defined and is an array
        if (totalProduct && Array.isArray(totalProduct)) {
          totalProduct.forEach(product => {
            const cgst = parseFloat(product.cgst) || 0;
            const sgst = parseFloat(product.sgst) || 0;
            const productPrice = parseFloat(product.product_price) || 0;
            const quantity = parseInt(product.quantity, 10) || 0;
      
            const price = productPrice * quantity;
            const cgstValue = price * (cgst / 100);
            const sgstValue = price * (sgst / 100);
      
            totalCgst += cgstValue;
            totalSgst += sgstValue;
            totalGst += cgstValue + sgstValue; // GST is CGST + SGST
            totalPrice += price;
          });
      
          // Set state values
          setCgstValue(totalCgst);
          setSgstValue(totalSgst);
          setGstValue(totalGst);
          setTotalProductPrice(totalPrice);
        } else {
          console.log('totalProduct is not defined or not an array');
        }
      }, [totalProduct]);


    return (
        <View style={styles.container}>
            <BackHeader title='invoice' />
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.buttonColor} />
                </View>
            ) :
                (
                    <ScrollView showsVerticalScrollIndicator={false}>
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
                                        }}>State Code  : <Text style={styles.gstin_number}>{userProfile?.state}</Text></Text>
                                        <Text style={{
                                            ...styles.gstin_txt,
                                            color: colors.secondaryFontColor
                                        }}>Mobile : <Text style={styles.gstin_number}>{userProfile?.mobile_no}</Text></Text>
                                        <Text style={{
                                            ...styles.gstin_txt,
                                            color: colors.secondaryFontColor
                                        }}>Email : <Text style={styles.gstin_number}>{userProfile?.email}</Text></Text>
                                       
                                      
                                    </View>
                                    <View style={{ ...styles.img_view, backgroundColor: colors.borderColor }}>
                                        <Image source={require('../../assets/images/fashion.png')} style={styles.shop_img} />
                                    </View>
                                </View>
                                <Text style={{
                                            ...styles.gstin_txt,
                                            color: colors.secondaryFontColor
                                        }}>Register Office : <Text style={styles.gstin_number}>{userProfile?.address}</Text></Text>
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
                                                    <Text style={{ ...styles.sample_id,
                                                        fontSize:moderateScale(12),
                                                        color: colors.secondaryFontColor }}>{`(qty: ${product?.quantity})`}</Text>
                                                    <Text style={{ ...styles.sample_id, color: colors.buttonColor }}>{`(HSN ${product?.hsn_code})`}</Text>
                                                </View>
                                                <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>₹ {product?.product_price}</Text>
                                            </View>
                                            <View style={{ ...styles.line, borderColor: colors.borderColor }} />
                                        </View>
                                    )
                                })
                            }
                         
                            <View style={{ ...styles.line, marginTop:0,borderColor: colors.secondaryFontColor }} />
                            <View style={{ ...styles.sample_view, marginTop: moderateScale(10) }}>
                                <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>Sub Total </Text>
                                <Text style={{ ...styles.shop_name, color: colors.secondaryFontColor }}>₹{totalProductPrice.toFixed(2)}</Text>
                            </View>
                            <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>CGST (9%) </Text>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹ { cgstValue.toFixed(2) }</Text>
                            </View>
                            <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>SGST (9%) </Text>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹ { sgstValue.toFixed(2) }</Text>
                            </View>
                            <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>Delivery Charge  </Text>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹{invoiceFullData?.shipping_charge}</Text>
                            </View>
                            <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>Service Charge </Text>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹{totalServiceCharge?.serviceChargeAmount}</Text>
                            </View>
                            <View style={{ ...styles.sample_view, marginTop: moderateScale(7) }}>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>GST (18%) </Text>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹ { gstValue.toFixed(2) }</Text>
                            </View>
                            <View style={{ ...styles.sample_view, marginTop: moderateScale(15) }}>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}>Additional Charge  </Text>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryFontColor }}> ₹{invoiceFullData?.additional_charge}</Text>
                            </View>
                            <View style={{ ...styles.totalbox_view, backgroundColor: colors.primaryFontColor }}>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryThemeColor }}>Total  </Text>
                                <Text style={{ ...styles.gst_percentage, color: colors.secondaryThemeColor }}> ₹{invoiceFullData?.total}</Text>
                            </View>
                            <View style={{ ...styles.note_view, borderColor: colors.borderColor }}>
                                <Text style={{
                                    ...styles.gst_percentage, color: colors.secondaryFontColor
                                }}>Note : <Text style={styles.note_txt}>{invoiceFullData?.note}</Text></Text>
                            </View>

                            <Text style={{ ...styles.shop_name, marginTop: moderateScale(10), color: colors.secondaryFontColor }}>Authorized Signature</Text>
                            <Image source={require('../../assets/images/Signature.png')} style={styles.Signature_img} />

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
                                onPress={() =>   NavigationService.navigate('BottomTab', { screen: 'Home' })}
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
