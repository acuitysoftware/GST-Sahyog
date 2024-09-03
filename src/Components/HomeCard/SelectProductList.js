//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';
import { TouchableOpacity } from 'react-native';

// create a component
const SelectProductList = ({ item, index,delProduct }) => {
    const colors = useTheme()
    return (
        <View>
            <View key={index} style={{ ...styles.container, backgroundColor: colors.secondaryThemeColor }}>
                <View>
                    <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>{item.name}</Text>
                    <Text style={{
                        ...styles.webskill_number,
                        textDecorationLine: 'line-through',
                        fontFamily: FONTS.OpenSans.medium,
                        color: colors.tintText
                    }}>₹{item.mrp}</Text>
                    <Text style={{ ...styles.webskill_number, color: colors.buttonColor }}>₹{item.product_price}</Text>
                    {item.product_price ? (
                        <Text style={{ ...styles.webskill_number, color: colors.secondaryFontColor }}>{item.hsn_code}</Text>
                    ) : (
                        <Text style={{ ...styles.webskill_number, color: colors.secondaryFontColor }}>---</Text>
                    )

                    }
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <TouchableOpacity style={{ ...styles.add_btn, backgroundColor: colors.buttonColor }}>
                        <Icon name='plus' type='AntDesign' size={20} color={colors.secondaryThemeColor} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>NavigationService.navigate('EditProductFrom',{productId:item.id})}
                    style={{ marginTop: 10, marginBottom: 10 }}>
                        <Icon name='edit' type='Feather' size={20} color={colors.buttonColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => delProduct(item.id)}>
                        <Icon name='delete' type='AntDesign' size={20} color={'#C7253E'} />
                    </TouchableOpacity>
                </View>
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
        height: moderateScale(24),
        width: moderateScale(24),
        borderRadius: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    },
    addbtn_txt: {
        fontFamily: FONTS.OpenSans.semibold,
        fontSize: moderateScale(12)
    }
});

//make this component available to the app
export default SelectProductList;

