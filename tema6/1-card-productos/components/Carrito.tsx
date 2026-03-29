import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

type Props = {
  cantidad: number;
};

export function Carrito({ cantidad }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/107/107831.png' }}
        style={styles.icono}
      />
      {cantidad > 0 && (
        <View style={styles.circulo}>
          <Text style={styles.text}>{cantidad}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 100, 
  },
  icono: {
    width: 40,
    height: 40,
  },
  circulo: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
