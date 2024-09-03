import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';

const CastomerList = ({ item, index, delAccount }) => {
    const colors = useTheme();

    return (
        <View>
            <View key={index} style={{ ...styles.container, backgroundColor: colors.secondaryThemeColor }}>
                <View>
                    <Text style={{ ...styles.webskill_txt, color: colors.secondaryFontColor }}>{item.name}</Text>
                    <Text style={{ ...styles.webskill_number, color: colors.tintText }}>{item.phone_number}</Text>
                    <Text style={{ ...styles.webskill_number, color: colors.tintText }}>{item.email}</Text>
                    <Text numberOfLines={1} style={{ ...styles.webskill_number, width: moderateScale(230), color: colors.tintText }}>{item.address}</Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <TouchableOpacity style={{ ...styles.add_btn, backgroundColor: colors.buttonColor }}>
                        <Icon name='user-plus' type='FontAwesome5' size={12} color={colors.secondaryThemeColor} />
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => NavigationService.navigate('EditCustomerFrom', { customerId: item.id })}
                     style={{ marginTop: 10, marginBottom: 10 }}>
                        <Icon name='edit' type='Feather' size={20} color={colors.buttonColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => delAccount(item.id)}>
                        <Icon name='delete' type='AntDesign' size={20} color={'#C7253E'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.line} />
        </View>
    );
};

// Styles
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
        fontFamily: FONTS.OpenSans.regular,
        fontSize: moderateScale(13)
    },
    add_btn: {
        height: moderateScale(24),
        width: moderateScale(24),
        borderRadius: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    }
});

export default CastomerList;
