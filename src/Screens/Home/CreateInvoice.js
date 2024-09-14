//import liraries
import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { AppButton, AppTextInput, Icon, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import Modal from "react-native-modal";
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetInvoiceNo, setInvoiceNo } from '../../Redux/reducer/Invoice';
import HomeService from '../../Services/HomeServises';
import Toast from "react-native-simple-toast";

const { height, width } = Dimensions.get('screen')
// create a component
const CreateInvoice = () => {
    const colors = useTheme()
    const route = useRoute();
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.User)
    const invoiceNo = useSelector(state => state.Invoice.invoiceNo);
    const customer_Data = route.params?.customerData || {};
    const product_Data = route.params?.productData || {};
    const [invoiceId, setInvoiceID] = useState('');
    const [userProfile, setUserProfile] = useState({});
    const [ShippingChargeModal, setShippingChargeModal] = useState(false);
    const [ServiceChargeModal, setServiceChargeModal] = useState(false);
    const [AdditionalChargeModal, setAdditionalChargeModal] = useState(false);
    const [AddNoteModal, setAddNoteModal] = useState(false);
    const [customer, setCustomer] = useState({});
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalSCAmount, setTotalSCAmount] = useState(0);

    const [shippingAddress, setShippingAddress] = useState(null);
    const [shippingCharge, setShippingCharge] = useState(null);
    const [serviceCharge, setServiceCharge] = useState(null);
    const [serviceChargeandGst, setServiceChargeandGst] = useState(null);
    const [gst, setGst] = useState('');
    const [additionalCharge, setAdditionalCharge] = useState(null);
    const [note, setNote] = useState('');
    const [btnLoader, setBtnLoader] = useState(false);

    console.log('ccccvvvvvvvcustomercustomercustomercustomer', customer);
    console.log('product_Dataproduct_Dataproduct_Data', product_Data);





    const handleAddCustomer = () => {
        if (!invoiceNo.trim()) {
            Alert.alert('Alert', 'Please enter the Invoice first.');
        } else {
            // Code to add customer goes here
            NavigationService.navigate('BottomTab', { screen: 'Customer' })
        }
    };

    const handleAddProduct = () => {
        if (!customer || Object.keys(customer).length === 0) {
            Alert.alert('Alert', 'Please add a customer first.');
        } else {
            NavigationService.navigate('SelectProduct');
        }
    };


    useEffect(() => {
        getUserProfile()
    }, []);

    const getUserProfile = (() => {
        let data = {
            "userid": userData.userid
        }
        HomeService.setUserProfile(data)
            .then((res) => {
                if (res && res.error == false) {
                    setUserProfile(res?.data)
                }
            })
            .catch((err) => {
                console.log('fatchprofileerrrrrrr', err);
            })
    })

    const handleChangeText = (text) => {
        dispatch(setInvoiceNo(text.toUpperCase()));
    };

    useEffect(() => {
        if (route.params?.customerData) {
            setCustomer(route.params.customerData);
        }
    }, [route.params]);

    useEffect(() => {
        if (route.params?.updatedAddress) {
            setShippingAddress(route.params.updatedAddress);
        }
    }, [route.params]);





    useFocusEffect(
        useCallback(() => {
            if (Object.keys(product_Data).length !== 0) {
                const existingProduct = selectedProducts.find(product => product.id === product_Data.id);
                if (existingProduct) {
                    const updatedProducts = selectedProducts.map(product =>
                        product.id === product_Data.id ? { ...product, ...product_Data } : product
                    );
                    setSelectedProducts(updatedProducts);
                } else {
                    // Add new product and update total amount
                    const newProduct = { ...product_Data, quantity: 1 };
                    const newTotal = calculateTotalWithTax(newProduct, 1);

                    setSelectedProducts([...selectedProducts, newProduct]);

                    setTotalPrice(prevTotal => {
                        const updatedTotal = prevTotal + newTotal;
                        return parseFloat(updatedTotal.toFixed(2)); // Round to 2 decimal places
                    });
                }
            }
        }, [product_Data])
    );


    console.log('Total amount has been updated:', totalAmount);
    console.log('Total price has been updated:', totalPrice);

    const calculateTotalWithTax = (product, quantity) => {
        let total = parseFloat(product.product_price) * quantity;

        console.log(`Product price: ${product.product_price}, Quantity: ${quantity}`);
        console.log('Total before tax:', total);

        if (customer.state !== userProfile.state) {
            // CGST, SGST, and CESS calculation
            const cgst = (total * parseFloat(product.cgst)) / 100;
            const sgst = (total * parseFloat(product.sgst)) / 100;
            const cess = (total * parseFloat(product.sgst)) / 100;
            total += cgst + sgst + cess;
            console.log(`Applied CGST: ${cgst}, SGST: ${sgst}, CESS: ${cess}`);
        } else {
            // IGST and CESS calculation
            const igst = (total * parseFloat(product.igst)) / 100;
            const cess = (total * parseFloat(product.sgst)) / 100;
            total += igst + cess;
            console.log(`Applied IGST: ${igst}, CESS: ${cess}`);
        }

        console.log('Total after tax:', total); // Log the final total after tax
        return total;
    };

    // Increment handler
    const handleIncrement = (id) => {
        const updatedProducts = selectedProducts.map(product => {
            if (product.id === id) {
                const updatedQuantity = product.quantity + 1;
                const prevTotal = calculateTotalWithTax(product, product.quantity);
                const newTotal = calculateTotalWithTax(product, updatedQuantity);

                console.log(`Previous total for product ${id}: ${prevTotal}`);
                console.log(`New total for product ${id}: ${newTotal}`);

                setTotalPrice(prevAmount => prevAmount - prevTotal + newTotal); // Adjust total amount
                return { ...product, quantity: updatedQuantity };
            }
            return product;
        });
        setSelectedProducts(updatedProducts);
    };

    // Decrement handler
    const handleDecrement = (id) => {
        const updatedProducts = selectedProducts.map(product => {
            if (product.id === id) {
                const updatedQuantity = product.quantity - 1;
                const prevTotal = calculateTotalWithTax(product, product.quantity);

                if (updatedQuantity === 0) {
                    setTotalPrice(prevAmount => prevAmount - prevTotal); // Deduct previous total
                    console.log(`Removing product ${id}, previous total deducted: ${prevTotal}`);
                    return null;
                } else {
                    const newTotal = calculateTotalWithTax(product, updatedQuantity);
                    console.log(`Previous total for product ${id}: ${prevTotal}`);
                    console.log(`New total for product ${id}: ${newTotal}`);

                    setTotalPrice(prevAmount => prevAmount - prevTotal + newTotal); // Adjust total amount
                    return { ...product, quantity: updatedQuantity };
                }
            }
            return product;
        }).filter(product => product !== null); // Filter out the null values (removed products)

        setSelectedProducts(updatedProducts);

        // Reset totalAmount if no products are left
        if (updatedProducts.length === 0) {
            setTotalPrice(0); // Reset to 0 if there are no products
            console.log('All products removed, total amount reset to 0');
        }
    };

    // Handlers to toggle modal visibility
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


    useEffect(() => {
        // Calculate total whenever serviceCharge or gst changes
        const serviceChargeAmount = serviceCharge !== null ? serviceCharge : 0;
        const gstPercentage = parseFloat(gst) || 0;
        const gstAmount = (serviceChargeAmount * gstPercentage) / 100;
        const total = serviceChargeAmount + gstAmount;

        setServiceChargeandGst({
            serviceChargeAmount,
            gstPercentage,
            gstAmount,
            total,
        });

        setTotalSCAmount(total); // Update total amount state
    }, [serviceCharge, gst]);

    useEffect(() => {
        const totalCharges = (parseFloat(shippingCharge) || 0) + (parseFloat(totalSCAmount) || 0) + (parseFloat(additionalCharge) || 0);
        // Set total amount
        setTotalAmount(totalCharges);
    }, [selectedProducts, shippingCharge, totalSCAmount, additionalCharge, gst]);

    const TotalAmountPrice = totalAmount + totalPrice;

    const isFormComplete = () => {
        return (
            totalAmount > 0 && // Ensure totalAmount is a valid number greater than 0
            shippingAddress && Object.keys(shippingAddress).length > 0 && // Ensure shippingAddress has data
            shippingCharge !== null && shippingCharge > 0 && // Ensure shippingCharge is valid
            serviceCharge !== null && serviceCharge > 0 && // Ensure serviceCharge is valid
            additionalCharge !== null && additionalCharge > 0 // Ensure additionalCharge is valid
        );
    };


    const handleInvoiceSubmit = (() => {
        let data = {
            "userid": userData?.userid,
            "invoice_number": invoiceNo,
            "customer": customer,
            "product": selectedProducts,
            "shipping_address": shippingAddress,
            "shipping_charge": shippingCharge,
            "service_charge": serviceChargeandGst,
            "additional_charge": additionalCharge,
            "note": note,
            "total": TotalAmountPrice
        }
        console.log('createinvioicedataaaaaaaaaaaaaaaaaaaaaaaaa', JSON.stringify(data, null, 2));
        dispatch(resetInvoiceNo());
        setBtnLoader(true)
        HomeService.createInvoice(data)
            .then((res) => {
                console.log('createeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', JSON.stringify(res));
                if (res && res.error == false) {
                    setBtnLoader(true)
                    Toast.show('Invoice Create successfully')
                    console.log('pdffffff=====================================================================',res?.data?.id);

                    setInvoiceID(res?.data?.id)
                    if (res) {
                        console.log('inco0u988887777777777777777777777777777777777777777777777777777',JSON.stringify(res));
                        let data = {
                            "userid": userData?.userid,
                            "invoice_id": res?.data?.id
                        }
                        console.log('pdfffffffffffffffffffffff==========================================================================',data);
                        HomeService.genaratePDF(data)
                            .then((res) => {
                                if (res) {
                                    console.log('jaehKHKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKgennnnnnnnnnnnnnnnnKKKKKKKkk', JSON.stringify(res));
                                    NavigationService.navigate('InvoicePdfScreen', { invoiceIDdata:invoiceId })
                                }
                            })
           
                    } else {

                    }
                } else {
                    setBtnLoader(false)
                    Toast.show(res.message);
                }

            })
            .catch((err) => {
                console.log('createinvoErr', err);
                setBtnLoader(false)
            })
    })




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
                        onChangeText={handleChangeText}
                        keyboardType='name-phone-pad'

                    />
                </View>
                <View>
                    {Object.keys(customer).length === 0 ? (
                        <TouchableOpacity
                            onPress={() => handleAddCustomer()}
                            // onPress={() => NavigationService.navigate('BottomTab', { screen: 'Customer' })}
                            style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                            <Image source={require('../../assets/images/customer.png')}
                                style={{ ...styles.addcustomer_img, tintColor: colors.buttonColor }} />
                            <Text style={{ ...styles.addcustomer_txt, color: colors.buttonColor }}>Add Customer</Text>
                        </TouchableOpacity>
                    ) :
                        null
                    }
                </View>

                {
                    Object.keys(customer).length === 0 ? null :
                        (
                            <TouchableOpacity

                                onPress={() => NavigationService.navigate('EditCustomerFrom', { customerId: customer.id })}
                                style={{ ...styles.customer_view, backgroundColor: colors.secondaryThemeColor }}>
                                <View>
                                    <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>{customer.name}</Text>
                                    <Text style={{ ...styles.webskill_number, color: colors.tintText }}>{customer.phone_number}</Text>
                                </View>
                                <Icon name='pen' type='FontAwesome5' color={colors.buttonColor} />
                            </TouchableOpacity>
                        )
                }


                <View>
                    {Object.keys(selectedProducts).length === 0 ? (
                        <TouchableOpacity
                            onPress={() => handleAddProduct()}
                            // onPress={() => NavigationService.navigate('SelectProduct')}
                            style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor }}>
                            <Image
                                source={require('../../assets/images/box.png')}
                                style={{ ...styles.addcustomer_img, tintColor: colors.buttonColor }}
                            />
                            <Text style={{ ...styles.addcustomer_txt, color: colors.buttonColor }}>
                                Add Product
                            </Text>
                        </TouchableOpacity>
                    ) :
                        null
                    }
                </View>


                {selectedProducts.map(product => (
                    <View key={product.id} style={{ ...styles.addpeoduct_view, backgroundColor: colors.secondaryThemeColor }}>
                        <View style={{ ...styles.addpeoductprimary_view }}>
                            <View>
                                <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>{product.name}</Text>
                                <Text style={{ ...styles.webskill_number, marginTop: moderateScale(7), fontFamily: FONTS.OpenSans.medium, color: colors.buttonColor }}>₹{product.product_price}</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.number_up_down_view}>
                                    <Pressable onPress={() => handleDecrement(product.id)}>
                                        <Icon name='minus-square' type='Feather' color={colors.buttonColor} />
                                    </Pressable>
                                    <Text style={{ ...styles.number_up_down_txt, color: colors.secondaryFontColor }}>{product.quantity.toString().padStart(2, '0')}</Text>
                                    <Pressable onPress={() => handleIncrement(product.id)}>
                                        <Icon name='plus-square' type='Feather' color={colors.buttonColor} />
                                    </Pressable>
                                </View>
                                <TouchableOpacity onPress={() => NavigationService.navigate('EditProductFrom', { productId: product.id })}>
                                    <Text style={{ ...styles.webskill_number, marginTop: moderateScale(7), color: colors.buttonColor }}>Edit</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={styles.addproductBottom_view}>
                            {
                                customer.state !== userProfile.state ? (
                                    <View style={{ ...styles.addproductBottom_view, width: 230, marginTop: 0 }}>
                                        <Text style={{ ...styles.cgst_txt, color: colors.secondaryFontColor }}>
                                            CGST: <Text style={styles.cgst_number}>{product.cgst}%</Text>
                                        </Text>
                                        <Text style={{ ...styles.cgst_txt, color: colors.secondaryFontColor }}>
                                            SGST: <Text style={styles.cgst_number}>{product.sgst}%</Text>
                                        </Text>
                                        <Text style={{ ...styles.cgst_txt, color: colors.secondaryFontColor }}>
                                            CESS: <Text style={styles.cgst_number}>{product.sgst}%</Text>
                                        </Text>
                                    </View>
                                ) : (
                                    <>
                                        <Text style={{ ...styles.cgst_txt, color: colors.secondaryFontColor }}>
                                            IGST: <Text style={styles.cgst_number}>{product.cgst}%</Text>
                                        </Text>
                                        <Text style={{ ...styles.cgst_txt, color: colors.secondaryFontColor }}>
                                            CESS: <Text style={styles.cgst_number}>{product.sgst}%</Text>
                                        </Text>
                                    </>
                                )
                            }


                        </View>
                    </View>
                ))}

                {selectedProducts.length > 0 && (
                    <TouchableOpacity
                        onPress={() => NavigationService.navigate('SelectProduct')}
                        style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor }}>
                        <Image
                            source={require('../../assets/images/box.png')}
                            style={{ ...styles.addcustomer_img, tintColor: colors.buttonColor }}
                        />
                        <Text style={{ ...styles.addcustomer_txt, color: colors.buttonColor }}>
                            Add More Product
                        </Text>
                    </TouchableOpacity>
                )}

                {
                    shippingAddress === null ? (
                        <TouchableOpacity
                            onPress={() => NavigationService.navigate('ShippingAddressFrom', { existingAddress: shippingAddress })}
                            style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor }}>
                            <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>Shipping Address</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => NavigationService.navigate('ShippingAddressFrom', { existingAddress: shippingAddress })}
                            style={{ ...styles.customer_view, backgroundColor: colors.secondaryThemeColor }}>
                            <View>
                                <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>Shipping Address</Text>
                                <Text style={{
                                    ...styles.webskill_number,
                                    width: moderateScale(280),
                                    color: colors.tintText
                                }}>
                                    {`${shippingAddress.address1}, ${shippingAddress.address2}, ${shippingAddress.city}, ${shippingAddress.stateName}, ${shippingAddress.pincode}`}
                                </Text>
                            </View>
                            <Icon name='pen' type='FontAwesome5' color={colors.buttonColor} />
                        </TouchableOpacity>
                    )
                }

                {
                    (shippingCharge === null) ? (
                        <TouchableOpacity
                            onPress={handleShipingCharge}
                            style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor }}>
                            <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>
                                Shipping Charge
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        shippingCharge > 0 && (
                            <TouchableOpacity
                                onPress={handleShipingCharge}
                                style={{ ...styles.customer_view, backgroundColor: colors.secondaryThemeColor }}>
                                <View>
                                    <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>
                                        Shipping Charge
                                    </Text>
                                    <Text style={{ ...styles.webskill_number, color: colors.tintText }}>
                                        ₹{(typeof shippingCharge === 'number' ? shippingCharge.toFixed(2) : '0.00')}
                                    </Text>
                                </View>
                                <Icon name='pen' type='FontAwesome5' color={colors.buttonColor} />
                            </TouchableOpacity>
                        )
                    )
                }

                {
                    (serviceCharge === null) ? (
                        <TouchableOpacity onPress={handleServiceCharge} style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                            <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>Service Charge</Text>
                        </TouchableOpacity>
                    ) : (
                        serviceCharge > 0 && (
                            <TouchableOpacity onPress={handleServiceCharge}
                                style={{ ...styles.customer_view, backgroundColor: colors.secondaryThemeColor }}>
                                <View>
                                    <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>Service Charge</Text>
                                    <Text style={{ ...styles.webskill_number, color: colors.tintText }}>
                                        ₹{(typeof totalSCAmount === 'number' ? totalSCAmount.toFixed(2) : '0.00')}
                                        {/* ₹{totalSCAmount.toFixed(2)} */}
                                    </Text>
                                </View>
                                <Icon name='pen' type='FontAwesome5' color={colors.buttonColor} />
                            </TouchableOpacity>
                        )
                    )
                }

                {
                    (additionalCharge === null) ? (
                        <TouchableOpacity onPress={handleAddtionalCharge} style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor, }}>
                            <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>Additional Charge </Text>
                        </TouchableOpacity>
                    ) : (
                        additionalCharge > 0 && (
                            <TouchableOpacity onPress={handleAddtionalCharge}
                                style={{ ...styles.customer_view, backgroundColor: colors.secondaryThemeColor }}>
                                <View>
                                    <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>Additional Charge</Text>
                                    <Text style={{ ...styles.webskill_number, color: colors.tintText }}>
                                        ₹{(typeof additionalCharge === 'number' ? additionalCharge.toFixed(2) : '0.00')}
                                    </Text>
                                </View>
                                <Icon name='pen' type='FontAwesome5' color={colors.buttonColor} />
                            </TouchableOpacity>
                        )
                    )
                }

                {
                    (note === '') ? (
                        <TouchableOpacity onPress={handleAddNote} style={{ ...styles.addcustomer, backgroundColor: colors.secondaryThemeColor }}>
                            <Text style={{ ...styles.sipping_address_txt, color: colors.secondaryFontColor }}>Add Note</Text>
                        </TouchableOpacity>
                    ) : (
                        note.length > 0 && (
                            <TouchableOpacity onPress={handleAddNote}
                                style={{ ...styles.customer_view, backgroundColor: colors.secondaryThemeColor }}>
                                <View>
                                    <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>Additional Charge</Text>
                                    <Text numberOfLines={2} style={{ ...styles.webskill_number, maxWidth: '90%', color: colors.tintText }}>
                                        {note}
                                    </Text>
                                </View>
                                <Icon name='pen' type='FontAwesome5' color={colors.buttonColor} />
                            </TouchableOpacity>
                        )
                    )
                }

            </ScrollView>

            <View style={{ ...styles.customer_view, backgroundColor: colors.secondaryThemeColor }}>

                <Text style={{ ...styles.total_txt, color: colors.secondaryFontColor }}>
                    Total  <Text>₹ {totalAmount > 0 ? TotalAmountPrice.toFixed(2) : totalPrice.toFixed(2)} </Text>
                </Text>

                <Pressable
                    onPress={() => handleInvoiceSubmit()}
                    style={{
                        ...styles.genarate_btn,
                        backgroundColor: isFormComplete() ? colors.buttonColor : 'gray', // Change color based on form completion
                    }}
                    disabled={!isFormComplete()} // Disable if form is incomplete
                >
                    {
                        btnLoader ?
                            <ActivityIndicator size={'small'} color={'#fff'} />
                            :
                            <Text style={{
                                ...styles.genarate_btn_txt,
                                color: isFormComplete() ? colors.secondaryThemeColor : '#ccc' // Text color for disabled state
                            }}>
                                Generate
                            </Text>
                    }
                </Pressable>


            </View>

            <Modal
                isVisible={ShippingChargeModal}
                style={{ justifyContent: 'flex-end', marginHorizontal: 0, marginBottom: 0 }}
                onBackButtonPress={() => setShippingChargeModal(false)}
                onBackdropPress={() => setShippingChargeModal(false)}
            >
                <View style={styles.modalView}>
                    <Text style={{ ...styles.modal_title, color: colors.secondaryFontColor }}>Shipping Charge</Text>
                    <AppTextInput
                        inputContainerStyle={styles.Modal_inputcontainer_sty}
                        inputStyle={{ ...styles.Modal_text_input, color: colors.secondaryFontColor }}
                        value={shippingCharge !== null ? shippingCharge.toString() : ''}
                        onChangeText={(text) => {
                            const parsedValue = parseFloat(text.trim());
                            if (!isNaN(parsedValue)) {
                                setShippingCharge(parsedValue);
                            } else {
                                setShippingCharge('');
                            }
                        }}

                        keyboardType='numeric'
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
                        onPress={() => setShippingChargeModal(false)}
                    />
                </View>
            </Modal>

            <Modal
                isVisible={ServiceChargeModal}
                style={{ justifyContent: 'flex-end', marginHorizontal: 0, marginBottom: 0 }}
                onBackButtonPress={() => setServiceChargeModal(false)}
                onBackdropPress={() => setServiceChargeModal(false)}
            >
                <View style={styles.servimemodalView}>
                    <Text style={{ ...styles.modal_title, color: colors.secondaryFontColor }}>Service Charge</Text>
                    <AppTextInput
                        inputContainerStyle={styles.Modal_inputcontainer_sty}
                        inputStyle={{ ...styles.Modal_text_input, color: colors.secondaryFontColor }}

                        value={serviceCharge !== null ? serviceCharge.toString() : ''}
                        onChangeText={(text) => {
                            const parsedValue = parseFloat(text.trim());
                            if (!isNaN(parsedValue)) {
                                setServiceCharge(parsedValue);
                            } else {
                                setServiceCharge('');
                            }
                        }}
                        keyboardType='numeric'
                        rightAction={<Icon
                            name='rupee'
                            type='FontAwesome'
                            size={16}
                            color={colors.primaryFontColor}
                        />}
                    />
                    <Text style={{ ...styles.input_title, marginHorizontal: 0, color: colors.secondaryFontColor }}>GST (%) optional</Text>
                    <AppTextInput
                        inputContainerStyle={{ ...styles.inputcontainer_sty, marginHorizontal: 0 }}
                        inputStyle={{ ...styles.text_input, color: colors.secondaryFontColor }}
                        placeholder='%'
                        keyboardType='numeric'
                        value={gst}
                        onChangeText={(text) => {
                            const parsedValue = parseFloat(text.trim());
                            if (!isNaN(parsedValue)) {
                                setGst(parsedValue.toString());
                            } else {
                                setGst(''); // Clear or set default if invalid
                            }
                        }}
                    />
                    <AppButton
                        textStyle={{ ...styles.Modal_buttn_txt, color: colors.buttontxtColor }}
                        style={styles.Modal_button_sty}
                        title="Save"
                        onPress={() => setServiceChargeModal(false)}
                    />
                </View>
            </Modal>

            <Modal
                isVisible={AdditionalChargeModal}
                style={{ justifyContent: 'flex-end', marginHorizontal: 0, marginBottom: 0 }}
                onBackButtonPress={() => setAdditionalChargeModal(false)}
                onBackdropPress={() => setAdditionalChargeModal(false)}
            >
                <View style={styles.modalView}>
                    <Text style={{ ...styles.modal_title, color: colors.secondaryFontColor }}>Additional Charge</Text>
                    <AppTextInput
                        inputContainerStyle={styles.Modal_inputcontainer_sty}
                        inputStyle={{ ...styles.Modal_text_input, color: colors.secondaryFontColor }}
                        value={additionalCharge !== null ? additionalCharge.toString() : ''}
                        onChangeText={(text) => {
                            const parsedValue = parseFloat(text.trim());
                            if (!isNaN(parsedValue)) {
                                setAdditionalCharge(parsedValue);
                            } else {
                                setAdditionalCharge('');
                            }
                        }}
                        keyboardType='numeric'
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
                        onPress={() => setAdditionalChargeModal(false)}
                    />
                </View>
            </Modal>

            <Modal
                isVisible={AddNoteModal}
                style={{ justifyContent: 'flex-end', marginHorizontal: 0, marginBottom: 0 }}
                onBackButtonPress={() => setAddNoteModal(false)}
                onBackdropPress={() => setAddNoteModal(false)}
            >
                <View style={styles.modalView}>
                    <Text style={{ ...styles.modal_title, color: colors.secondaryFontColor }}>Add Note</Text>
                    <AppTextInput
                        inputContainerStyle={styles.Modal_inputcontainer_sty}
                        inputStyle={{ ...styles.Modal_text_input, color: colors.secondaryFontColor }}
                        value={note}
                        onChangeText={(text) => setNote(text)}
                    />
                    <AppButton
                        textStyle={{ ...styles.Modal_buttn_txt, color: colors.buttontxtColor }}
                        style={styles.Modal_button_sty}
                        title="Save"
                        onPress={() => setAddNoteModal(false)}
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
        marginTop: moderateScale(15)
    },
    genarate_btn: {
        height: moderateScale(40),
        width: moderateScale(85),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(10)
    },
    genarate_btn_txt: {
        fontFamily: FONTS.OpenSans.semibold,
        fontSize: moderateScale(13)
    },
    total_txt: {
        fontFamily: FONTS.OpenSans.semibold,
        fontSize: moderateScale(14)
    }
});

//make this component available to the app
export default CreateInvoice;
