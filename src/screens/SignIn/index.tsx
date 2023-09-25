import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, REALM_APP_ID } from "@env";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { Container, Title, Slogan } from './styles';

import backgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button';
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { Realm, useApp } from "@realm/react"

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

WebBrowser.maybeCompleteAuthSession();


GoogleSignin.configure({
  // iosClientId: IOS_CLIENT_ID,
  scopes: [ 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile' ],
});

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [state, setState] = useState({});
  
  const app = useApp();

  // const [_, response, googleSignIn] = Google.useAuthRequest({
  //   androidClientId: ANDROID_CLIENT_ID,
  //   iosClientId: IOS_CLIENT_ID,
  //   scopes: [ "profile", "email" ]
  // });

  async function handleGoogleSignIn() {
    setIsAuthenticating(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();
      console.log(userInfo)
      console.log(token)
      setState({ userInfo });
      
    } catch (error) {
      console.log(error.code);
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    } finally {
      setIsAuthenticating(false);
    }
    // googleSignIn().then((response) => {
    //   if(response.type !== "success") {
    //     setIsAuthenticating(false)
    //   }
    // });
  }

  // Preciso tentar obter o id token primeiro
  // useEffect(() => {
  //   if(response?.type === "success") {
  //     if(response.authentication?.idToken) {
  //       const credentials = Realm.Credentials.jwt(response.authentication.idToken)

  //       app.logIn(credentials).catch((eror) => {
  //         Alert.alert("Não foi possível conectar-se a sua conta Google");
  //         setIsAuthenticating(false)
  //       })
        
  //       // fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.authentication?.idToken}`)
  //       // .then((response) => response.json())
  //       // .then((response) => console.log(response))

  //     } else {
  //       Alert.alert("Não foi possível conectar-se a sua conta Google");
  //       setIsAuthenticating(false)
  //     }
  //   }
  // }, [response])

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>

      <Slogan>
        Gestão de uso de veículos
      </Slogan>

      <Button 
        title='Entrar com Google'
        onPress={handleGoogleSignIn}
        isLoading={isAuthenticating} 
      />
    </Container>
  );
}