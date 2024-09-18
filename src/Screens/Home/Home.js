//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Pressable, Modal, ActivityIndicator, Alert, Platform, PermissionsAndroid } from 'react-native';
import HomeHeader from '../../Components/Header/HomeHeader';
import { AppButton, AppTextInput, Card, Picker, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import NavigationService from '../../Services/Navigation';
import { useSelector } from 'react-redux';
import HomeService from '../../Services/HomeServises';
import RNFetchBlob from 'rn-fetch-blob';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Toast from "react-native-simple-toast";

const { height, width } = Dimensions.get('screen')
// create a component
const Home = () => {
    const colors = useTheme()
    const { userData } = useSelector(state => state.User)
    const [homeGstData, sethomeGstData] = useState({});
    const [dropdownValue, setDropdownValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [HSNurl,setHSNUrl] = useState('')
    const [Invoiceurl,setInvoiceUrl] = useState('')

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [StartDateData, setStartDateData] = useState('');
    const [StartDate, setStartDate] = useState('');

    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [EndDateData, setEndDateData] = useState('');
    const [EndDate, setEndDate] = useState('');


    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };

    const StartDatehandleConfirm = (date) => {
        console.log('dateeeeeeee', moment(date).format('YY-MM-DD'));
        setStartDate(moment(date).format('YYYY-MM-DD'));
        hideStartDatePicker();
    };

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const EndDatehandleConfirm = (date) => {
        setEndDate(moment(date).format('YYYY-MM-DD'));
        hideEndDatePicker();
    };

    useEffect(() => {
        getgstData()
    }, [])

    const getgstData = (() => {
        let data = {
            "userid": userData?.userid
        }
        setLoading(true)
        HomeService.setGstDatafatch(data)
            .then((res) => {
                if (res && res.error == true) {
                    sethomeGstData(res.data)
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log('dashgsterr', err);
                setLoading(false)
            })
    })

    const getHSNDownload = (() => {
        let data = {
            "userid": userData?.userid,
            "start_date": StartDate,
            "end_date": EndDate

        }
        console.log('dwnloaddddddddddddddd', data);
        HomeService.HSN_download(data)
            .then((res) => {
                console.log('hsndownloadddddddddddddddddresss====================', res);

                if (res && res.error == false) {
                    setHSNUrl(res.xzlsurl)
                    downloadHSNFile()
                }
            })
            .catch((err) => {
                console.log('hsndownload', err);

            })
    })

    const getHsnUrl = HSNurl;


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

    const downloadHSNFile = async () => {
        const permissionGranted = await requestStoragePermission();
        if (!permissionGranted) {
            Alert.alert('Permission Denied', 'Storage permission is required to download files.');
            return;
        }
    
        const { dirs } = RNFetchBlob.fs;
        const downloadPath = `${dirs.DownloadDir}/Invoice_HSN_excel_sheet.xlsx`; // Change file name and extension
    
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'xlsx', // Specify file extension for Excel
            addAndroidDownloads: {
                useDownloadManager: true, // Use Android's built-in download manager
                notification: true, // Show download notification
                path: downloadPath,
                description: 'Downloading HSN Excel Sheet',
                title: 'HSN Excel Sheet',
                mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Set MIME type for Excel
                mediaScannable: true, // Make the file visible in the user's file manager
            },
        })
            .fetch('GET', getHsnUrl) // Use the XLSX URL
            .then((res) => {
                console.log('File saved to:', res.path());
                Toast.show('Excel file downloaded successfully!', Toast.SHORT);
            })
            .catch((err) => {
                console.error('Download error:', err);
                Alert.alert('Download Failed', 'There was an error downloading the file.');
            });
    };

    const getInvoiceDownload = () => {
        let data = {
            "userid": userData?.userid,
            "start_date": StartDate,
            "end_date": EndDate
        };
        console.log('Download request:', data);
        HomeService.Invoice_download(data)
            .then((res) => {
                if (res && res.error == false) {
                    console.log('Invoice download response:', res);
                    const invoiceUrl = res.xzlsurl;
                    console.log('Invoice download URL:', invoiceUrl);
                    downloadInvoiceFile(invoiceUrl); // Pass the URL directly to the download function
                }
            })
            .catch((err) => {
                console.log('Invoice download error:', err);
            });
    };
    
    const downloadInvoiceFile = async (invoiceUrl) => {
        const permissionGranted = await requestStoragePermission();
        if (!permissionGranted) {
            Alert.alert('Permission Denied', 'Storage permission is required to download files.');
            return;
        }
    
        const { dirs } = RNFetchBlob.fs;
        const downloadPath = `${dirs.DownloadDir}/Invoice_total_excel_sheet.xlsx`;
    
        console.log('Starting download for URL:', invoiceUrl);
    
        if (!invoiceUrl || !invoiceUrl.startsWith('http')) {
            Alert.alert('Invalid URL', 'The invoice URL is invalid or missing.');
            return;
        }
    
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'xlsx',
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: downloadPath,
                description: 'Downloading Invoice Excel Sheet',
                title: 'Invoice Excel Sheet',
                mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                mediaScannable: true,
            },
        })
        .fetch('GET', invoiceUrl)
        .then((res) => {
            console.log('File saved to:', res.path());
            if (Platform.OS === 'android') {
                Toast.show('Excel file downloaded successfully!', Toast.SHORT);
            }
        })
        .catch((err) => {
            console.error('Download error:', err);
            Alert.alert('Download Failed', 'There was an error downloading the file.');
        });
    };
    
    


    return (
        <View style={styles.container}>
            <HomeHeader />
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.buttonColor} />
                </View>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image source={require('../../assets/images/homebanner.png')} style={styles.banner_sty} />

                    <View style={styles.total_view}>
                        <Card onPress={() => NavigationService.navigate('CreateInvoice')} style={styles.box_view}>
                            <View style={styles.main_view}>
                                <View style={{ ...styles.image_backgroung, backgroundColor: 'rgba(22, 79, 230, 0.17)' }}>
                                    <Image source={require('../../assets/images/homeinvoice.png')}
                                        style={{ ...styles.logo_sty, tintColor: colors.buttonColor }} />
                                </View>
                                <Text style={{ ...styles.total_text }}>{'   '}</Text>
                            </View>

                            <Text style={{ ...styles.title_txt, color: colors.primaryFontColor }}>Create Invoice</Text>
                        </Card>
                        <Card style={styles.box_view}>
                            <View style={styles.main_view}>
                                <View style={{ ...styles.image_backgroung, backgroundColor: 'rgba(255, 35, 21, 0.15)' }}>
                                    <Image source={require('../../assets/images/customer.png')}
                                        style={{ ...styles.logo_sty, tintColor: '#FF2315' }} />
                                </View>
                                <Text style={{ ...styles.total_text, color: colors.primaryFontColor }}>{homeGstData?.total_customer}</Text>
                            </View>

                            <Text style={{ ...styles.title_txt, color: colors.primaryFontColor }}>Total customer</Text>
                        </Card>
                        <Card style={styles.box_view}>
                            <View style={styles.main_view}>
                                <View style={{ ...styles.image_backgroung, backgroundColor: 'rgba(21, 215, 4, 0.24)' }}>
                                    <Image source={require('../../assets/images/add-product.png')}
                                        style={{ ...styles.logo_sty, tintColor: '#15D704' }} />
                                </View>
                                <Text style={{ ...styles.total_text, color: colors.primaryFontColor }}>{homeGstData?.total_invoice}</Text>
                            </View>

                            <Text style={{ ...styles.title_txt, color: colors.primaryFontColor }}>Total Invoice</Text>
                        </Card>
                        <Card style={styles.box_view}>
                            <View style={styles.main_view}>
                                <View style={{ ...styles.image_backgroung, backgroundColor: 'rgba(21, 215, 4, 0.24)' }}>
                                    <Image source={require('../../assets/images/add-product.png')}
                                        style={{ ...styles.logo_sty, tintColor: '#15D704' }} />
                                </View>
                                <Text style={{ ...styles.total_text, color: colors.primaryFontColor }}>{homeGstData?.total_product}</Text>
                            </View>

                            <Text style={{ ...styles.title_txt, color: colors.primaryFontColor }}>Total Product</Text>
                        </Card>

                    </View>

                    <Card style={styles.total_sales_card}>
                        <View style={styles.sale_view}>
                            <Text style={{ ...styles.total_sale_txt, color: colors.primaryFontColor }}>Total Sale</Text>
                            <Text style={{ ...styles.sale_txt_number, color: colors.primaryFontColor }}>{homeGstData?.total_sale.toFixed(2)}</Text>
                        </View>
                        <View style={styles.cardline} />
                        <View style={styles.sale_view}>
                            <Text style={{ ...styles.total_sale_txt, color: colors.primaryFontColor }}>CGST</Text>
                            <Text style={{ ...styles.sale_txt_number, color: colors.primaryFontColor }}>{homeGstData?.total_cgst.toFixed(2)}</Text>
                        </View>
                        <View style={styles.cardline} />
                        <View style={styles.sale_view}>
                            <Text style={{ ...styles.total_sale_txt, color: colors.primaryFontColor }}>SGST</Text>
                            <Text style={{ ...styles.sale_txt_number, color: colors.primaryFontColor }}>{homeGstData?.total_sgst.toFixed(2)}</Text>
                        </View>
                        <View style={styles.cardline} />
                        <View style={styles.sale_view}>
                            <Text style={{ ...styles.total_sale_txt, color: colors.primaryFontColor }}>IGST</Text>
                            <Text style={{ ...styles.sale_txt_number, color: colors.primaryFontColor }}>{homeGstData?.total_igst.toFixed(2)}</Text>
                        </View>
                    </Card>

                    <Card style={styles.download_card}>
                        <Text style={{ ...styles.download_txt, color: colors.secondaryFontColor }}>Download Report</Text>

                        <Text style={{ ...styles.startdate_txt, color: colors.secondaryFontColor }}>Start Date</Text>
                        <Pressable onPress={showStartDatePicker}
                            style={{ ...styles.time_input_sty, borderColor: colors.borderColor }}>
                            <DateTimePickerModal
                                isVisible={isStartDatePickerVisible}
                                mode="date"
                                onConfirm={val => { StartDatehandleConfirm(val); setStartDateData(val); }}
                                onCancel={hideStartDatePicker}
                            />
                            <Pressable onPress={showStartDatePicker}>
                                <Text style={{ ...styles.time_txt, color: colors.secondaryFontColor }}>
                                    {StartDateData ? moment(StartDateData).format('YYYY-MM-DD') : 'YYYY-MM-DD'}
                                </Text>
                            </Pressable>
                            <Pressable onPress={showStartDatePicker} >
                                <Image source={require('../../assets/images/calendar.png')} style={styles.calender_img} />
                            </Pressable>
                        </Pressable>

                        <Text style={{ ...styles.startdate_txt, color: colors.secondaryFontColor }}>End Date</Text>
                        <Pressable onPress={showEndDatePicker}
                            style={{ ...styles.time_input_sty, borderColor: colors.borderColor }}>
                            <DateTimePickerModal
                                isVisible={isEndDatePickerVisible}
                                mode="date"
                                onConfirm={val => { EndDatehandleConfirm(val); setEndDateData(val); }}
                                onCancel={hideEndDatePicker}
                            />
                            <Pressable onPress={showEndDatePicker}>
                                <Text style={{ ...styles.time_txt, color: colors.secondaryFontColor }}>
                                    {EndDateData ? moment(EndDateData).format('YYYY-MM-DD') : 'YYYY-MM-DD'}
                                </Text>
                            </Pressable>
                            <Pressable onPress={showEndDatePicker} >
                                <Image source={require('../../assets/images/calendar.png')} style={styles.calender_img} />
                            </Pressable>
                        </Pressable>

                        <Picker
                            placeholder="Choose Your Report"
                            options={[
                                {
                                    label: 'HSN wise report',
                                    value: 'HSN wise report'
                                },
                                {
                                    label: 'Invoice wise report',
                                    value: 'Invoice wise report'
                                }
                            ]}
                            textStyle={{ ...styles.picker_txt, color: colors.secondaryFontColor }}
                            containerStyle={{ ...styles.picker_sty, borderColor: colors.borderColor }}
                            selectedValue={dropdownValue}
                            onValueChange={(val) => setDropdownValue(val)}
                        />

                        <AppButton
                            textStyle={{ ...styles.buttn_txt, color: colors.buttontxtColor }}
                            style={styles.button_sty}
                            title="Download Report"
                            onPress={() => {
                                if (dropdownValue === 'HSN wise report') {
                                    getHSNDownload();
                                } else if (dropdownValue === 'Invoice wise report') {
                                    getInvoiceDownload();
                                }
                            }}
                        />
                    </Card>
                    <View style={{ ...styles.bottom_view }}>
                        <View>
                            <Text style={styles.support_txt}>Support</Text>
                            <Text style={{ ...styles.phone_txt, marginTop: moderateScale(10) }}>Phone Number {'  '}<Text style={styles.phnumber_txt}>+91 6558745444</Text></Text>
                            <Text style={{ ...styles.phone_txt }}>Email {'  '}<Text style={styles.phnumber_txt}>support@sahyog.com</Text></Text>
                        </View>
                        <Image source={require('../../assets/images/online-chat.png')} style={styles.support_img} />
                    </View>
                </ScrollView>
            )}

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    banner_sty: {
        height: moderateScale(180),
        width: width - moderateScale(30),
        resizeMode: 'contain',
        marginTop: moderateScale(-20),
        alignSelf: 'center'
    },
    total_view: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: moderateScale(15),
        marginTop: moderateScale(-20),
        justifyContent: 'space-between'
    },
    box_view: {
        marginTop: moderateScale(20),
        width: moderateScale(150),
        height: moderateScale(100),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(15)
    },
    logo_sty: {
        height: moderateScale(22),
        width: moderateScale(22)
    },
    title_txt: {
        fontFamily: FONTS.Jost.medium,
        fontSize: moderateScale(15),
        marginTop: moderateScale(7),
    },
    main_view: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image_backgroung: {
        height: moderateScale(30),
        width: moderateScale(30),
        borderRadius: moderateScale(6),
        alignItems: 'center',
        justifyContent: 'center'
    },
    total_text: {
        marginHorizontal: moderateScale(15),
        fontFamily: FONTS.Jost.semibold,
        fontSize: moderateScale(14)
    },
    total_sales_card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateScale(15),
        marginHorizontal: moderateScale(15)
    },
    cardline: {
        height: moderateScale(40),
        borderWidth: moderateScale(0.3),
        borderColor: '#D9D9D9'
    },
    sale_view: {
        alignItems: 'center'
    },
    total_sale_txt: {
        fontFamily: FONTS.Jost.medium,
        fontSize: moderateScale(14)
    },
    sale_txt_number: {
        fontFamily: FONTS.OpenSans.regular,
        fontSize: moderateScale(12)
    },
    download_card: {
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(15)
    },
    download_txt: {
        fontFamily: FONTS.Jost.semibold,
        fontSize: moderateScale(15)
    },
    startdate_txt: {
        fontFamily: FONTS.Jost.medium,
        fontSize: moderateScale(13),
        marginTop: moderateScale(10)
    },
    calender_img: {
        height: moderateScale(20),
        width: moderateScale(20),
        tintColor: '#999'
    },
    time_input_sty: {
        borderWidth: 1,
        borderRadius: moderateScale(7),
        paddingHorizontal: moderateScale(10),
        height: moderateScale(45),
        width: width - moderateScale(50),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateScale(7)
    },
    time_txt: {
        fontFamily: FONTS.OpenSans.medium,
        fontSize: moderateScale(12)
    },
    picker_sty: {
        height: moderateScale(45),
        borderRadius: moderateScale(6),
        marginTop: moderateScale(10),
    },
    picker_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Jost.regular
    },
    bottom_view: {
        marginTop: moderateScale(15),
        marginBottom: moderateScale(20),
        marginHorizontal: moderateScale(15),
        borderRadius: moderateScale(10),
        borderWidth: moderateScale(1),
        padding: moderateScale(10),
        borderColor: '#15D704',
        backgroundColor: 'rgba(21, 215, 4, 0.12)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: moderateScale(15)
    },
    support_txt: {
        fontFamily: FONTS.Jost.semibold,
        fontSize: moderateScale(15),
        color: '#0D4608'
    },
    support_img: {
        height: moderateScale(45),
        width: moderateScale(60),
        resizeMode: 'contain'
    },
    phone_txt: {
        fontFamily: FONTS.Jost.semibold,
        fontSize: moderateScale(13),
        color: '#15D704'
    },
    phnumber_txt: {
        fontFamily: FONTS.Jost.regular,
        fontSize: moderateScale(13),
        color: '#15D704',
    },
    buttn_txt: {
        fontFamily: FONTS.OpenSans.semibold,
        fontSize: moderateScale(15)
    },
    button_sty: {
        height: moderateScale(42),
        width: width - moderateScale(50),
        borderRadius: moderateScale(7),
        alignSelf: 'center',
        marginTop: moderateScale(20)
    },
});

//make this component available to the app
export default Home;
