import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TarjetaProducto } from '../components/TarjetaProducto';
import { Carrito } from '../components/Carrito';

export default function App() {
  const [totalProductos, setTotalProductos] = useState(0);

  const productos = [
    {
      name: 'Producto 1',
      price: 29.99,
      image: 'https://billiken.lat/wp-content/uploads/2024/03/reloj-astronomico.jpg'
    },
    {
      name: 'Producto 2',
      price: 49.99,
      image:"https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/201608/11/00107693501251____1__1200x1200.jpg"
    },
    {
      name: 'Producto 3',
      price: 29.99,
      image: 'https://billiken.lat/wp-content/uploads/2024/03/reloj-astronomico.jpg'
    },
    {
      name: 'Producto 4',
      price: 49.99,
      image:"https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/201608/11/00107693501251____1__1200x1200.jpg"
    },
  ];

  const handleAddToCart = () => {
    setTotalProductos(prev => prev + 1);
  }

  return (
    <View style={styles.container}>
      <Carrito cantidad={totalProductos} />

      <FlatList
        data={productos}
        renderItem={({ item }) => (
          <TarjetaProducto
            name={item.name}
            price={item.price}
            image={item.image}
            onAddToCart={handleAddToCart}
          />
        )}
        numColumns={2}
        keyExtractor={(index) => index.toString()}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
});
