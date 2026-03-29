import { Text, View, Button } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hola Mundo! Soy Jose Manuel</Text>
      <Button title="Pulsame" onPress={pulsar}/>
    </View>
  );
}

function pulsar(){
  alert("Boton presionado")
}
