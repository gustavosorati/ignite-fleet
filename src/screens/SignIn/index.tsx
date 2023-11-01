import { Container, Title, Slogan } from './styles';

import backgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button';

import { useEffect, useState } from "react";

import { Realm, useApp } from "@realm/react"

import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { env } from "../../env";
import { Alert } from 'react-native';

GoogleSignin.configure({
  scopes: [ 'email', 'profile' ],
  webClientId: env.EXPO_PUBLIC_API_CONSOLE_GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});

export function SignIn() {
  const [signinInProgress, setSigninInProgress] = useState(false);
  
  const app = useApp();

  async function handleGoogleSignIn() {
    setSigninInProgress(true);

    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if(response.idToken) {
        console.log("idToken: => ", response.idToken);
        const credentials = Realm.Credentials.jwt(response.idToken);
        
        app.logIn(credentials)
        .catch((eror) => {
          Alert.alert("Não foi possível conectar-se a sua conta Google");
          setSigninInProgress(false)
        })
      }

    } catch (error) {
      Alert.alert("Não foi possível conectar-se a sua conta Google");
    } finally {
      setSigninInProgress(false);
    }
  }

  useEffect(() => {
    
  }, [])

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>

      <Slogan>
        Gestão de uso de veículos
      </Slogan>

      <Button 
        title='Entrar com Google'
        onPress={handleGoogleSignIn}
        isLoading={signinInProgress} 
      />
    </Container>
  );
}