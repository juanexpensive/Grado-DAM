import { Text, View, FlatList, StyleSheet } from "react-native";

const usuarios = [
    { id: 1, nombre: 'Lucía', apellido: 'García' },
    { id: 2, nombre: 'Mateo', apellido: 'Rodríguez' },
    { id: 3, nombre: 'Carmen', apellido: 'Fernández' },
    { id: 4, nombre: 'Adrián', apellido: 'López' },
    { id: 5, nombre: 'Valeria', apellido: 'Martínez' },
    { id: 6, nombre: 'Sergio', apellido: 'Sánchez' },
    { id: 7, nombre: 'Irene', apellido: 'Pérez' },
    { id: 8, nombre: 'Hugo', apellido: 'González' },
    { id: 9, nombre: 'Nerea', apellido: 'Ruiz' },
    { id: 10, nombre: 'Daniel', apellido: 'Gómez' },
    { id: 11, nombre: 'Marina', apellido: 'Díaz' },
    { id: 12, nombre: 'Pablo', apellido: 'Moreno' },
    { id: 13, nombre: 'Aitana', apellido: 'Álvarez' },
    { id: 14, nombre: 'Leo', apellido: 'Romero' },
    { id: 15, nombre: 'Noa', apellido: 'Alonso' },
    { id: 16, nombre: 'Álvaro', apellido: 'Gutierrez' },
    { id: 17, nombre: 'Sofía', apellido: 'Navarro' },
    { id: 18, nombre: 'David', apellido: 'Torres' },
]

export default function Index() {
  return (
    <FlatList
    data={usuarios}
    keyExtractor= {(item) => item.id.toString()}
    renderItem = {({ item }) => (
      <View style={styles.item}>
        <Text style={styles.text}>{item.nombre} {item.apellido}</Text>
      </View>
    )}
    />
  )
}

//#region styles
const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#d3d3d3ff',
    alignItems: 'center',
  },
  text: {
    fontSize: 17
  }
})
//#endregion