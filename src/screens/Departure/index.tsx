import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { Realm, useApp } from "@realm/react"
import { Container, Content } from "./styles";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlateInput";
import { TextAreaInput } from "../../components/TextAreaInput";
import { Button } from "../../components/Button";
import { useRef, useState } from "react";
import { licensePlateValidate } from "../../utils/license-plate-validate";


const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const [description, setDescription] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const licensePlateREF = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    if(!licensePlateValidate(licensePlate)) {
      licensePlateREF.current?.focus();
      return Alert.alert("Placa inválida", "A placa é invalida. Por favor, informe a placa correta do veículo")
    }

    if(description.trim().length === 0) {
      descriptionRef.current?.focus();
      return Alert.alert('Finalidade', 'Por favor, informe a finalidade da utilização do veículo')
    }
  }

  return (
    <Container>
      <Header title='Saída' />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardAvoidingViewBehavior}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              ref={licensePlateREF}
              label='Placa do veículo'
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              onChangeText={setLicensePlate}
              returnKeyType="next"
            />

            <TextAreaInput
              ref={descriptionRef}
              label='Finalizade'
              placeholder='Vou utilizar o veículo para...'
              onSubmitEditing={handleDepartureRegister}
              onChangeText={setDescription}
              returnKeyType="send"
              blurOnSubmit
            />

            <Button
              title='Registar Saída'
              onPress={handleDepartureRegister}
            />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  )
}
