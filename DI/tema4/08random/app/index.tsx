import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [selectedColor, setSelectedColor] = useState<string>('red');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un color:</Text>
      <Picker
        selectedValue={selectedColor}
        onValueChange={(itemValue: string) => setSelectedColor(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Rojo" value="red" />
        <Picker.Item label="Verde" value="green" />
        <Picker.Item label="Azul" value="blue" />
      </Picker>
      <View style={[styles.colorBox, { backgroundColor: selectedColor }]} />
      <Text style={styles.selectedColorText}>Color seleccionado: {selectedColor}</Text>
    </View>
  );
}

//#region styles
/**
 * @constant styles
 * @description Colección de estilos definidos con StyleSheet.create para el componente.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    width: 200,
    height: 50,
    marginBottom: 20,
  },
  colorBox: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  selectedColorText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
//#endregion