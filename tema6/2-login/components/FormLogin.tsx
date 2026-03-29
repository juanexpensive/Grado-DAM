import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { BotonLogin } from "./BotonLogin";
import { router, Link } from "expo-router";
import { ImageBackground } from "expo-image";

type Props = {
    onLogin: (email: string, password: string) => void;
}

export function FormLogin({ onLogin }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
        <ImageBackground
        source = {{uri: "https://pbs.twimg.com/media/F775U4sXQAA_gDE.jpg:large"}}
        style={styles.background}
      >

            <View style={styles.form}>
                <Text style={styles.title}>INGRESAR</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <BotonLogin
                onPress={() => onLogin(email, password)}>
                </BotonLogin>

                <Text>No tienes cuenta? </Text>
                <Link href="/register"> Registrate </Link>
            </View>
                  </ImageBackground>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end', // esto empuja el formulario hacia abajo
        width: '100%',
    },
    form: {
        height: '50%', // mitad de la pantalla
        width: '100%', // todo el ancho
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },
    background: {
        flex : 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center"
    }
});
