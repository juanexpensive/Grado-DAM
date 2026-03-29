import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { PersonaListItem } from "../../../Components/PeopleListItem";
import { PersonaUIModel } from "../../../UI/Models/PersonaUIModel";
import { PersonasViewModel } from "../../../UI/ViewModels/PersonasViewModel";

const ListadoPersonasScreen = observer(function ListadoPersonasScreen() {
  const viewModel = PersonasViewModel.getInstance();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    viewModel.loadPersonas();
  }, []);

  const handleAddPersona = () => {
    viewModel.selectPersona(null);
    router.push("/screens/personas/EditarInsertarPersonaScreen");
  };

  const handleEditPersona = (persona: PersonaUIModel) => {
    viewModel.selectPersona(persona);
    router.push("/screens/personas/EditarInsertarPersonaScreen");
  };

  const handleDeletePersona = (persona: PersonaUIModel) => {
    const confirmacion = window.confirm(
      `¿Está seguro que desea eliminar a ${persona.nombre} ${persona.apellidos}?`,
    );

    if (confirmacion) performDelete(persona.id);
  };

  const performDelete = async (id: number) => {
    try {
      await viewModel.deletePersona(id);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      window.alert(`Error: ${errorMessage}`);
    }
  };

  const filteredPersonas = viewModel.personas.filter((persona) => {
    const fullName = `${persona.nombre} ${persona.apellidos}`.toLowerCase();
    const departamento = persona.nombreDepartamento.toLowerCase();
    const telefono = persona.telefono.toLowerCase();
    const query = searchQuery.toLowerCase();
    return (
      fullName.includes(query) ||
      departamento.includes(query) ||
      telefono.includes(query)
    );
  });

  if (viewModel.isLoading && viewModel.personas.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1abc9c" />
        <Text style={styles.loadingText}>Cargando personal...</Text>
      </View>
    );
  }

  if (viewModel.error) {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{viewModel.error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => viewModel.loadPersonas()}
          >
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header con botón atrás */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Personal</Text>
          <Text style={styles.headerSubtitle}>
            {filteredPersonas.length} persona
            {filteredPersonas.length !== 1 ? "s" : ""}
            {searchQuery &&
              ` (filtrada${filteredPersonas.length !== 1 ? "s" : ""})`}
          </Text>
        </View>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre, departamento o teléfono..."
            placeholderTextColor="#ffffff99"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
            >
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Lista de personas */}
      <FlatList
        data={filteredPersonas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PersonaListItem
            persona={item}
            onPress={() => handleEditPersona(item)}
            onDelete={() => handleDeletePersona(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>{searchQuery ? "🔍" : "👥"}</Text>
            <Text style={styles.emptyText}>
              {searchQuery
                ? "No se encontraron personas"
                : "No hay personas registradas"}
            </Text>
            <Text style={styles.emptySubtext}>
              {searchQuery
                ? `No hay resultados para "${searchQuery}"`
                : "Toca el botón + para agregar la primera persona"}
            </Text>
          </View>
        }
      />

      {/* Botón flotante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddPersona}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
});

export default ListadoPersonasScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e0f7fa" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1abc9c",
  },
  backButton: { marginRight: 12 },
  backArrow: { fontSize: 28, color: "#fff", fontWeight: "bold" },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  headerSubtitle: { fontSize: 14, color: "#ffffffcc" },

  searchContainer: { padding: 16 },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 16, color: "#004d40" },
  clearButton: { padding: 4 },
  clearIcon: { fontSize: 18, color: "#004d40" },

  listContent: { padding: 16, paddingBottom: 100 },

  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 16, fontSize: 16, color: "#004d40" },
  errorContainer: { alignItems: "center", padding: 20 },
  errorIcon: { fontSize: 48, marginBottom: 16 },
  errorText: {
    color: "#d32f2f",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#1abc9c",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  retryText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  emptyContainer: { alignItems: "center", paddingVertical: 60 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004d40",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: { fontSize: 14, color: "#00695c", textAlign: "center" },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#1abc9c",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1abc9c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabText: { color: "#fff", fontSize: 36, fontWeight: "300" },
});
