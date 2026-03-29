import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PersonaUIModel } from "../UI/Models/PersonaUIModel";

interface PersonaListItemProps {
  persona: PersonaUIModel;
  onPress: () => void;
  onDelete: () => void;
  deleteText?: string; // ✅ nuevo prop opcional
}

export function PersonaListItem({
  persona,
  onPress,
  onDelete,
  deleteText,
}: PersonaListItemProps) {
  const [imageError, setImageError] = useState(false);
  const shouldShowImage =
    persona.foto && persona.foto.trim() !== "" && !imageError;
  const fullName = `${persona.nombre} ${persona.apellidos}`;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.mainContent}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={[styles.avatar, { backgroundColor: persona.color }]}>
          {shouldShowImage ? (
            <>
              <Image
                source={{ uri: persona.foto }}
                style={styles.avatarImage}
                resizeMode="cover"
                onError={() => setImageError(true)}
              />
              <View style={styles.avatarOverlay} />
            </>
          ) : (
            <>
              <Text style={styles.initials}>{persona.initials}</Text>
              <View style={styles.avatarOverlay} />
            </>
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>{fullName}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📞</Text>
            <Text style={styles.info}>{persona.telefono}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🏢</Text>
            <Text style={styles.info}>
              {persona.nombreDepartamento || "Sin departamento"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Botón de eliminar con texto opcional */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteText}>{deleteText || "🗑️"}</Text>{" "}
        {/* usa el texto si lo pasan, sino emoji */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  mainContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    overflow: "hidden",
    position: "relative",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  avatarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  initials: { color: "#fff", fontSize: 20, fontWeight: "bold", zIndex: 1 },
  content: { flex: 1 },
  name: { fontSize: 17, fontWeight: "700", marginBottom: 6, color: "#1a1a2e" },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  infoIcon: { fontSize: 12, marginRight: 6 },
  info: { fontSize: 14, color: "#6c757d" },
  deleteButton: {
    width: 60,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6f61",
    borderRadius: 6,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
