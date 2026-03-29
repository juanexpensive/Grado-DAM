import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import "reflect-metadata";
import "../Core/container";
import { DepartamentosViewModel } from "../UI/ViewModels/DepartamentosViewModel";
import { PersonasViewModel } from "../UI/ViewModels/PersonasViewModel";

const personasVM = PersonasViewModel.getInstance();
const departamentosVM = DepartamentosViewModel.getInstance();

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    initializeApp();
  }, []);

  function initializeApp() {
    console.log("Cargando departamentos...");

    departamentosVM
      .loadDepartamentos()
      .then(() => {
        console.log("Departamentos cargados:", departamentosVM.departamentos);
        console.log("Cargando personas...");
        return personasVM.loadPersonas();
      })
      .then(() => {
        console.log("Personas cargadas:", personasVM.personas);
        console.log("Aplicación inicializada correctamente");
        setLoading(false);
        router.replace("/screens/WelcomeScreen");
      })
      .catch((err) => {
        console.error("Error al inicializar la aplicación:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
        setLoading(false);
      });
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Error al inicializar</Text>
        <Text style={styles.errorDetail}>{error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando aplicación...</Text>
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 16,
    color: "#1a1a2e",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#dc3545",
    marginBottom: 8,
    textAlign: "center",
  },
  errorDetail: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
  },
});

export { departamentosVM, personasVM };

