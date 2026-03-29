import { Pressable, Text, StyleSheet } from "react-native";

type PressableProps = {
  text: string;
};

export function PressableCustom({ text }: PressableProps) {
  return (
    <Pressable style={styles.pressable}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    padding: 10,
    borderBottomWidth: 1,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#3a3a3a",
    margin: 3,
  },
  text: {
    fontSize: 17,
    color: "#e4e4e4",
  },
});
