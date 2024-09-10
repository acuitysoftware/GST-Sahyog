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
import { TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get('screen')
// create a component
const AddProductFrom = () => {
    const colors = useTheme();
    const { userData } = useSelector(state => state.User);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [productName, setProductName] = useState('');
    const [productMrp, setProductMrp] = useState('');
    const [productDPrice, setProductDPrice] = useState('');
    const [productTValue, setProductTValue] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [AllHsnCode, setAllHsnCode] = useState([]);
    const [HsnID, setHsnID] = useState('');
    const [HsnCode, setHsnCode] = useState('');
    const [CGST, setCGST] = useState('');
    const [SGST, setSGST] = useState('');
    const [IGST, setIGST] = useState('');
    const [cess, setcess] = useState('');
    const [filteredHsnCode, setFilteredHsnCode] = useState([]);
    const [isHSNListVisible, setHSNListVisible] = useState(false);

    console.log('filllllllllllllllllllllllllllll', filteredHsnCode);

    useEffect(() => {
        getHSNProduct();
    }, [HsnCode]);

    const getHSNProduct = () => {
        let data = {
            userid: userData?.userid,
            hsn_code: HsnCode,
        };
        HomeService.addProductHNSCode(data)
            .then((res) => {
                console.log('hsnnnnnnnnnnnnnnnnnnnnnnnnn', res);

                if (res && res.error === false) {
                    setAllHsnCode(res.data);
                    setFilteredHsnCode(res.data);
                }
            })
            .catch((err) => {
                console.log('Error fetching HSN Product data:', err);
            });
    };

    const handleSelectHsnCode = (item) => {
        setHsnID(item.hsn_id);
        setHsnCode(item.code);
        setCGST(item.cgst);
        setSGST(item.sgst);
        setcess(item.cess);
        setIGST(item.igst)
        setHSNListVisible(false);
    };

    useEffect(() => {
        if (HsnCode === '') {
            setCGST('');
            setSGST('');
            setIGST('')
            setcess('');
            setHSNListVisible(false); // Hide the list if HSN code is cleared
        }
    }, [HsnCode]);

    const handleHsnCodeChange = (val) => {
        setHsnCode(val);
        if (val.length > 0 && Array.isArray(AllHsnCode)) {
            const filteredData = AllHsnCode.filter((item) =>
                item.code.toLowerCase().startsWith(val.toLowerCase())
            );
            setFilteredHsnCode(filteredData);
            setHSNListVisible(filteredData.length > 0); // Show the list only if there are filtered items
        } else {
            setFilteredHsnCode([]);
            setHSNListVisible(false); // Hide the list if no matching items
        }
    };

    const toggleHSNList = () => {
        setHSNListVisible(!isHSNListVisible);
    };

    const getAddProduct = () => {
        let data = {
            "userid": userData?.userid,
            "name": productName,
            "mrp": productMrp,
            "discount_price": productDPrice,
            "taxable_value": productTValue,
            "hsn_code": HsnCode || " ",
            "hsn_id": HsnID || " ",
            "product_price": productPrice,
            "cgst": CGST || " ",
            "sgst": SGST || " ",
            "igst": IGST || " ",
            "ses": cess || " "
        };
        console.log('producttttttttttttttttttttttttdata', data);
        
        setButtonLoader(true);
        HomeService.addProduct(data)
            .then((res) => {
                console.log('producttttttttttttttresssssssssssss',res);
                
                if (res && res.error === false) {
                    setButtonLoader(false);
                    Toast.show(res.message);
                    NavigationService.navigate('SelectProduct');
                } else {
                    setButtonLoader(false);
                    Toast.show(res.message);
                }
            })
            .catch((err) => {
                setButtonLoader(false);
                console.log('Error adding product:', err);
            });
    };

    return (
        <View style={styles.container}>
            <BackHeader title='Add Product' />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: colors.secondaryThemeColor, paddingBottom: moderateScale(10) }}>
                    <Text style={{ ...styles.personal_txt, color: colors.secondaryFontColor }}>Product Details</Text>
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Name </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        value={productName}
                        onChangeText={setProductName}
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>MRP</Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType='phone-pad'
                        value={productMrp}
                        onChangeText={setProductMrp}
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Discounted Price </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType='phone-pad'
                        value={productDPrice}
                        onChangeText={setProductDPrice}
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Taxable value </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType='phone-pad'
                        value={productTValue}
                        onChangeText={setProductTValue}
                    />

                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>HSN Code </Text>

                    <View style={styles.hsn_view}>
                        <AppTextInput
                            inputContainerStyle={{ ...styles.HNSinputcontainer_sty }}
                            inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                            keyboardType="phone-pad"
                            maxLength={6}
                            value={HsnCode}
                            onChangeText={handleHsnCodeChange}
                        />
                        <Pressable onPress={toggleHSNList} style={{ ...styles.hns_seacrch_view, backgroundColor: colors.buttonColor }}>
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
                        onChangeText={setCGST}
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>SGST </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType="phone-pad"
                        placeholder="9%"
                        value={SGST}
                        onChangeText={setSGST}
                    />

                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>IGST </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType="phone-pad"
                        placeholder="9%"
                        value={IGST}
                        onChangeText={setIGST}
                    />

                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>cess </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType="phone-pad"
                        placeholder="4%"
                        value={cess}
                        onChangeText={setcess}
                    />
                    <Text style={{ ...styles.input_title, color: colors.secondaryFontColor }}>Product Price </Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        keyboardType='phone-pad'
                        value={productPrice}
                        onChangeText={setProductPrice}
                    />

                    <AppButton
                        textStyle={{ ...styles.buttn_txt, color: colors.buttontxtColor }}
                        style={styles.button_sty}
                        title="Add Product"
                        onPress={getAddProduct}
                        loader={buttonLoader ? { position: "right", color: "#fff", size: "small" } : null}
                        disabled={buttonLoader}
                    />
                </View>
            </KeyboardAwareScrollView>
            {isHSNListVisible && (
                <View style={{ ...styles.hsn_list_view }}>
                    <ScrollView>
                        {filteredHsnCode?.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleSelectHsnCode(item)}
                                style={{ ...styles.hsncode_view }}>
                                <Text style={{ color: colors.secondaryFontColor }}>{item.code}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
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
    hsncode_view: {
        padding: moderateScale(10),
        backgroundColor: '#fff',
        marginBottom: moderateScale(7),
        borderWidth: moderateScale(0.5),
        borderRadius: moderateScale(4),
        marginTop: moderateScale(7),
        marginHorizontal: moderateScale(7)
    },
    hsn_list_view: {
        height: moderateScale(300),
        width: width - moderateScale(30),
        backgroundColor: '#fff',
        borderRadius: moderateScale(10),
        elevation: moderateScale(2),
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 999,
        top: moderateScale(350),
        justifyContent: 'center',
    }
});

//make this component available to the app
export default AddProductFrom;
