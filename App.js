// import libraries
import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Theme } from 'react-native-basic-elements';
import NavigationService from './src/Services/Navigation';
import AuthStack from './src/Navigations/AuthStack';
import UserStack from './src/Navigations/UserStack';

const Stack = createStackNavigator();

// create a component
const App = () => {
  const [isDark, setIsDark] = useState(false);

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
              <Stack.Screen name="AuthStack" component={AuthStack} />
              <Stack.Screen name="UserStack" component={UserStack} />

            </Stack.Navigator>
          </NavigationContainer>
        </Theme.Provider>
      </View>
    </SafeAreaProvider>
  );
};

export default App;
