import { Tabs } from "expo-router";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";

export default function TabsLayout() {
    return (
    <Tabs
    screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
            backgroundColor: "#121212",
            borderTopColor: "#222",
            height: 60,
        }
    }}
    >
<Tabs.Screen
name = "index"
options={{
    tabBarIcon: ({color, size}) => (
        <Ionicons name = "home-outline" size={size} color={color} /> 
    ),
}}
/>
<Tabs.Screen
name = "search"
options = {{
    title: "Buscar",
    tabBarIcon: ({color, size}) => (
        <Ionicons name = "search-outline" size={size} color= {color} />
    ),
}}
    />
    <Tabs.Screen
    name = "profile"
    options = {{
        title: "Buscar",
        tabBarIcon: ({color, size}) => (
            <Ionicons name = "person-outline" size={size} color={color} />
        ),
    }}
    />
    </Tabs>
);
}