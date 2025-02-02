import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#cddc39',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#cddc39',
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
      }}
    >
      <Tabs.Screen name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={"#808900"} size={24} />
          ),
        }} />
      <Tabs.Screen name="taskCreate"
        options={{
          title: 'Create New Task',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'add-outline' : 'add-circle-outline'} color={"#808900"} size={24} />
          ),
        }} />
      <Tabs.Screen name="taskList"
        options={{
          title: 'List all Tasks',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'list-outline' : 'list-circle-outline'} color={"#808900"} size={24} />
          ),
        }} />
    </Tabs>
  );
}