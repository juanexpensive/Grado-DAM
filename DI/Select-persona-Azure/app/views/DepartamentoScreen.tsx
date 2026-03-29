import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { container } from '../core/Container';
import { TYPES } from '../core/types';
import { Departamento } from '../domain/entities/Departamento';
import { IUseCaseDepartamentos } from '../domain/interfaces/use-cases/IUseCaseDepartamentos';
import { DepartamentosViewModel } from '../presentation/viewmodels/DepartamentosViewModel';

export const DepartamentosScreen: React.FC = () => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState(true);

  // Obtener UseCase desde el container de Inversify
  const useCase = container.get<IUseCaseDepartamentos>(TYPES.IUseCaseDepartamentos);
  const viewModel = new DepartamentosViewModel(useCase);

  useEffect(() => {
    cargarDepartamentos();
  }, []);

  const cargarDepartamentos = async () => {
    try {
      const data = await viewModel.cargarDepartamentos();
      setDepartamentos(data);
    } catch (error) {
      console.error('Error al cargar departamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderDepartamento = ({ item }: { item: Departamento }) => (
    <View style={stylesDept.card}>
      <Text style={stylesDept.nombre}>{item.Nombre}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={stylesDept.loadingContainer}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={stylesDept.loadingText}>Cargando departamentos...</Text>
      </View>
    );
  }

  return (
    <View style={stylesDept.container}>
      <View style={stylesDept.header}>
        <Text style={stylesDept.title}>Lista de Departamentos</Text>
      </View>
      <FlatList
        data={departamentos}
        renderItem={renderDepartamento}
        keyExtractor={(item) => item.ID.toString()}
        contentContainerStyle={stylesDept.listContent}
      />
    </View>
  );
};

const stylesDept = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  listContent: {
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  id: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
});