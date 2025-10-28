import { Stack } from 'expo-router';
import { useTheme } from '@/components/ThemeContext';
import Colors from '@/constants/Colors';

export default function StackLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[theme].background,
        },
        headerTintColor: Colors[theme].text,
        contentStyle: {
          backgroundColor: Colors[theme].background,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="two" options={{ title: 'Nova mensagem' }} />
    </Stack>
  );
}