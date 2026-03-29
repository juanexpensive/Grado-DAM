import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { container } from '../core/Container';
import { TYPES } from '../core/types';
import { PersonaConNombreDeDepartamentoDTO } from '../domain/dtos/PersonaConNombreDeDepartamentoDTO';
import { IUseCasePersonas } from '../domain/interfaces/use-cases/IUseCasePersonas';
import { PersonasViewModel } from '../presentation/viewmodels/PersonasViewModel';
import { router } from 'expo-router';

export const PersonasScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [personas, setPersonas] = useState<PersonaConNombreDeDepartamentoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [seleccionada, setSeleccionada] =
    useState<PersonaConNombreDeDepartamentoDTO | null>(null);

  const viewModelRef = useRef<PersonasViewModel | null>(null);

  if (!viewModelRef.current) {
    const useCase = container.get<IUseCasePersonas>(TYPES.IUseCasePersonas);
    viewModelRef.current = new PersonasViewModel(useCase);
  }

  const vm = viewModelRef.current;

  useEffect(() => {
    cargarPersonas();
  }, []);

  const cargarPersonas = async () => {
    try {
      const data = await vm.cargarPersonas();
      setPersonas(data);
    } catch (error) {
      console.error('Error al cargar personas:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPersona = ({ item }: { item: PersonaConNombreDeDepartamentoDTO }) => (
    <Pressable
      onPress={() => {
        setSeleccionada(item);
        vm.personaSeleccionada = Object.assign({}, item); // selecciona persona en el VM


        //usa router pushh
        //
        //navigation.navigate('EditarInsertarPersona'); // ir a editar
      }}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.85 }
      ]}
    >
      <View style={styles.cardContent}>
        {/* TEXTOS */}
        <View style={styles.textContainer}>
          <Text style={styles.nombre}>
            {item.Nombre} {item.Apellidos}
          </Text>
          <Text style={styles.info}>📅 {new Date(item.FechaNacimiento).toLocaleDateString()}</Text>
          <Text style={styles.info}>📍 {item.Direccion}</Text>
          <Text style={styles.info}>📞 {item.Telefono}</Text>
          <Text style={styles.departamento}>🏢 {item.NombreDepartamento}</Text>
        </View>

        {/* IMAGEN */}
        <Image
          style={styles.image}
          source={{ uri: item.Foto }}
          contentFit="cover"
          transition={300}
        />
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Cargando personas...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Personas</Text>
        {seleccionada && (
          <Text style={styles.subTitle}>
            Seleccionada: {seleccionada.Nombre} {seleccionada.Apellidos}
          </Text>
        )}
      </View>

      <FlatList
        data={personas}
        renderItem={renderPersona}
        keyExtractor={(item) => item.ID.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Botón flotante para crear persona nueva */}
      <Pressable
        style={styles.floatingButton}
        onPress={() => {
          // nueva persona vacía
          vm.personaSeleccionada = new (vm.personaSeleccionada.constructor as any)(
            0, '', '', '', '', '', '', 0
          );
          //navigation.navigate('EditarInsertarPersona');
          router
        }}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  header: {
    backgroundColor: '#667eea',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  subTitle: {
    marginTop: 6,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },

  listContent: { padding: 15 },

  card: {
    backgroundColor: 'white',
    borderRadius: 14,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  cardContent: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },

  textContainer: { flex: 1, paddingRight: 10 },

  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#eee',
  },

  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  info: {
    fontSize: 13,
    color: '#666',
  },

  departamento: {
    fontSize: 14,
    fontWeight: '700',
    color: '#667eea',
    marginTop: 6,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#667eea',
  },

  floatingButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#667eea',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  floatingButtonText: { fontSize: 32, color: 'white', fontWeight: 'bold' },
});
