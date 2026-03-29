import { View, Alert } from "react-native";
import { PressableCustom } from "./components/PressableCustom"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PressableCustom text="Prueba"/>
      <PressableCustom text="Mapher Game"/>
      <PressableCustom text="En"/>
      <PressableCustom text="Play Store"/>
    </View>
  );
}
