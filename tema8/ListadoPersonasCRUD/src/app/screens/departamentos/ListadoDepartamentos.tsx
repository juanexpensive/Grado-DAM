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
import { DepartamentoUIModel } from "../../../UI/Models/DepartamentoUIModel";
import { DepartamentosViewModel } from "../../../UI/ViewModels/DepartamentosViewModel";

const ListadoDepartamentos = observer(function ListadoDepartamentos() {
  const viewModel = DepartamentosViewModel.getInstance();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    viewModel.loadDepartamentos();
  }, []);

  const handleAddDepartamento = () => {
    viewModel.selectDepartamento(null);
    router.push("/screens/departamentos/EditarInsertarDepartamento");
  };

  const handleEditDepartamento = (departamento: DepartamentoUIModel) => {
    viewModel.selectDepartamento(departamento);
    router.push("/screens/departamentos/EditarInsertarDepartamento");
  };

  const handleDeleteDepartamento = (departamento: DepartamentoUIModel) => {
    const confirmacion = window.confirm(
      `¿Está seguro que desea eliminar el departamento "${departamento.nombreDepartamento}"?`,
    );

    if (confirmacion) performDelete(departamento.idDepartamento);
  };

  const performDelete = async (id: number) => {
    try {
      await viewModel.deleteDepartamento(id);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      window.alert(`Error: ${errorMessage}`);
    }
  };

  const filteredDepartamentos = viewModel.departamentos.filter((dep) =>
    dep.nombreDepartamento.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (viewModel.isLoading && viewModel.departamentos.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1abc9c" />
        <Text style={styles.loadingText}>Cargando departamentos...</Text>
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
            onPress={() => viewModel.loadDepartamentos()}
          >
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const renderDepartamento = ({ item }: { item: DepartamentoUIModel }) => (
    <View style={styles.departamentoCard}>
      <TouchableOpacity
        style={styles.mainContent}
        onPress={() => handleEditDepartamento(item)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Text style={styles.icon}>{item.icon}</Text>
          <View style={styles.iconOverlay} />
        </View>
        <Text style={styles.departamentoNombre}>{item.nombreDepartamento}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteDepartamento(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/")}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Departamentos</Text>
          <Text style={styles.headerSubtitle}>
            {filteredDepartamentos.length} departamento
            {filteredDepartamentos.length !== 1 ? "s" : ""}
            {searchQuery &&
              ` (filtrado${filteredDepartamentos.length !== 1 ? "s" : ""})`}
          </Text>
        </View>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar departamento..."
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

      {/* Lista */}
      <FlatList
        data={filteredDepartamentos}
        keyExtractor={(item) => item.idDepartamento.toString()}
        renderItem={renderDepartamento}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>{searchQuery ? "🔍" : "🏢"}</Text>
            <Text style={styles.emptyText}>
              {searchQuery
                ? "No se encontraron departamentos"
                : "No hay departamentos registrados"}
            </Text>
            <Text style={styles.emptySubtext}>
              {searchQuery
                ? `No hay resultados para "${searchQuery}"`
                : "Toca el botón + para agregar uno"}
            </Text>
          </View>
        }
      />

      {/* Botón flotante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddDepartamento}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
});

export default ListadoDepartamentos;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e0f7fa" }, // fondo turquesa claro
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
  departamentoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  mainContent: { flex: 1, flexDirection: "row", alignItems: "center" },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    position: "relative",
    overflow: "hidden",
  },
  iconOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  icon: { fontSize: 28, zIndex: 1 },
  departamentoNombre: { fontSize: 17, fontWeight: "700", color: "#004d40" },
  deleteButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffcccc",
    borderRadius: 12,
  },
  deleteText: { fontSize: 20, color: "#d32f2f" },

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
