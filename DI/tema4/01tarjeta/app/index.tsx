import { Text, View, StyleSheet, Image } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d8d8d8ff",
      }}
    >
      <View style={styles.card}>
        <Image style={styles.imgLogo} source={require("../assets/images/imagenLogo.jpg")}></Image>
        <Text style={styles.userName}>Fernando Galiana</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 180,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#F5F5F0",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imgLogo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    margin: 10,
  },
  userName: {
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: 20
  }
});
