//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BackHeader from '../../Components/Header/BackHeader';
import { AppTextInput, Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import CastomerList from '../../Components/CastomerCard/CastomerList';

// create a component
const Customer = () => {
    const colors = useTheme()
    return (
        <View style={styles.container}>
            <BackHeader title='Select Customer' />
            <View style={{...styles.search_view,backgroundColor:colors.secondaryThemeColor}}>
                <AppTextInput
                    placeholder="Search..."
                    rightAction={<Icon
                        name='search1'
                        type='AntDesign'
                        color={colors.buttonColor}
                    />}
                    mainContainerStyle={{
                        width: moderateScale(250)
                    }}
                />
                <View style={{...styles.add_button,backgroundColor:colors.buttonColor}}>
                    <Icon name='plus' type='AntDesign' color={colors.secondaryThemeColor}/>
                </View>
            </View>
            <View style={{marginBottom:moderateScale(90)}}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                renderItem={({ item, index }) => (
                    <CastomerList item={item} index={index} />
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
    search_view:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal:moderateScale(15),
        padding:moderateScale(10)
    },
    add_button:{
        height:moderateScale(40),
        width:moderateScale(40),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:moderateScale(25)
    }
});

//make this component available to the app
export default Customer;
