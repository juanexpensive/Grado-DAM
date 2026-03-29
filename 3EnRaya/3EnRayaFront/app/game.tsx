import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useGameViewModel } from "../Presentation/ViewModels/GameViewModel";
import { TableroView } from "../Presentation/Components/TableroView";
import { MensajeView } from "../Presentation/Components/MensajeView";

export default function GameScreen() {
    const { partida, mover, reiniciar } = useGameViewModel();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>3 EN RAYA</Text>

            <MensajeView texto={partida.resultado || (partida.esperandoOponente ? "Esperando oponente..." : (partida.esMiTurno ? "Tu turno" : "Turno del oponente"))} />

            <TableroView partida={partida} onCeldaPress={mover} />

            {partida.miNumero > 0 && (
                <Text style={styles.info}>Eres el Jugador {partida.miNumero}</Text>
            )}

            {partida.resultado !== "" && (
                <TouchableOpacity style={styles.button} onPress={reiniciar}>
                    <Text style={styles.buttonText}>REINTENTAR</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8F9FA",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        marginBottom: 10,
        color: "#1C1C1E",
        letterSpacing: 2,
    },
    info: {
        marginTop: 30,
        fontSize: 16,
        fontWeight: "600",
        color: "#8E8E93",
    },
    button: {
        marginTop: 40,
        backgroundColor: "#007AFF",
        paddingHorizontal: 40,
        paddingVertical: 14,
        borderRadius: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
    }
});
