import { Text, View } from "react-native";
import { Realm, useApp } from "@realm/react"
import { useEffect } from "react";
import { Container } from "./styles";
import { HomeHeader } from "../../components/HomeHeader";

export function Home() {
    const app = useApp();

    return (
        <Container>
            <HomeHeader />
        </Container>
    )
}