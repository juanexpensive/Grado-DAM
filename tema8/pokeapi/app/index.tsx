// src/app/index.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, SafeAreaView } from 'react-native';
import { container } from '../app/core/container';
import { TYPES } from '../app/core/types';
import { Pokemon } from '../app/domain/entities/pokemon';
import { PokemonVM } from '../app/ui/viewmodels/PokemonVM';

export default function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  
  // Obtenemos la instancia del VM ya configurada
  const vm = container.get<PokemonVM>(TYPES.PokemonVM);

  const loadData = async () => {
    const data = await vm.getListaPokemon();
    setPokemons(data); // Sobrescribe para mostrar solo los 20 actuales
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Pokedex Clean Arch</Text>
      
      <Button title="Cargar siguientes 20" onPress={loadData} color="#e91e63" />

      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, textAlign: 'center', marginVertical: 20, fontWeight: 'bold' },
  card: { padding: 15, backgroundColor: '#f9f9f9', marginBottom: 8, borderRadius: 5 },
  name: { fontSize: 18, textTransform: 'capitalize' }
});