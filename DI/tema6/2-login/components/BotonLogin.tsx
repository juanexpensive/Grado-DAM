import React from "react";
import {Pressable, Text, StyleSheet, View, Image} from "react-native";

type Props = {
    onPress: () => void;
}

export function BotonLogin ({onPress}: Props){
    return (

        <Pressable
        style={({pressed}) => [
            styles.boton,
            pressed && styles.botonPresionado
        ]}
        onPress={onPress}
        >
            <Text style = {styles.texto}> ENTRAR </Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    boton: {
        backgroundColor: '#FFA500', 
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
    },
    botonPresionado: {
        opacity: 0.7, 
    },
    texto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});