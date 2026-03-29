import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function App() {
  const [texto, setTexto] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe algo aquí..."
        value={texto}
        onChangeText={(nuevoTexto) => setTexto(nuevoTexto)}
        multiline
      />
      <Text style={styles.textoMostrado}>
        {texto}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 10,
    width: 200,
    borderRadius: 5,
    marginBottom: 20,
  },
  textoMostrado: {
    fontSize: 18,
    color: "#000",
  },
});
