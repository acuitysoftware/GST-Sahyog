//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, PermissionsAndroid, Alert, Platform } from 'react-native';
import { Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Toast from "react-native-simple-toast";

// create a component
const InvoiceList = ({ item, index }) => {
    const colors = useTheme()
    const pdfUrl = item?.invoice_create_pdf_url;


    const requestStoragePermission = async () => {
        if (Platform.OS === 'android' && Platform.Version < 30) {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message: 'App needs access to your storage to download files',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    // Download the PDF file to the Downloads folder
    const downloadFile = async () => {
        const permissionGranted = await requestStoragePermission();
        if (!permissionGranted) {
            Alert.alert('Permission Denied', 'Storage permission is required to download files.');
            return;
        }

        const { dirs } = RNFetchBlob.fs;
        const downloadPath = `${dirs.DownloadDir}/invoice.pdf`;

        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'pdf', // Specify file extension
            addAndroidDownloads: {
                useDownloadManager: true, // Use Android's built-in download manager
                notification: true, // Show download notification
                path: downloadPath,
                description: 'Downloading invoice PDF',
                title: 'Invoice PDF',
                mime: 'application/pdf', // Set MIME type for PDF
                mediaScannable: true, // Make the file visible in the user's file manager
            },
        })
            .fetch('GET', pdfUrl)
            .then((res) => {
                console.log('File saved to:', res.path());
                // Alert.alert('Download Complete', `File saved to: ${res.path()}`);
                Toast.show('PDF Download Successfully....!');
            })
            .catch((err) => {
                console.error('Download error:', err);
                // Alert.alert('Download Failed', 'There was an error downloading the file.');
            });
    };

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
                <TouchableOpacity onPress={() => downloadFile()} >
                    <Icon name='clouddownload' type='AntDesign' color={'#15D704'} size={24} />          
                </TouchableOpacity>
                {/* <Image source={require('../../assets/images/share.png')} style={styles.share_img} /> */}
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
