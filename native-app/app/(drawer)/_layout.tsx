import { Drawer } from 'expo-router/drawer';
import { useTheme } from '@/components/ThemeContext';
import Colors from '@/constants/Colors';

export default function DrawerLayout() {
  const { theme } = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[theme].background,
        },
        headerTintColor: Colors[theme].text,
        drawerStyle: {
          backgroundColor: Colors[theme].background,
        },
        drawerActiveTintColor: Colors[theme].tint,
        drawerInactiveTintColor: Colors[theme].text,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="message"
        options={{
          drawerLabel: 'Nova mensagem',
          title: 'Nova mensagem',
        }}
      />
    </Drawer>
  );
}