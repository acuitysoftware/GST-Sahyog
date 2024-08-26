// //import liraries
// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// // create a component
// const  CastomerList= () => {
//     return (
//         <View style={styles.container}>
//             <Text>CastomerList</Text>
//         </View>
//     );
// };

// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#2c3e50',
//     },
// });

// //make this component available to the app
// export default CastomerList ;

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';

// create a component
const CastomerList = ({item,index}) => {
    const colors = useTheme()
    return (
        <View  key={index} style={{...styles.container,backgroundColor:colors.secondaryThemeColor}}>
            <Text>Web skill</Text>
            <Text>9845125548</Text>
            <View style={styles.line}/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        padding:moderateScale(15),
    },
    line:{
        borderWidth:moderateScale(0.3),
        marginTop:moderateScale(7),
        borderColor:'#D9D9D9'
    },
    invoice_txyt:{
        fontFamily:FONTS.Jost.medium,
        fontSize:moderateScale(13),
    },
    calender_img:{
        height:moderateScale(18),
        width:moderateScale(18),
        tintColor:'#666',
        resizeMode:'contain'
    },
    date_txt:{
        fontFamily:FONTS.Jost.regular,
        fontSize:moderateScale(12),
        marginLeft:moderateScale(10)
    },
    share_img:{
        height:moderateScale(18),
        width:moderateScale(18),
        resizeMode:'contain',
        marginLeft:moderateScale(15)
    }
});

//make this component available to the app
export default CastomerList;

