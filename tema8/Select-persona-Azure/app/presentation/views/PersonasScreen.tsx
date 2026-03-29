import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { PersonaConNombreDeDepartamentoDTO } from "../../domain/dtos/PersonaConNombreDeDepartamentoDTO";
import { IUseCasePersonas } from "../../domain/interfaces/use-cases/IUseCasePersonas";
import { PersonasViewModel } from "../viewmodels/PersonaViewModel";

export const PersonasScreen: React.FC = () => {
  const [personas, setPersonas] = useState<PersonaConNombreDeDepartamentoDTO[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  // Obtener UseCase desde el container de Inversify
  const useCase = container.get<IUseCasePersonas>(TYPES.IUseCasePersonas);
  const viewModel = new PersonasViewModel(useCase);

  useEffect(() => {
    cargarPersonas();
  }, []);

  const cargarPersonas = async () => {
    try {
      const data = await viewModel.cargarPersonas();
      setPersonas(data);
    } catch (error) {
      console.error("Error al cargar personas:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderPersona = ({
    item,
  }: {
    item: PersonaConNombreDeDepartamentoDTO;
  }) => (
    <View style={stylesPersonas.card}>
      <View style={stylesPersonas.cardContent}>
        <Text style={stylesPersonas.nombre}>
          {item.Nombre} {item.Apellidos}
        </Text>
        <Text style={stylesPersonas.info}>
          📅 {new Date(item.FechaNacimiento).toLocaleDateString()}
        </Text>
        <Text style={stylesPersonas.info}>📍 {item.Direccion}</Text>
        <Text style={stylesPersonas.info}>📞 {item.Telefono}</Text>
        <Text style={stylesPersonas.departamento}>
          🏢 {item.NombreDepartamento}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={stylesPersonas.loadingContainer}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={stylesPersonas.loadingText}>Cargando personas...</Text>
      </View>
    );
  }

  return (
    <View style={stylesPersonas.container}>
      <View style={stylesPersonas.header}>
        <Text style={stylesPersonas.title}>Lista de Personas</Text>
      </View>
      <FlatList
        data={personas}
        renderItem={renderPersona}
        keyExtractor={(item) => item.ID.toString()}
        contentContainerStyle={stylesPersonas.listContent}
      />
    </View>
  );
};

const stylesPersonas = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#667eea",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  listContent: {
    padding: 15,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 15,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  departamento: {
    fontSize: 16,
    fontWeight: "600",
    color: "#667eea",
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#667eea",
  },
});
