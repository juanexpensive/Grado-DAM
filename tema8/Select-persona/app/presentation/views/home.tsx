import React, { useRef } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { Persona } from "../../domain/entities/Persona";
import { PeopleListVM } from "../viewmodels/PeopleListVM";
import { observer } from "mobx-react-lite";

// 

const PeopleList = observer(() => {
  // Crear una referencia que almacenará el VM
  const vmRef = useRef<PeopleListVM | null>(null);

  // Instanciar el VM solo si no existe
  if (vmRef.current === null) {
    vmRef.current = container.get<PeopleListVM>(TYPES.IndexVM);
  }

  // Acceder a la instancia persistente
  const viewModel = vmRef.current;

  const renderItem = ({ item }: { item: Persona }) => (
    <Pressable
      onPress={() => {
        viewModel.personaSeleccionada = item;
      }}
      // Aplicamos estilos condicionales y de press
      style={({ pressed }) => [
        stylesPixel.itemPixel,
        viewModel.personaSeleccionada.id === item.id && stylesPixel.itemSeleccionadoPixel,
        pressed && stylesPixel.itemPresionadoPixel, // Efecto al presionar
      ]}
    >
      <Text style={stylesPixel.itemTextPixel}>
        {item.nombre} {item.apellido}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={stylesPixel.containerPixel}>
      <View style={stylesPixel.headerPixel}>
        <Text style={stylesPixel.tituloPixel}> Lista de Personas</Text>
      </View>

      {/* Caja de estado estilo "Ventana de Diálogo" */}
      <View style={stylesPixel.dialogBoxPixel}>
        <Text style={stylesPixel.textoSeleccionPixel}>
           Elegido: {viewModel.personaSeleccionada.nombre} {viewModel.personaSeleccionada.apellido}
        </Text>
      </View>

      <FlatList
        data={viewModel.personasList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={stylesPixel.separatorPixel} />}
        ListEmptyComponent={() => (
          <View style={stylesPixel.emptyBoxPixel}>
            <Text style={stylesPixel.textoVacioPixel}>
              [Error: Archivo Corrupto] Lista vacía.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
});

// Estilos Comfy Pixel Art
const stylesPixel = StyleSheet.create({
  // ** Contenedor Principal (Fondo tipo Mapa/Papel Antiguo) **
  containerPixel: {
    flex: 1,
    backgroundColor: "#F0EAD6", // Beige claro (color de papel antiguo)
    paddingHorizontal: 16,
    paddingTop: 30,
  },

  // ** Encabezado (Borde duro) **
  headerPixel: {
    borderWidth: 4,
    borderColor: "#4A4A4A", // Gris oscuro (marco de ventana)
    backgroundColor: "#C0C0C0", // Gris claro
    marginBottom: 10,
    padding: 8,
  },
  tituloPixel: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000", // Negro puro
    fontFamily: "monospace", // Fuente retro/Pixelada
  },

  // ** Caja de Diálogo / Selección **
  dialogBoxPixel: {
    backgroundColor: "#D8C7A5", // Marrón claro silenciado
    padding: 8,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#5C4033", // Marrón oscuro (madera o marco)
    // Sombra dura para efecto 3D simple
    shadowColor: "#5C4033",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  textoSeleccionPixel: {
    fontSize: 14,
    color: "#1C1C1C", // Gris muy oscuro
    fontWeight: "500",
    fontFamily: "monospace",
  },

  // ** Ítem de la lista (Botón/Entrada de Menú) **
  itemPixel: {
    backgroundColor: "#A8A8A8", // Gris base
    padding: 12,
    borderRadius: 0, // Bordes cuadrados (Pixel Art)
    borderWidth: 2,
    borderColor: "#4A4A4A",
    marginBottom: 5,
    // Sombra para simular botón elevado
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  // ** Ítem Seleccionado (Color de resalte Comfy) **
  itemSeleccionadoPixel: {
    backgroundColor: "#FFB080", // Naranja cálido/coral (Resalte)
    borderColor: "#B85C33", // Marrón oscuro
    // Simular hundimiento
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#B85C33",
  },
  itemPresionadoPixel: {
    backgroundColor: "#E0E0E0", // Gris claro
    transform: [{ scale: 0.99 }],
    shadowOffset: { width: 0, height: 0 },
  },
  itemTextPixel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C1C1C", // Gris oscuro
    fontFamily: "monospace",
  },

  // ** Separador (Un simple espacio) **
  separatorPixel: {
    height: 8,
    backgroundColor: "transparent",
  },

  // ** Caja de Lista Vacía **
  emptyBoxPixel: {
    backgroundColor: "#FFEFD5", // Melocotón pálido
    padding: 15,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#8B4513", // Marrón Silla
  },
  textoVacioPixel: {
    textAlign: "center",
    fontSize: 14,
    color: "#8B0000", // Rojo oscuro (Error)
    fontWeight: "bold",
    fontFamily: "monospace",
  },
});

export default PeopleList;