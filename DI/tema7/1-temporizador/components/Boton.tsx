import React from "react";
import {Pressable, Text, StyleSheet, View, Image} from "react-native";

type Props = {
    onPress: () => void;
    title : string
}

export function Boton ({onPress, title}: Props){
    return (

        <Pressable
        style={({pressed}) => [
            styles.boton,
            pressed && styles.botonPresionado
        ]}
        onPress={onPress}
        >
            <Text style = {styles.texto}>{title}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    boton: {
        // Color de fondo azul
        backgroundColor: '#4A90E2', // Un azul estándar
        // Reducir padding para hacerlo más pequeño
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 15, // Un poco más pequeño
        alignSelf: 'center', // **Centra horizontalmente** el botón dentro de su contenedor
        // Asegura que el contenido (el texto) esté centrado
        alignItems: 'center',
        justifyContent: 'center',
        // Sombra más sutil (opcional, puedes ajustarla o quitarla)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1, 
    },
    botonPresionado: {
        opacity: 0.6, // Un poco más de contraste al presionar
    },
    texto: {
        color: '#fff', // Texto blanco para contraste con el azul
        fontSize: 14, // Fuente más pequeña
        fontWeight: 'normal',
    },
});