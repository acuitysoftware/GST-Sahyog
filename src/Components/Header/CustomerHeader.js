//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon, StatusBar, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import { FONTS } from '../../Constants/Fonts';

// create a component
const CustomerHeader = ({title=''}) => {
    const colors = useTheme()
    return (
        <View>
             <StatusBar
                backgroundColor="transparent"
                barStyle="light-content"
                translucent={true}
            />

        <View style={{...styles.container,backgroundColor:colors.primaryThemeColor}}>
           
            <TouchableOpacity onPress={()=>NavigationService.navigate('CreateInvoice')}>
            <Icon name='arrowleft' type='AntDesign' color={colors.secondaryThemeColor}/>
            </TouchableOpacity>
            <Text style={{...styles.title_txt,color:colors.secondaryThemeColor}}>{title}</Text>
         
            <View style={{ ...styles.img_view, backgroundColor: colors.buttonColor }}>
                <Image
                    source={require('../../assets/images/company.png')}
                    style={styles.img_sty}
                />
            </View>
        </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: moderateScale(90),
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:moderateScale(15),
        paddingTop:moderateScale(35)

    },
    img_view: {
        height: moderateScale(43),
        width: moderateScale(43),
        borderRadius: moderateScale(24),
        alignItems: 'center',
        justifyContent: 'center'
    },
    img_sty: {
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(24),
        resizeMode: 'cover'
    },
    title_txt:{
        fontFamily:FONTS.Jost.medium,
        fontSize:moderateScale(14)
    }
});

//make this component available to the app
export default CustomerHeader;
