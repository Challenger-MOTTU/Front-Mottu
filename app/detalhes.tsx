import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';

export default function Detalhes() {
  const router = useRouter();
  const { temaEscuro } = useTheme();

  return (
    <LinearGradient
      colors={temaEscuro ? ['#0f0f0f', '#1c1c1c'] : ['#e0f0ff', '#ffffff']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: temaEscuro ? '#fff' : '#007AFF' }]}>
          📄 Tela de Detalhes
        </Text>
        <Text style={[styles.texto, { color: temaEscuro ? '#ccc' : '#333' }]}>
          Aqui você poderá visualizar os detalhes completos de uma moto selecionada.
        </Text>

        <Pressable onPress={() => router.back()}>
          <Text style={[styles.voltar, { color: temaEscuro ? '#aaa' : '#007AFF' }]}>
            ← Voltar para Home
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
  },
  texto: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  voltar: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});
