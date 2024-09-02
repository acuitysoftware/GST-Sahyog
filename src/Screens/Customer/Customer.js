import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { AppTextInput, Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import CastomerList from '../../Components/CastomerCard/CastomerList';
import CustomerHeader from '../../Components/Header/CustomerHeader';
import NavigationService from '../../Services/Navigation';
import { useSelector } from 'react-redux';
import HomeService from '../../Services/HomeServises';
import { useFocusEffect } from '@react-navigation/native';

const Customer = () => {
    const colors = useTheme();
    const { userData } = useSelector(state => state.User);
    const [allCustomer, setAllCustomer] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            allUserList();
        }, [])
    );

    const allUserList = () => {
        let data = {
            "userid": userData?.userid
        };
        console.log('Fetching customers:', data);
        setLoading(true);
        HomeService.setAllAccount(data)
            .then((res) => {
                console.log('Response:', JSON.stringify(res));
                if (res && res.error === false) {
                    setAllCustomer(res.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log('Error fetching customers:', err);
                setLoading(false);
            });
    };

    const delAccount = (itemId) => {
        let data = {
            "userid": userData?.userid,
            "customer_id": itemId
        };
        HomeService.deleteAccount(data)
            .then((res) => {
                if (res && res.error === false) {
                    // Remove deleted customer from the list
                    setAllCustomer(prevCustomers => prevCustomers.filter(customer => customer.id !== itemId));
                }
            })
            .catch((err) => {
                console.log('Error deleting customer:', err);
            });
    };

    return (
        <View style={styles.container}>
            <CustomerHeader title='Select Customer' />
            <View style={{ ...styles.search_view, backgroundColor: colors.secondaryThemeColor }}>
                <AppTextInput
                    placeholder="Search..."
                    rightAction={
                        <Icon
                            name='search1'
                            type='AntDesign'
                            color={colors.buttonColor}
                        />
                    }
                    mainContainerStyle={{
                        width: moderateScale(250),
                    }}
                    inputContainerStyle={{
                        height: moderateScale(44),
                        paddingLeft: moderateScale(10)
                    }}
                />
                <TouchableOpacity onPress={() => NavigationService.navigate('AddCustomerFrom')} style={{ ...styles.add_button, backgroundColor: colors.buttonColor }}>
                    <Icon name='plus' type='AntDesign' color={colors.secondaryThemeColor} />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.buttonColor} />
                </View>
            ) : allCustomer.length === 0 ? (
                <View style={styles.loader}>
                    <Image source={require('../../assets/images/empty.png')} style={styles.nodata_sty} />
                </View>
            ) : (
                <View style={{ marginBottom: moderateScale(160) }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={allCustomer}
                        renderItem={({ item, index }) => (
                            <CastomerList item={item} index={index} delAccount={delAccount} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(15),
        padding: moderateScale(10)
    },
    add_button: {
        height: moderateScale(40),
        width: moderateScale(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(25)
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

export default Customer;
