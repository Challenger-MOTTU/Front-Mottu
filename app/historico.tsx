import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from './contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const movimentacoesMock = [
  { id: '1', placa: 'ABC1234', tipo: 'Entrada', data: '16/05/2025 09:22' },
  { id: '2', placa: 'XYZ5678', tipo: 'Saída', data: '16/05/2025 12:47' },
  { id: '3', placa: 'JTR8941', tipo: 'Entrada', data: '16/05/2025 13:15' },
  { id: '4', placa: 'QWE4412', tipo: 'Saída', data: '16/05/2025 14:55' },
];

export default function Historico() {
  const router = useRouter();
  const {t} = useTranslation();
  const { temaEscuro } = useTheme();

  return (
    <LinearGradient
      colors={temaEscuro ? ['#0f0f0f', '#1c1c1c'] : ['#e0f0ff', '#ffffff']}
      style={styles.container}
    >
      <Text style={[styles.title, { color: temaEscuro ? '#fff' : '#007AFF' }]}>
        {t("historicoScreen.title")}
      </Text>

      <FlatList
        data={movimentacoesMock}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff' }]}>
            <Text style={[styles.placa, { color: temaEscuro ? '#fff' : '#000' }]}>
              🏍️ {item.placa}
            </Text>
            <Text style={[styles.tipo, { color: temaEscuro ? '#4ea3ff' : '#007AFF' }]}>
              {item.tipo}
            </Text>
            <Text style={[styles.data, { color: temaEscuro ? '#aaa' : '#666' }]}>
              {item.data}
            </Text>
          </View>
        )}
      />

      <Pressable onPress={() => router.back()}>
        <Text style={[styles.voltar, { color: temaEscuro ? '#ccc' : '#007AFF' }]}>
          {t("backHome")}
        </Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  lista: {
    paddingBottom: 40,
  },
  item: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  placa: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  tipo: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 2,
  },
  data: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  voltar: {
    marginBottom: 160,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});
