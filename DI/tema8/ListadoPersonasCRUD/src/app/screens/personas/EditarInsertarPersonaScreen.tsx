import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Persona } from "../../../Domain/Entities/Persona";
import { DepartamentosViewModel } from "../../../UI/ViewModels/DepartamentosViewModel";
import { PersonasViewModel } from "../../../UI/ViewModels/PersonasViewModel";

const EditarInsertarPersonaScreen = observer(
  function EditarInsertarPersonaScreen() {
    const router = useRouter();
    const personasVM = PersonasViewModel.getInstance();
    const departamentosVM = DepartamentosViewModel.getInstance();

    const personaSeleccionada = personasVM.personaSeleccionada;
    const isEditing = personaSeleccionada !== null;

    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [idDepartamento, setIdDepartamento] = useState(0);
    const [foto, setFoto] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
      if (isEditing && personaSeleccionada) {
        setNombre(personaSeleccionada.nombre);
        setApellidos(personaSeleccionada.apellidos);
        setTelefono(personaSeleccionada.telefono);
        setDireccion(personaSeleccionada.direccion);
        setIdDepartamento(personaSeleccionada.idDepartamento);
        setFoto(personaSeleccionada.foto || "");
      }
    }, [isEditing, personaSeleccionada]);

    const handleGuardar = async () => {
      if (!nombre || !apellidos || !telefono) {
        window.alert("Por favor complete los campos obligatorios");
        return;
      }
      if (idDepartamento === 0) {
        window.alert("Por favor seleccione un departamento");
        return;
      }

      setIsSaving(true);
      const persona = new Persona(
        isEditing ? personaSeleccionada!.id : 0,
        nombre,
        apellidos,
        isEditing ? personaSeleccionada!.fechaNac : new Date(),
        direccion,
        telefono,
        foto,
        idDepartamento,
      );

      try {
        if (isEditing) await personasVM.updatePersona(persona);
        else await personasVM.addPersona(persona);
        router.back();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";
        window.alert(
          `No se pudo ${isEditing ? "actualizar" : "agregar"} la persona: ${errorMessage}`,
        );
      } finally {
        setIsSaving(false);
      }
    };

    const initials =
      nombre && apellidos
        ? `${nombre.charAt(0)}${apellidos.charAt(0)}`.toUpperCase()
        : "??";

    return (
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>
              {isEditing ? "Editar Persona" : "Nueva Persona"}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isEditing
                ? "Modifica los datos de la persona"
                : "Completa la información"}
            </Text>
          </View>
        </View>

        <View style={styles.form}>
          {/* Vista previa de la foto */}
          {foto && (
            <View style={styles.photoPreview}>
              {!imageError ? (
                <Image
                  source={{ uri: foto }}
                  style={styles.previewImage}
                  resizeMode="cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <View
                  style={[
                    styles.previewImagePlaceholder,
                    { backgroundColor: "#1abc9c" },
                  ]}
                >
                  <Text style={styles.previewInitials}>{initials}</Text>
                </View>
              )}
            </View>
          )}

          {/* Inputs */}
          {[
            {
              label: "URL de la foto de perfil",
              value: foto,
              setter: setFoto,
              placeholder: "https://ejemplo.com/foto.jpg",
              optional: true,
            },
            {
              label: "Nombre",
              value: nombre,
              setter: setNombre,
              placeholder: "Ingrese el nombre",
              required: true,
            },
            {
              label: "Apellidos",
              value: apellidos,
              setter: setApellidos,
              placeholder: "Ingrese los apellidos",
              required: true,
            },
            {
              label: "Teléfono",
              value: telefono,
              setter: setTelefono,
              placeholder: "Ingrese el teléfono",
              keyboard: "phone-pad",
              required: true,
            },
            {
              label: "Dirección",
              value: direccion,
              setter: setDireccion,
              placeholder: "Ingrese la dirección",
              optional: true,
            },
          ].map((field, idx) => (
            <View key={idx} style={styles.inputGroup}>
              <Text style={styles.label}>
                {field.label}{" "}
                {field.required && <Text style={styles.required}>*</Text>}
              </Text>
              <TextInput
                style={styles.input}
                value={field.value}
                onChangeText={(text) => {
                  field.setter(text);
                  if (field.label === "URL de la foto de perfil")
                    setImageError(false);
                }}
                placeholder={field.placeholder}
                placeholderTextColor="#ffffff99"
                editable={!isSaving}
                keyboardType={field.keyboard as any}
                autoCapitalize="none"
              />
              {field.optional && <Text style={styles.hint}>Opcional</Text>}
            </View>
          ))}

          {/* Departamentos */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Departamento <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.picker}>
              {departamentosVM.departamentos.map((dep) => (
                <TouchableOpacity
                  key={dep.idDepartamento}
                  style={[
                    styles.pickerItem,
                    idDepartamento === dep.idDepartamento &&
                      styles.pickerItemSelected,
                  ]}
                  onPress={() =>
                    !isSaving && setIdDepartamento(dep.idDepartamento)
                  }
                  disabled={isSaving}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.pickerText,
                      idDepartamento === dep.idDepartamento &&
                        styles.pickerTextSelected,
                    ]}
                  >
                    {dep.icon} {dep.nombreDepartamento}
                  </Text>
                  {idDepartamento === dep.idDepartamento && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Botones */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.primaryButton,
                isSaving && styles.buttonDisabled,
              ]}
              onPress={handleGuardar}
              disabled={isSaving}
              activeOpacity={0.8}
            >
              {isSaving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.buttonIcon}>
                    {isEditing ? "💾" : "➕"}
                  </Text>
                  <Text style={styles.buttonText}>
                    {isEditing ? "Actualizar" : "Guardar"}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.back()}
              disabled={isSaving}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonIcon}>✕</Text>
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  },
);

export default EditarInsertarPersonaScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e0f7fa" }, // fondo turquesa claro
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 24,
    backgroundColor: "#1abc9c", // turquesa fuerte
  },
  backButton: { marginRight: 12, padding: 4 },
  backArrow: { fontSize: 28, color: "#fff", fontWeight: "bold" },
  headerTextContainer: { flex: 1 },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
  },
  headerSubtitle: { fontSize: 14, color: "#ffffffcc" },

  form: { padding: 20 },
  photoPreview: { alignItems: "center", marginBottom: 20 },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#1abc9c",
  },
  previewImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  previewInitials: { fontSize: 40, fontWeight: "bold", color: "#fff" },

  inputGroup: { marginBottom: 16 },
  label: { fontSize: 15, fontWeight: "600", marginBottom: 6, color: "#004d40" },
  required: { color: "#d32f2f" },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#004d40",
  },
  hint: { fontSize: 12, color: "#00695c", marginTop: 4 },

  picker: { gap: 8 },
  pickerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#ffffff",
    borderRadius: 12,
  },
  pickerItemSelected: { backgroundColor: "#1abc9c" },
  pickerText: { fontSize: 16, color: "#004d40", fontWeight: "500" },
  pickerTextSelected: { color: "#fff", fontWeight: "600" },
  checkmark: { fontSize: 18, color: "#fff", fontWeight: "bold" },

  buttonGroup: { marginTop: 16, gap: 12 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
  },
  primaryButton: { backgroundColor: "#1abc9c" }, // turquesa
  secondaryButton: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#004d40",
  },
  buttonDisabled: { opacity: 0.6 },
  buttonIcon: { fontSize: 18, marginRight: 8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  secondaryButtonText: { color: "#004d40" },
});
