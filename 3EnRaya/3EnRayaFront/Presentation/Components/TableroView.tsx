import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CeldaView } from './CeldaView';
import { Partida } from '../../Domain/Entities/Partida';

interface Props {
    partida: Partida;
    onCeldaPress: (fila: number, columna: number) => void;
}

export const TableroView: React.FC<Props> = ({ partida, onCeldaPress }) => {
    const deshabilitado = !partida.esMiTurno || !!partida.resultado || partida.esperandoOponente;

    return (
        <View style={styles.tablero}>
            {partida.tablero.map((fila, i) => (
                <View key={i} style={styles.fila}>
                    {fila.map((celda, j) => (
                        <CeldaView
                            key={j}
                            valor={celda}
                            onPress={() => onCeldaPress(i, j)}
                            disabled={deshabilitado}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tablero: {
        padding: 10,
    },
    fila: {
        flexDirection: 'row',
    },
});
