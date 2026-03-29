import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
    return (
        <Drawer screenOptions={{ headerShown : true}}>
            <Drawer.Screen 
            name = "home" 
            options={{title : "Home",
              drawerIcon: ({color , size}) => (
                <Ionicons 
                name = "home-outline" 
                size={size} 
                color={color} />
              ),
            }} />
            <Drawer.Screen 
              name = "persona" 
              options = {{title : "Persona",
                drawerIcon: ({color , size}) => (
                <Ionicons name = "person-outline" 
                size={size} 
                color={color} />
              ),
            }} />
            <Drawer.Screen 
            name = "departamento" 
            options = {{title : "Departamento",
              drawerIcon: ({color , size}) => (
                <Ionicons 
                name = "business-outline" 
                size={size} 
                color={color} />
              ),
            }} />
        </Drawer>
    );
}