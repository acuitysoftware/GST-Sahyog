//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import InvoiceList from '../../Components/InvoiceCard/InvoiceList';
import { moderateScale } from '../../Constants/PixelRatio';
import { useSelector } from 'react-redux';
import HomeService from '../../Services/HomeServises';
import { useTheme } from 'react-native-basic-elements';

// create a component
const Invoice = () => {
    const colors = useTheme()
    const { userData } = useSelector(state => state.User);
    const [invoiceData, setInvoiceData] = useState({})
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getInvoiceList()
    }, [])

    const getInvoiceList = (() => {
        let data = {
            "userid": userData?.userid
        }
        setLoading(true)
        HomeService.FetchInvoiceList(data)
            .then((res) => {
                // console.log('invoiceeeeeeeeeeeeeeeeeeeelist555555555555555', JSON.stringify(res));
                if (res && res.error == false) {
                    setInvoiceData(res.data)
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log('invoicelisterr', err);
                setLoading(false)
            })
    })
    return (
        <View style={styles.container}>
            <BackHeader title='Invoice List' />
           
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.buttonColor} />
                </View>
            ) : invoiceData.length === 0 ? (
                <View style={styles.loader}>
                    <Image source={require('../../assets/images/empty.png')} style={styles.nodata_sty} />
                </View>
            ) : (
                <View style={{ marginBottom: moderateScale(90) }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={invoiceData}
                        renderItem={({ item, index }) => (
                            <InvoiceList item={item} index={index} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
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
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nodata_sty: {
        height: moderateScale(150),
        width: moderateScale(150),
        resizeMode: 'contain',
    },
});

//make this component available to the app
export default Invoice;
