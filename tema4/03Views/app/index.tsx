import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text>HEADER</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.left}>
          <Text>LEFT</Text>
        </View>
        <View style={styles.center}>
          <Text>BODY</Text>
        </View>
        <View style={styles.right}>
          <Text>RIGHT</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text>FOOTER</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page:{
    flex: 1,
    justifyContent: "space-between"
  },
  header: {
    height: "5%",
    backgroundColor: "#b83a55ff",
    justifyContent: "center",
    alignItems: "center",
  },
  body:{
    height: "90%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row"
  },
  center:{
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#b6b6b6ff"
  },
  left:{
    height: "100%",
    width: "10%",
    backgroundColor: "#55b662ff"
  },
  right:{
    height: "100%",
    width: "10%",
    backgroundColor: "#5b55b6ff"
  },
  footer:{
    height: "5%",
    backgroundColor: "#923da3ff",
    justifyContent: "center",
    alignItems: "center",
  }
})
