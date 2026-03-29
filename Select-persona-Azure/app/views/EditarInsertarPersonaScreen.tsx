import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';
import { container } from '../core/Container';
import { TYPES } from '../core/types';
import { Persona } from '../domain/entities/Persona';
import { PersonasViewModel } from '../presentation/viewmodels/PersonasViewModel';

export const EditarInsertarPersonaScreen = observer(({ navigation }: any) => {
  const vmRef = useRef<PersonasViewModel | null>(null);
  if (!vmRef.current) {
    vmRef.current = container.get<PersonasViewModel>(TYPES.PersonasViewModel);
  }
  const vm = vmRef.current;

  const [persona, setPersona] = useState<Persona>({ ...vm.personaSeleccionada });

  useEffect(() => {
    setPersona({ ...vm.personaSeleccionada });
  }, [vm.personaSeleccionada]);

  const handleChange = (campo: keyof Persona, valor: string | number) => {
    setPersona({ ...persona, [campo]: valor });
  };

  const guardar = async () => {
    try {
      if (persona.ID && persona.ID > 0) {
        await vm.actualizarPersona(persona.ID, persona);
        Alert.alert('Éxito', 'Persona actualizada');
      } else {
        await vm.crearPersona(persona);
        Alert.alert('Éxito', 'Persona creada');
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo guardar la persona');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          {persona.ID > 0 ? 'Editar Persona' : 'Nueva Persona'}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={persona.Nombre}
          onChangeText={(t) => handleChange('Nombre', t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={persona.Apellidos}
          onChangeText={(t) => handleChange('Apellidos', t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Dirección"
          value={persona.Direccion}
          onChangeText={(t) => handleChange('Direccion', t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          keyboardType="phone-pad"
          value={persona.Telefono}
          onChangeText={(t) => handleChange('Telefono', t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha Nacimiento (yyyy-mm-dd)"
          value={persona.FechaNacimiento}
          onChangeText={(t) => handleChange('FechaNacimiento', t)}
        />
        <TextInput
          style={styles.input}
          placeholder="URL Foto"
          value={persona.Foto}
          onChangeText={(t) => handleChange('Foto', t)}
        />
        <TextInput
          style={styles.input}
          placeholder="ID Departamento"
          keyboardType="number-pad"
          value={persona.IDDepartamento?.toString() || ''}
          onChangeText={(t) => handleChange('IDDepartamento', parseInt(t))}
        />

        <Pressable style={styles.button} onPress={guardar}>
          <Text style={styles.buttonText}>
            {persona.ID > 0 ? 'Guardar cambios' : 'Crear persona'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#667eea' },
  input: { backgroundColor: 'white', borderRadius: 10, padding: 14, marginBottom: 12, fontSize: 16, elevation: 2 },
  button: { backgroundColor: '#667eea', padding: 16, borderRadius: 12, marginTop: 20 },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
});
