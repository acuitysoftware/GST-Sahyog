//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import InvoiceList from '../../Components/InvoiceCard/InvoiceList';
import { moderateScale } from '../../Constants/PixelRatio';

// create a component
const Invoice = () => {
    return (
        <View style={styles.container}>
            <BackHeader title='Invoice List' />
            <View style={{marginBottom:moderateScale(90)}}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                renderItem={({ item, index }) => (
                    <InvoiceList item={item} index={index} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            </View>
           
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default Invoice;
