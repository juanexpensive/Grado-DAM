import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { ResultadoJuego } from "../../domain/entities/ResultadoJuego";
import { IUseCaseJuego } from "../../domain/interfaces/use-cases/IUseCaseJuego";
import { JuegoViewModel } from "../viewmodels/JuegoViewModel";

export const JuegoScreen: React.FC = () => {
  const [personas, setPersonas] = useState<any[]>([]);
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const [asignaciones, setAsignaciones] = useState<{ [key: number]: number }>(
    {},
  );
  const [resultado, setResultado] = useState<ResultadoJuego | null>(null);
  const [loading, setLoading] = useState(true);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const useCase = container.get<IUseCaseJuego>(TYPES.IUseCaseJuego);
  const viewModel = new JuegoViewModel(useCase);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const datos = await viewModel.cargarDatosJuego();

      setPersonas(datos.personas);
      setDepartamentos(datos.departamentos);

      const asignacionesIniciales: { [key: number]: number } = {};
      datos.personas.forEach((p) => {
        asignacionesIniciales[p.ID] = 0;
      });
      setAsignaciones(asignacionesIniciales);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los datos del juego");
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAsignacion = (personaId: number, departamentoId: number) => {
    setAsignaciones((prev) => ({
      ...prev,
      [personaId]: departamentoId,
    }));
  };

  const validarYComprobar = async () => {
    const todasAsignadas = personas.every((p) => asignaciones[p.ID] > 0);
    if (!todasAsignadas) {
      setMostrarAlerta(true);
      return;
    }

    try {
      const resultado = await viewModel.comprobarRespuestas(asignaciones);
      console.log("EL RESULTADO ES:");
      console.log(resultado);
      setResultado(resultado);
    } catch (error) {
      Alert.alert("Error", "No se pudo comprobar las respuestas");
      console.error("Error al comprobar:", error);
    }
  };

  const reiniciarJuego = () => {
    const asignacionesIniciales: { [key: number]: number } = {};
    personas.forEach((p) => {
      asignacionesIniciales[p.ID] = 0;
    });
    setAsignaciones(asignacionesIniciales);
    setResultado(null);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando juego...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎯 Adivina los Departamentos</Text>
        <Text style={styles.subtitle}>
          Asigna el departamento correcto a cada empleado
        </Text>
      </View>

      {/* --- Pista de colores --- */}
      <View style={styles.pistaContainer}>
        <Text style={styles.pistaTitle}>
          💡 Pista: Colores de los Departamentos
        </Text>
        <View style={styles.coloresContainer}>
          {departamentos.map((dept) => (
            <View key={dept.ID} style={styles.colorItem}>
              <View
                style={[styles.colorBox, { backgroundColor: dept.Color }]}
              />
              <Text style={styles.colorText}>{dept.Nombre}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* --- Resultado --- */}
      {resultado && (
        <View
          style={[
            styles.resultadoContainer,
            resultado.gano ? styles.resultadoGanar : styles.resultadoPerder,
          ]}
        >
          <Text style={styles.resultadoIcon}>
            {resultado.gano ? "🎉" : "💪"}
          </Text>
          {resultado.gano ? (
            <>
              <Text style={styles.resultadoTitle}>
                ¡FELICIDADES! ¡HAS GANADO! 🏆
              </Text>
              <Text style={styles.resultadoText}>
                Has acertado todos los departamentos correctamente
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.resultadoTitle}>
                Has acertado {resultado.aciertos} de {resultado.total}{" "}
                departamentos
              </Text>
              <Text style={styles.resultadoText}>¡Sigue intentándolo!</Text>
            </>
          )}
          <TouchableOpacity
            style={styles.btnReiniciar}
            onPress={reiniciarJuego}
          >
            <Text style={styles.btnReiniciarText}>Jugar de nuevo</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* --- Lista de personas --- */}
      <View style={styles.listaContainer}>
        {personas.map((persona) => (
          <View
            key={persona.ID}
            style={[
              styles.personaCard,
              { backgroundColor: persona.ColorDepartamento },
            ]}
          >
            <View style={styles.personaInfo}>
              <Text style={styles.personaNombre}>{persona.Nombre}</Text>
              <Text style={styles.personaApellido}>{persona.Apellidos}</Text>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={asignaciones[persona.ID]}
                onValueChange={(value) => handleAsignacion(persona.ID, value)}
                style={styles.picker}
              >
                <Picker.Item label="-- Selecciona --" value={0} />
                {departamentos.map((dept) => (
                  <Picker.Item
                    key={dept.ID}
                    label={dept.Nombre}
                    value={dept.ID}
                  />
                ))}
              </Picker>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.btnComprobar} onPress={validarYComprobar}>
        <Text style={styles.btnComprobarText}>Comprobar Respuestas</Text>
      </TouchableOpacity>

      {/* --- Modal de alerta --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={mostrarAlerta}
        onRequestClose={() => setMostrarAlerta(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setMostrarAlerta(false)}
          />
          <View style={styles.modalContent}>
            <Text style={styles.modalIcon}>⚠️</Text>
            <Text style={styles.modalText}>
              Por favor, selecciona un departamento para cada persona antes de
              comprobar
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setMostrarAlerta(false)}
            >
              <Text style={styles.modalButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// --- Mantener los estilos que ya tenías ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { backgroundColor: "#667eea", padding: 20, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", color: "white", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "white", textAlign: "center" },
  pistaContainer: {
    backgroundColor: "white",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pistaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  coloresContainer: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  colorItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  colorText: { fontSize: 14, fontWeight: "600", color: "#333" },
  resultadoContainer: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  resultadoGanar: { backgroundColor: "#11998e" },
  resultadoPerder: { backgroundColor: "#ee0979" },
  resultadoIcon: { fontSize: 48, marginBottom: 10 },
  resultadoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  resultadoText: { fontSize: 16, color: "white", textAlign: "center" },
  btnReiniciar: {
    marginTop: 15,
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  btnReiniciarText: { fontSize: 16, fontWeight: "bold", color: "#667eea" },
  listaContainer: { padding: 15 },
  personaCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  personaInfo: { marginBottom: 10 },
  personaNombre: { fontSize: 18, fontWeight: "bold", color: "#333" },
  personaApellido: { fontSize: 16, color: "#555" },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  picker: { height: 50 },
  btnComprobar: {
    backgroundColor: "#667eea",
    margin: 15,
    marginBottom: 30,
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  btnComprobarText: { color: "white", fontSize: 18, fontWeight: "bold" },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#667eea",
  },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    maxWidth: "85%",
  },
  modalIcon: { fontSize: 48, marginBottom: 15 },
  modalText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: "#667eea",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
  },
  modalButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
