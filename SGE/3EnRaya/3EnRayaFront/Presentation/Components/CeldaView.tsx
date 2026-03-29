import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
    valor: string;
    onPress: () => void;
    disabled: boolean;
}

export const CeldaView: React.FC<Props> = ({ valor, onPress, disabled }) => {
    return (
        <TouchableOpacity
            style={[styles.celda, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled || valor !== ""}
        >
            <Text style={[styles.text, valor === "X" ? styles.x : styles.o]}>
                {valor}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    celda: {
        width: 90,
        height: 90,
        borderRadius: 16,
        margin: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    disabled: {
        backgroundColor: '#F2F2F7',
        elevation: 0,
        shadowOpacity: 0,
    },
    text: {
        fontSize: 48,
        fontWeight: '800',
    },
    x: { color: '#007AFF' },
    o: { color: '#34C759' },
});
