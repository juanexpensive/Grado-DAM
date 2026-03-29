import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReload = () => {
    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleReload}>
        <MaterialIcons name="refresh" size={30} color="white" />
      </Pressable>

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      {success && !loading && <Text style={styles.successText}>Cargado con éxito</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4c566163",
    padding: 15,
    borderRadius: 10,
  },
  successText: {
    marginTop: 20,
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
});
