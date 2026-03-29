import { Tabs } from "expo-router";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "green",
            tabBarInactiveTintColor: "gray",

        }}
        >
    <Tabs.Screen
    name = "index"
    options={{
        tabBarIcon: ({ color, size}) => (
            <Ionicons name = "home-outline" size = {size} color = {color} />
        ),
    }}
    />
    <Tabs.Screen
    name = "profile"
    options={{
        title: "Perfil",
        tabBarIcon: ({ color, size}) => (
            <Ionicons name = "person" size={size} color={color} />
        ),
    }}    
      />
      <Tabs.Screen
      name = "settings"
        options = {{
            title: "Configuración",
            tabBarIcon: ({color, size}) => (
                <Ionicons name = "settings-outline" size={size} color={color} />
            ),
        }}
        />
    </Tabs>
    );
}
