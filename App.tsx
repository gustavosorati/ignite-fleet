import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { AppProvider, UserProvider } from "@realm/react"
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto"

import { Home } from './src/screens/Home';
import { SignIn } from './src/screens/SignIn';

import THEME from './src/theme';

import { REALM_APP_ID } from "@env"

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if(!fontsLoaded) {
    return null;
  }

  return (
    <AppProvider id={REALM_APP_ID}>
    <ThemeProvider theme={THEME}>
      <StatusBar
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent 
      />
      <UserProvider fallback={SignIn}>
        <Home />
      </UserProvider>
    </ThemeProvider>
    </AppProvider>
  );
}
