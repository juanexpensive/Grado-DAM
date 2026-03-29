import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '🎯 Juego',
        }}
      />
      <Tabs.Screen
        name="personas"
        options={{
          title: '👥 Personas',
        }}
      />
      <Tabs.Screen
        name="departamentos"
        options={{
          title: '🏢 Departamentos',
        }}
      />
    </Tabs>
  );
}