//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import moment from 'moment';

// create a component
const InvoiceList = ({ item, index }) => {
    const colors = useTheme()
    return (
        <View key={index} style={{ ...styles.container, backgroundColor: colors.cardColor }}>
            <View>
                <Text style={{ ...styles.invoice_txyt, color: colors.primaryThemeColor }}>#{item.invoice_number}</Text>
                <View style={{ flexDirection: 'row', marginTop: moderateScale(7) }}>
                    <Image source={require('../../assets/images/invoivecalendar.png')} style={styles.calender_img} />
                    {item.create_date && (
                        <Text style={{ ...styles.date_txt }}>{moment(item.create_date).format('DD/MM/YY')}</Text>   
                    )}
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Icon name='clouddownload' type='AntDesign' color={'#15D704'} size={22} />
                <Image source={require('../../assets/images/share.png')} style={styles.share_img} />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: moderateScale(17),
        marginBottom: moderateScale(2),
        elevation: moderateScale(1),
        alignItems: 'center'
    },
    invoice_txyt: {
        fontFamily: FONTS.Jost.medium,
        fontSize: moderateScale(13),
    },
    calender_img: {
        height: moderateScale(18),
        width: moderateScale(18),
        tintColor: '#666',
        resizeMode: 'contain'
    },
    date_txt: {
        fontFamily: FONTS.Jost.regular,
        fontSize: moderateScale(12),
        marginLeft: moderateScale(10)
    },
    share_img: {
        height: moderateScale(18),
        width: moderateScale(18),
        resizeMode: 'contain',
        marginLeft: moderateScale(15)
    }
});

//make this component available to the app
export default InvoiceList;
