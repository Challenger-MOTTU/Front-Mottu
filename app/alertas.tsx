import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from './contexts/ThemeContext';

const alertasMock = [
  { id: '1', placa: 'DEF3344', tipo: 'Avaria na lateral direita', data: '16/05/2025' },
  { id: '2', placa: 'GHI7788', tipo: 'Necessita manutenção urgente', data: '15/05/2025' },
  { id: '3', placa: 'XYZ5678', tipo: 'Placa não legível', data: '14/05/2025' },
];

export default function Alertas() {
  const router = useRouter();
  const { temaEscuro } = useTheme();

  return (
    <LinearGradient
      colors={temaEscuro ? ['#0f0f0f', '#1c1c1c'] : ['#e0f0ff', '#ffffff']}
      style={styles.container}
    >
      <Text style={[styles.title, { color: temaEscuro ? '#ff6b6b' : '#D7263D' }]}>
        🚨 Alertas e Avarias
      </Text>

      <FlatList
        data={alertasMock}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff' }]}>
            <Text style={[styles.placa, { color: temaEscuro ? '#fff' : '#000' }]}>
              🏍️ {item.placa}
            </Text>
            <Text style={[styles.tipo, { color: temaEscuro ? '#ff6b6b' : '#D7263D' }]}>
              ⚠️ {item.tipo}
            </Text>
            <Text style={[styles.data, { color: temaEscuro ? '#aaa' : '#666' }]}>
              {item.data}
            </Text>
          </View>
        )}
      />

      <Pressable onPress={() => router.back()}>
        <Text style={[styles.voltar, { color: temaEscuro ? '#ccc' : '#007AFF' }]}>
          ← Voltar para Home
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
    marginTop: 16,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});
