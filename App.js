// import libraries
import React, { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Theme } from 'react-native-basic-elements';
import NavigationService from './src/Services/Navigation';
import AuthStack from './src/Navigations/AuthStack';
import UserStack from './src/Navigations/UserStack';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from './src/Services/Auth';
import { setUser } from './src/Redux/reducer/User';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNFS from 'react-native-fs';

const Stack = createStackNavigator();

// create a component
const App = () => {
  const [isDark, setIsDark] = useState(false);
  const { login_status } = useSelector(state => state.User);
  const dispatch = useDispatch()
  const [activeuser, setActiveUser] = useState('')
  console.log('logggggggggggggggggg',login_status);
  
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AuthService.getToken();
        console.log('Token:', token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
  
    fetchToken();
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const result = await AuthService.getAccount();
      setActiveUser(result);
      if (result) {
        dispatch(setUser(result));
        console.log('User logged in:=============', result);
      }
    } catch (error) {
      console.error('Error checking user:==============', error);
    }
  };

 
  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1
        }}
      >
        <Theme.Provider
          theme={{
            light: {
              primaryThemeColor: '#164FE6',
              secondaryThemeColor: '#fff',
              primaryFontColor: '#000000',
              secondaryFontColor: '#272829',
              tintText:'#333333',
              input_txt: 'rgba(0, 0, 0, 0.5)',
              cardColor: '#F6F5F5',
              headerColor: 'rgba(42, 47, 65, 0.90)',
              pageBackgroundColor: '#FFFFFF',
              tabBarColor: '#fff',
              shadowColor: '#999',
              statusBarStyle: 'dark-content',
              buttonColor: '#164FE6',
              invoicebutton: '#15D704',
              buttontxtColor: '#fff',
              borderColor: '#999',
              card_txt_color: '#7F8DB4',
              dark_btn_color: '#222632',
              grey_textColor: '#e6e8e6',
              borderColor: '#CCCCCC'

            },
            dark: {
              primaryThemeColor: '#164FE6',
              secondaryThemeColor: '#fff',
              primaryFontColor: '#000000',
              secondaryFontColor: '#272829',
              tintText:'#333333',
              input_txt: 'rgba(0, 0, 0, 0.5)',
              cardColor: '#F6F5F5',
              headerColor: 'rgba(42, 47, 65, 0.90)',
              pageBackgroundColor: '#FFFFFF',
              tabBarColor: '#fff',
              shadowColor: '#999',
              statusBarStyle: 'dark-content',
              buttonColor: '#164FE6',
              invoicebutton: '#15D704',
              buttontxtColor: '#fff',
              borderColor: '#999',
              card_txt_color: '#7F8DB4',
              dark_btn_color: '#222632',
              grey_textColor: '#e6e8e6',
              borderColor: '#CCCCCC'
            },
          }}
          mode={isDark ? 'dark' : 'light'}
        >
          <NavigationContainer
            ref={r => NavigationService.setTopLevelNavigator(r)}

          >
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
            {login_status ? (
              <Stack.Screen name="UserStack" component={UserStack} />
            ) : (
              <Stack.Screen name="AuthStack" component={AuthStack} />
            )}
          
            </Stack.Navigator>
          </NavigationContainer>
        </Theme.Provider>
      </View>
    </SafeAreaProvider>
  );
};

export default App;
