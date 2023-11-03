import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { AppProvider, UserProvider } from "@realm/react"
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto"

import { SignIn } from './src/screens/SignIn';

import THEME from './src/theme';
import { env } from './src/env';
import { Routes } from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RealmProvider } from './src/libs/realm';


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if(!fontsLoaded) {
    return null;
  }

  return (
    <AppProvider id={env.EXPO_PUBLIC_REALM_APP_ID}>
      <ThemeProvider theme={THEME}>
        <SafeAreaProvider>

          <StatusBar
            barStyle="light-content" 
            backgroundColor="transparent" 
            translucent 
          />
          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>

      </ThemeProvider>
    </AppProvider>
  );
}
