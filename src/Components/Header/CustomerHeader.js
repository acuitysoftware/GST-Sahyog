//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon, StatusBar, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import { FONTS } from '../../Constants/Fonts';
import { useSelector } from 'react-redux';
import HomeService from '../../Services/HomeServises';

// create a component
const CustomerHeader = ({title=''}) => {
    const colors = useTheme()

    const { userData } = useSelector(state => state.User)
    const [companyLogo, setCompanyLogo] = useState('')

    useEffect(() => {
        getUserProfile()
    }, [])

    const getUserProfile = (() => {
        let data = {
            "userid": userData.userid
        }
        HomeService.setUserProfile(data)
            .then((res) => {
                console.log('herderrrrrrrrrrrrrrrrrrrrrrrrr', res);
                if (res && res.error == false) {
                    setCompanyLogo(res?.data?.customer_img_url)
                }
            })
            .catch((err) => {
                console.log('fatchprofileerrrrrrr', err);
            })
    })

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
            {
                        companyLogo?.length > 0 ?
                            <Image source={{ uri: companyLogo }} style={styles.img_sty} />
                            :
                            <Image source={require('../../assets/images/noLogo.png')} style={styles.no_img_sty} />
                    }
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
    },
    no_img_sty:{
        height: moderateScale(35),
        width: moderateScale(35),
        tintColor:'#fff'
    }
});

//make this component available to the app
export default CustomerHeader;
