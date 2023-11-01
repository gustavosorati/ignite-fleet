
import React from 'react';
import { Container, Greeting, Message, Name, Picture } from './styles';
import { TouchableOpacity } from 'react-native'
import { Power } from 'phosphor-react-native'
import theme from '../../theme';

import { useUser, useApp } from "@realm/react"
import { DefaultUserProfileData } from 'realm';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Profile extends DefaultUserProfileData {
  name: string;
  pictureurl: string;
}

export function HomeHeader() {
    const user = useUser();
    const app = useApp();
    const insets = useSafeAreaInsets();

    async function handleLogout() {
      app.currentUser?.logOut()
    }

  return (
    <Container style={{ paddingTop: insets.top + 32 }}>
      <Picture
        source={{ uri: (user.profile as Profile).pictureurl }}
        placeholder='L184i9ofbHof00ayjsay~qj[ayj@'
      />

      <Greeting>
        <Message>
          Olá
        </Message>

        <Name>
          {user.profile.name}
        </Name>
      </Greeting>

      <TouchableOpacity onPress={handleLogout}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}