//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';

// create a component
const CastomerList = ({ item, index }) => {
    const colors = useTheme()
    return (
        <View>
            <View key={index} style={{ ...styles.container, backgroundColor: colors.secondaryThemeColor }}>
                <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>Web skill</Text>
                <Text style={{ ...styles.webskill_number, color: colors.tintText }}>9845125548</Text>
            </View>
            <View style={styles.line} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: moderateScale(15),
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
        fontFamily: FONTS.OpenSans.regular,
        fontSize: moderateScale(13)
    }
});

//make this component available to the app
export default CastomerList;

