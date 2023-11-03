import { SafeAreaView, Text, View } from "react-native";
import { Realm, useApp } from "@realm/react"
import { useEffect } from "react";
import { Container, Content } from "./styles";
import { HomeHeader } from "../../components/HomeHeader";
import { CarStatus } from "../../components/CarStatus";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const app = useApp();
  const {navigate} = useNavigation();

  function handleRegisterMoviment() {
    navigate('departure')
  }

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus licensePlate="XXX-1234" onPress={handleRegisterMoviment} />
      </Content>
    </Container>
  )
}
