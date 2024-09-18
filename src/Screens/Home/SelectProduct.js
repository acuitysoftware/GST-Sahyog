// Import libraries
import React, { Component, useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { AppTextInput, Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import BackHeader from '../../Components/Header/BackHeader';
import SelectProductList from '../../Components/HomeCard/SelectProductList';
import NavigationService from '../../Services/Navigation';
import { useSelector } from 'react-redux';
import HomeService from '../../Services/HomeServises';
import { useFocusEffect } from '@react-navigation/native';

const SelectProduct = () => {
    const colors = useTheme();
    const { userData } = useSelector(state => state.User);
    const [allProduct, setAllProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useFocusEffect(
        useCallback(() => {
            allProductList();
        }, [])
    );

    const allProductList = () => {
        let data = {
            "userid": userData?.userid
        };
        console.log('Fetching customers:', data);
        setLoading(true);
        HomeService.setAllProduct(data)
            .then((res) => {
                console.log('Response:33333333333333333333333product', JSON.stringify(res));
                if (res && res.error === false) {
                    setAllProduct(res.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log('Error fetching customers:', err);
                setLoading(false);
            });
    };

    const delProduct = (itemId) => {
        let data = {
            "userid": userData?.userid,
            "product_id": itemId
        };      
        HomeService.deleteProduct(data)
            .then((res) => {
                if (res && res.error === false) {
                    // Remove deleted product from the list
                    setAllProduct(prevProducts => prevProducts.filter(product => product.id !== itemId));
                }
            })
            .catch((err) => {
                console.log('Error deleting product:', err);
            });
    };

    // Filter products based on search query
    const filterProducts = () => {
        if (searchQuery.trim() === '') {
            return allProduct;
        }
        return allProduct.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filtering by product name
        );
    };

    return (
        <View style={styles.container}>
            <BackHeader title='Select Product' />
            <View style={{ ...styles.search_view, backgroundColor: colors.secondaryThemeColor }}>
                <AppTextInput
                    placeholder="Search..."
                    value={searchQuery} // Bind searchQuery state
                    onChangeText={(text) => setSearchQuery(text)} // Update searchQuery on change
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
                <TouchableOpacity
                    onPress={() => NavigationService.navigate('AddProductFrom')}
                    style={{ ...styles.add_button, backgroundColor: colors.buttonColor }}>
                    <Icon name='plus' type='AntDesign' color={colors.secondaryThemeColor} />
                </TouchableOpacity>
            </View>
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.buttonColor} />
                </View>
            ) : filterProducts().length === 0 ? (
                <View style={styles.loader}>
                    <Image source={require('../../assets/images/empty.png')} style={styles.nodata_sty} />
                </View>
            ) : (
                <View style={{ marginBottom: moderateScale(160) }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={filterProducts()} // Filtered products list
                        renderItem={({ item, index }) => (
                            <SelectProductList item={item} index={index} delProduct={delProduct} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            )}
        </View>
    );
};

// Define styles
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

export default SelectProduct;
