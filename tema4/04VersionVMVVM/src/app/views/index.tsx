import { Text, View, FlatList, StyleSheet, Pressable, Alert } from "react-native";
import { IndexVM } from "../viewmodels/IndexVM";

/**
 * @constant indexVM
 * @description Instancia del ViewModel. Se inicializa una sola vez fuera del componente
 * para gestionar el estado de la lista y la lógica de selección.
 */
const indexVM = new IndexVM();

/**
 * @function Index
 * @description Componente de vista principal que muestra una lista de personas utilizando FlatList.
 * Actúa como la "View" en el patrón MVVM.
 * @returns {JSX.Element} Un componente FlatList de React Native.
 */
export function Index() {
  // El componente se renderiza basándose en los datos del ViewModel.
  return (
    /**
     * @component FlatList
     * @description Componente optimizado para renderizar listas grandes de datos.
     * Propiedades clave:
     * - style: Estilos aplicados al contenedor de la lista.
     * - data: La fuente de datos, obtenida del getter 'Personas' del ViewModel.
     * - keyExtractor: Función que extrae una clave única de cada ítem (requerido para el rendimiento).
     */
    <FlatList
      style={styles.flat}
      data={indexVM.Personas}
      keyExtractor={(item) => item.id.toString()}
      /**
       * @function renderItem
       * @description Función que define cómo debe renderizarse cada elemento de la lista.
       * @param {object} item - El objeto Persona actual a renderizar.
       */
      renderItem={({ item }) => (
        /**
         * @component Pressable
         * @description Un contenedor que detecta interacciones de pulsación.
         * @prop onPress - Al ser presionado, se llama al setter 'PersonaSeleccionada' del ViewModel,
         * pasando el ítem actual. Esto actualiza el estado lógico en el VM y dispara la alerta.
         */
        <Pressable onPress={() => (indexVM.PersonaSeleccionada = item)}>
          <View style={styles.item}>
            <Text style={styles.text}>{item.nombre} {item.apellido}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

//#region styles
/**
 * @constant styles
 * @description Colección de estilos definidos con StyleSheet.create para el componente.
 */
const styles = StyleSheet.create({
  flat: {
    backgroundColor: "#242424ff"
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: "#3a3a3aff",
    margin: 3
  },
  text: {
    fontSize: 17,
    color: "#aaaaaaff"
  }
})
//#endregion