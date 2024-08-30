//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';

// create a component
const SelectProductList = ({ item, index }) => {
    const colors = useTheme()
    return (
        <View>
            <View key={index} style={{ ...styles.container, backgroundColor: colors.secondaryThemeColor }}>
                <View>
                    <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>Test Product</Text>
                    <Text style={{ ...styles.webskill_number, color: colors.buttonColor }}>₹100.00</Text>
                </View>
                <Pressable
                style={{ ...styles.add_btn, backgroundColor: colors.buttonColor }}>
                    <Text style={{ ...styles.addbtn_txt,color:colors.secondaryThemeColor }}>Add</Text>
                </Pressable>
            </View>
            <View style={styles.line} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: moderateScale(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    line: {
        borderWidth: moderateScale(0.3),
        borderColor: '#D9D9D9'
    },
    webskill_txt: {
        fontFamily: FONTS.OpenSans.semibold,
        fontSize: moderateScale(13)
    },
    webskill_number: {
        fontFamily: FONTS.OpenSans.bold,
        fontSize: moderateScale(13)
    },
    add_btn: {
        height: moderateScale(30),
        width: moderateScale(50),
        borderRadius: moderateScale(5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    addbtn_txt: {
        fontFamily: FONTS.OpenSans.semibold,
        fontSize: moderateScale(12)
    }
});

//make this component available to the app
export default SelectProductList;

