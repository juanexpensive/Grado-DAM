import { Text, View } from "react-native";
import { router, useRouter } from "expo-router";
import {Link} from "expo-router";
import { FormLogin } from "@/components/FormLogin";

export default function Index() {


const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormLogin
      
      onLogin={() => {router.push("/home")}}
      >
      </FormLogin>

    </View>
  );
}
