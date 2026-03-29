import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { container } from "../core/container";
import { TYPES } from "../core/types";
import { Persona } from "../models/entities/Persona";
import { PeopleListVM } from "../viewmodels/PeopleListVM";

export default function PeopleList() {
  const viewModel = container.get<PeopleListVM>(TYPES.IndexVM);

  const renderItem = ({ item }: { item: Persona }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.nombre} {item.apellido}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>👥 Listado de Personas</Text>

      <FlatList
        data={viewModel.personasList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.textoVacio}>No hay personas registradas</Text>
          </View>
        )}
        contentContainerStyle={
          viewModel.personasList.length === 0 ? styles.centeredList : undefined
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF2F8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1A5276",
    marginBottom: 25,
    textAlign: "center",
    letterSpacing: 0.7,
  },
  item: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
    width: "90%",
    alignSelf: "center",
  },
  itemText: {
    fontSize: 18,
    color: "#2C3E50",
    textAlign: "center",
  },
  separator: {
    height: 16,
  },
  textoVacio: {
    fontSize: 18,
    color: "#7F8C8D",
    textAlign: "center",
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  centeredList: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
