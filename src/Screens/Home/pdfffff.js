import { Alert, Platform, PermissionsAndroid } from 'react-native';

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      let permissionGranted = false;

      console.log('Checking Android version and permissions...');

      if (Platform.Version >= 30) {
        // For Android 11 (API level 30) and above, rely on `READ_EXTERNAL_STORAGE`
        console.log('Android version >= 30, requesting READ_EXTERNAL_STORAGE permission...');

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "App Storage Permission",
            message: "App needs access to your storage to download files",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );

        permissionGranted = granted === PermissionsAndroid.RESULTS.GRANTED;

      } else {
        // For Android versions below 11 (API level 30)
        console.log('Android version < 30, requesting WRITE_EXTERNAL_STORAGE permission...');

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "App Storage Permission",
            message: "App needs access to your storage to download files",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );

        permissionGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
      }

      if (permissionGranted) {
        console.log('Permission granted, proceeding with download...');
        downloadPDF(); // Your download logic here
      } else {
        console.log('Permission denied.');
        Alert.alert('Permission Denied', 'You need to allow storage access to download files.');
      }

    } catch (err) {
      console.error('Error in permission request:', err);
      Alert.alert('Error', 'An error occurred while requesting storage permission.');
    }
  }
};

// Sample download function (replace with actual logic)
const downloadPDF = () => {
  console.log('Downloading PDF...');
  // Add your file download logic here
};
