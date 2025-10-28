import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '@/components/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Pressable onPress={toggleTheme} style={{ marginRight: 15 }}>
      {({ pressed }) => (
        <FontAwesome
          name={theme === 'light' ? 'moon-o' : 'sun-o'}
          size={25}
          color={Colors[theme].text}
          style={{ opacity: pressed ? 0.5 : 1 }}
        />
      )}
    </Pressable>
  );
}

export default function Home() {
  const { theme } = useTheme();
  const backgroundColor = theme === 'dark' ? '#000' : '#fff';
  const textColor = theme === 'dark' ? '#fff' : '#000';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor }}>
      <Text style={{ color: textColor, marginBottom: 20, fontSize: 15, fontWeight: 'bold' }}>
        Bem-vindo à aplicação! Escolha uma visualização:
      </Text>

      <Link href="/(tabs)" asChild>
        <Pressable>
          <Text style={styles.options}>Tabs</Text>
        </Pressable>
      </Link>

      <View style={{ height: 10 }} />

      <Link href="/(stack)" asChild>
        <Pressable>
          <Text style={styles.options}>Stack</Text>
        </Pressable>
      </Link>

      <View style={{ height: 10 }} />

      <Link href="/(drawer)" asChild>
        <Pressable>
          <Text style={styles.options}>Drawer</Text>
        </Pressable>
      </Link>
      <Text style={{ marginTop: 20, color: textColor }}>Tema do aplicativo</Text>
      <ThemeToggleButton  />
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    color: '#fff',
  },
});