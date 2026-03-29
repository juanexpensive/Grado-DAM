import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useHomeViewModel } from "../Presentation/ViewModels/HomeViewModel";

export default function HomeScreen() {
  const { titulo, entrarAlJuego } = useHomeViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titulo}</Text>

      <TouchableOpacity style={styles.button} onPress={entrarAlJuego}>
        <Text style={styles.buttonText}>ENTRAR AL JUEGO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 60,
    color: "#1C1C1E",
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  button: {
    backgroundColor: "#34C759",
    paddingHorizontal: 48,
    paddingVertical: 18,
    borderRadius: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
