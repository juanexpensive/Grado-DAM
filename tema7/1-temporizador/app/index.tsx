import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Boton } from "@/components/Boton";

  const Timer = () => {
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    //esta llegando a numeros negativos ARREGLAR
    if (isRunning && secondsLeft > 0) 
    return;

    const interval = setInterval(() => {
      //prev es el ultimo valor
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  return (

    <View>
        <Text style={styles.timerText}>
          {secondsLeft}
        </Text>
        <Boton onPress={() => setSecondsLeft(60)} title="reiniciar"/>
        <Boton onPress={() => setIsRunning(!isRunning)} title = {isRunning ? "Play" : "Pause"}   /> 
    </View>
    );
  }
  export default function Index() {
    return <Timer/>
}

const styles = StyleSheet.create({
    // Estilo para el contenedor principal
    container: {
        flex: 1, // Ocupa toda el área disponible
        justifyContent: 'center', // Centra los elementos verticalmente
        alignItems: 'center', // Centra los elementos horizontalmente
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    // Estilo para el texto del temporizador: Grande y Negrita
    timerText: {
        fontSize: 90, // **Grande**
        fontWeight: 'bold', // **Negrita**
        marginVertical: 40, 
        color: '#333',
        alignSelf: "center",
    },
});