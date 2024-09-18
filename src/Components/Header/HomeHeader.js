//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Icon, StatusBar, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import Modal from "react-native-modal";
import { useDispatch, useSelector } from 'react-redux';
import { FONTS } from '../../Constants/Fonts';
import AuthService from '../../Services/Auth';
import NavigationService from '../../Services/Navigation';
import { logout } from '../../Redux/reducer/User';
import { TouchableOpacity } from 'react-native';
import Toast from "react-native-simple-toast";
import HomeService from '../../Services/HomeServises';

// create a component
const HomeHeader = () => {
    const colors = useTheme()
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.User)
    const [isModalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [companyLogo, setCompanyLogo] = useState('')
    // console.log('imgggggggggggggggggg',companyLogo);
    

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    useEffect(()=>{
        getUserProfile()
    },[])

    const logoutUser = () => {
        Toast.show('Logged Out Successfully ', Toast.SHORT);
        AuthService.setToken(null)
        AuthService.setAccount(null);
        NavigationService.navigate('Login')
        dispatch(logout());

    };

    const getUserProfile = (() => {
        let data = {
            "userid": userData.userid
        }
        HomeService.setUserProfile(data)
            .then((res) => {
                console.log('herderrrrrrrrrrrrrrrrrrrrrrrrr',res);
                
                if (res && res.error == false) {
                    setName(res?.data?.name)
                    setEmail(res?.data?.email)
                    setPhoneNumber(res?.data?.phone)
                    setCompanyLogo(res?.data?.customer_img_url)
                }
            })
            .catch((err) => {
                console.log('fatchprofileerrrrrrr', err);
            })
    })

    return (
        <View>
            <View style={{ ...styles.container, backgroundColor: colors.cardColor }}>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="dark-content"
                    translucent={true}
                />
                <Pressable onPress={toggleModal} style={{ ...styles.img_view, backgroundColor: colors.buttonColor }}>
                     {
                            companyLogo?.length > 0 ?
                            <Image source={{uri:companyLogo}}  style={styles.img_sty} />
                            :
                            <Image source={require('../../assets/images/noLogo.png')}  style={styles.no_img_sty}/>
                        }
                </Pressable>
            </View>

            <Modal
                isVisible={isModalVisible}
                onBackButtonPress={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
                style={{
                    justifyContent: 'flex-start',
                    marginTop: moderateScale(43),
                    marginRight: moderateScale(30)
                }}
            >
                <View style={styles.modalView}>
                    <Pressable onPress={() => setModalVisible(false)}>
                        <Icon name='close' type='AntDesign' color={colors.buttonColor} style={styles.close_icon} />
                    </Pressable>
                    <View style={styles.img_circle}>
                        {
                            companyLogo?.length > 0 ?
                            <Image source={{uri:companyLogo}} style={styles.user_img} />
                            :
                            <Image source={require('../../assets/images/noLogo.png')} style={styles.user_img} />
                        }
                       
                    </View>

                    <View style={styles.m_primary_view}>
                        <Text style={{ ...styles.modal_title, color: colors.primaryFontColor }}>Name : </Text>
                        <Text style={{ ...styles.modal_name_txt, color: colors.secondaryFontColor }}>{name}</Text>
                    </View>
                    <View style={styles.m_primary_view}>
                        <Text style={{ ...styles.modal_title, color: colors.primaryFontColor }}>Phone : </Text>
                        <Text style={{ ...styles.modal_name_txt, color: colors.secondaryFontColor }}>+91 {phoneNumber}</Text>
                    </View>
                    <View style={styles.m_primary_view}>
                        <Text style={{ ...styles.modal_title, color: colors.primaryFontColor }}>Email : </Text>
                        <Text numberOfLines={1} style={{ ...styles.modal_email_txt, color: colors.secondaryFontColor }}>{email}</Text>
                    </View>
                    <TouchableOpacity
                    onPress={()=>logoutUser()}
                    style={{ ...styles.m_primary_view, alignItems: 'center', justifyContent: 'center', padding: moderateScale(10) }}>
                        <Icon name='log-out' type='Entypo' color={colors.buttonColor} />
                        <Text style={{
                            ...styles.modal_title,
                            color: colors.secondaryFontColor,
                            marginLeft: moderateScale(5)
                        }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: moderateScale(90),
        elevation: 2,
        alignItems: 'center',
    },
    img_view: {
        height: moderateScale(43),
        width: moderateScale(43),
        borderRadius: moderateScale(24),
        alignSelf: 'flex-end',
        marginTop: moderateScale(30),
        marginHorizontal: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center'
    },
    img_sty: {
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(24),
        resizeMode: 'cover'
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: moderateScale(3),
        padding: moderateScale(15),
        alignSelf: 'flex-end',
        width: moderateScale(220)
    },
    modal_title: {
        fontFamily: FONTS.Jost.semibold,
        fontSize: moderateScale(13),
    },
    modal_name_txt: {
        fontFamily: FONTS.Jost.regular,
        fontSize: moderateScale(13),
    },
    modal_email_txt: {
        fontFamily: FONTS.Jost.regular,
        fontSize: moderateScale(13),
        width: moderateScale(145)
    },
    m_primary_view: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: moderateScale(10)
    },
    close_icon: {
        alignSelf: 'flex-end',
    },
    img_circle: {
        height: moderateScale(63),
        width: moderateScale(63),
        borderRadius: moderateScale(60),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:Colors.buttonColor,
        alignSelf: 'center'
    },
    user_img: {
        height: moderateScale(75),
        width: moderateScale(75),
        resizeMode: 'cover',
        borderRadius: moderateScale(60),
        alignSelf: 'center',
    },
    no_img_sty:{
        height: moderateScale(35),
        width: moderateScale(35),
        tintColor:'#fff'
    }
});

//make this component available to the app
export default HomeHeader;
