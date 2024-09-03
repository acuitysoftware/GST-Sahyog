//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, ScrollView } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppButton, AppTextInput, Icon, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import { useSelector } from 'react-redux';
import HomeService from '../../Services/HomeServises';
import NavigationService from '../../Services/Navigation';
import Toast from "react-native-simple-toast";
import Modal from "react-native-modal";
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

const { height, width } = Dimensions.get('screen')
// create a component
const AddProductFrom = () => {
    const colors = useTheme()
    const { userData } = useSelector(state => state.User);
    const route = useRoute();
    const getProductId = route.params.productId;
    const [buttonLoader, setButtonLoader] = useState(false);
    const [loading, setLoading] = useState(true);
    const [productName, setProductName] = useState('')
    const [productMrp, setProductMrp] = useState('')
    const [productDPrice, setProductDPrice] = useState('')
    const [productTValue, setProductTValue] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [AllHsnCode, setAllHsnCode] = useState([]);
    const [HsnID, setHsnID] = useState('');
    const [HsnCode, setHsnCode] = useState('');
    const [CGST, setCGST] = useState('');
    const [SGST, setSGST] = useState('');
    const [cess, setcess] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    console.log('pnameeeeeeeeeeeeeeeeeeeeee', productName);


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    useEffect(() => {
        getHSNProduct();
    }, []);

    const getHSNProduct = () => {
        let data = {
            userid: userData?.userid,
            hsn_code: HsnCode,
        };
        console.log('Fetching HSN Product data:', data);
        HomeService.addProductHNSCode(data)
            .then((res) => {
                console.log('HSN Product response:', res);
                if (res && res.error === false) {
                    setAllHsnCode(res.data);
                }
            })
            .catch((err) => {
                console.log('Error fetching HSN Product data:', err);
            });
    };

    // Function to handle selecting an item from the modal
    const handleSelectHsnCode = (item) => {
        setHsnID(item.hsn_id)
        setHsnCode(item.code);
        setCGST(item.cgst);
        setSGST(item.sgst);
        setcess(item.igst);
        setModalVisible(false);
    };
    useEffect(() => {
        if (HsnCode === '') {
            setCGST('');
            setSGST('');
            setcess('');
        }
    }, [HsnCode]);

    useEffect(() => {
        fatchProduct()
    }, [])

    const fatchProduct = (() => {
        let data = {
            "userid": userData?.userid,
            "product_id": getProductId
        }
        setLoading(true)
        HomeService.getSingleProduct(data)
            .then((res) => {
                // console.log('getttttttttttttttproductttttttttttttttttt7777777777777777rrrrrrrr', res);
                if (res && res.error == false) {
                    const productData = res?.data[0]
                    setProductName(productData?.name);
                    setProductMrp(productData?.mrp);
                    setProductDPrice(productData?.discount_price);
                    setProductTValue(productData?.taxable_value);
                    setProductPrice(productData?.product_price);
                    setHsnID(productData?.hsn_id);
                    setHsnCode(productData?.hsn_code);
                    setCGST(productData?.cgst);
                    setSGST(productData?.sgst);
                    setcess(productData?.igst);
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log('singleProductErrr', err);
                setLoading(false)
            })

    })


    const getUpdateProduct = (() => {
        let data = {
            "userid": userData?.userid,
            "name": productName,
            "mrp": productMrp,
            "discount_price": productDPrice,
            "taxable_value": productTValue,
            "hsn_code": HsnCode,
            "hsn_id": HsnID,
            "product_price": productPrice,
            "product_id": getProductId
        }
        setButtonLoader(true)
        HomeService.setUpdateProduct(data)
            .then((res) => {
                if (res && res.error === false) {
                    setButtonLoader(false)
                    Toast.show(res.message);
                    NavigationService.navigate('SelectProduct')

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
            <BackHeader title='Add Product' />
            {
                loading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color={colors.buttonColor} />
                    </View>
                )
                    :
                    (
                        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ backgroundColor: colors.secondaryThemeColor, paddingBottom: moderateScale(10) }}>
                                <Text style={{ ...styles.personal_txt, color: colors.secondaryFontColor }}>Product Details</Text>
                                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Name </Text>
                                <AppTextInput
                                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                    value={productName}
                                    onChangeText={(val) => setProductName(val)}
                                />
                                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>MRP</Text>
                                <AppTextInput
                                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                    keyboardType='phone-pad'
                                    value={productMrp}
                                    onChangeText={(val) => setProductMrp(val)}
                                />
                                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Discounted Price </Text>
                                <AppTextInput
                                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                    keyboardType='phone-pad'
                                    value={productDPrice}
                                    onChangeText={(val) => setProductDPrice(val)}
                                />
                                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Taxable value </Text>
                                <AppTextInput
                                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                    keyboardType='phone-pad'
                                    value={productTValue}
                                    onChangeText={(val) => setProductTValue(val)}
                                />
                                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>HSN Code </Text>

                                <View style={styles.hsn_view}>
                                    <AppTextInput
                                        inputContainerStyle={{ ...styles.HNSinputcontainer_sty }}
                                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                        keyboardType="phone-pad"
                                        maxLength={6}
                                        value={HsnCode}
                                        onChangeText={(val) => setHsnCode(val)}
                                    />
                                    <Pressable onPress={toggleModal} style={{ ...styles.hns_seacrch_view, backgroundColor: colors.buttonColor }}>
                                        <Icon name="search" type="Fontisto" color={colors.secondaryThemeColor} />
                                    </Pressable>
                                </View>
                                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>CGST </Text>
                                <AppTextInput
                                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                    keyboardType="phone-pad"
                                    placeholder="9%"
                                    value={CGST}
                                    onChangeText={(val) => setCGST(val)}
                                />
                                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>SGST </Text>
                                <AppTextInput
                                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                    keyboardType="phone-pad"
                                    placeholder="9%"
                                    value={SGST}
                                    onChangeText={(val) => setSGST(val)}
                                />
                                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>cess </Text>
                                <AppTextInput
                                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                    keyboardType="phone-pad"
                                    placeholder="4%"
                                    value={cess}
                                    onChangeText={(val) => setcess(val)}
                                />
                                <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Product Price </Text>
                                <AppTextInput
                                    inputContainerStyle={{ ...styles.inputcontainer_sty }}
                                    inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                                    keyboardType='phone-pad'
                                    value={productPrice}
                                    onChangeText={(val) => setProductPrice(val)}
                                />

                                <AppButton
                                    textStyle={{ ...styles.buttn_txt, color: colors.buttontxtColor }}
                                    style={styles.button_sty}
                                    title="Update Product"
                                    onPress={() => getUpdateProduct()}
                                    loader={buttonLoader ? { position: "right", color: "#fff", size: "small" } : null}
                                    disabled={buttonLoader}
                                />

                            </View>
                        </KeyboardAwareScrollView>
                    )}


            <Modal
                isVisible={isModalVisible}
                onBackButtonPress={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
                style={{
                    justifyContent: 'flex-end',
                    marginBottom: moderateScale(100)
                }}
            >
                <View style={styles.modalView}>
                    <ScrollView>
                        {AllHsnCode.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() => handleSelectHsnCode(item)}
                                style={{ ...styles.hsncode_view, borderColor: colors.borderColor }}
                            >
                                <Text style={{ ...styles.modal_title, color: colors.secondaryFontColor }} >
                                    {item.code}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>
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
    hsn_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: moderateScale(15),
    },
    HNSinputcontainer_sty: {
        borderWidth: 1,
        alignSelf: 'center',
        height: moderateScale(45),
        borderRadius: moderateScale(5),
        borderWidth: 1,
        paddingLeft: moderateScale(7),
        width: moderateScale(250)
    },
    hns_seacrch_view: {
        height: moderateScale(44),
        width: moderateScale(44),
        borderRadius: moderateScale(7),
        alignItems: 'center',
        justifyContent: 'center'
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
    modalView: {
        backgroundColor: "white",
        borderRadius: moderateScale(3),
        alignSelf: 'center',
        width: moderateScale(250),
        height: moderateScale(300),
        padding: moderateScale(5)
    },
    hsncode_view: {
        padding: moderateScale(8),
        backgroundColor: '#fff',
        marginBottom: moderateScale(7),
        borderWidth: moderateScale(0.5),
        borderRadius: moderateScale(4)
    },
    modal_title: {
        fontFamily: FONTS.Jost.regular,
        fontSize: moderateScale(17),
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default AddProductFrom;
