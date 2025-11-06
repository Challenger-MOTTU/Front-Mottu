import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from './contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Detalhes() {
  const router = useRouter();
  const {t} = useTranslation();
  const { temaEscuro } = useTheme();

  return (
    <LinearGradient
      colors={temaEscuro ? ['#0f0f0f', '#1c1c1c'] : ['#e0f0ff', '#ffffff']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: temaEscuro ? '#fff' : '#007AFF' }]}>
          {t("detalhesScreen.title")}
        </Text>
        <Text style={[styles.texto, { color: temaEscuro ? '#ccc' : '#333' }]}>
          {t("detalhesScreen.text")}
        </Text>

        <Pressable onPress={() => router.back()}>
          <Text style={[styles.voltar, { color: temaEscuro ? '#aaa' : '#007AFF' }]}>
            {t("backHome")}
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
