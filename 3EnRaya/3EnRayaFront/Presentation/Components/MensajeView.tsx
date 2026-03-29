import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface Props {
    texto: string;
}

export const MensajeView: React.FC<Props> = ({ texto }) => {
    if (!texto) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{texto}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginVertical: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1C1C1E',
        textAlign: 'center',
    },
});
