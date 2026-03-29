import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>RRHH</Text>
        <Text style={styles.headerSubtitle}>Gestión de Recursos Humanos</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push("/screens/personas/ListadoPersonasScreen")
            }
          >
            <Text style={styles.cardText}>👥 Personal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push("/screens/departamentos/ListadoDepartamentos")
            }
          >
            <Text style={styles.cardText}>🏢 Departamentos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Sistema RRHH v1.0</Text>
          <Text style={styles.footerSubtext}>2025 • Gestión Integral</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
    backgroundColor: "#667eea",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  cardsContainer: {
    gap: 12,
  },
  card: {
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  cardText: {
    fontSize: 18,
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#888",
  },
  footerSubtext: {
    fontSize: 12,
    color: "#aaa",
  },
});
