import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from './contexts/ThemeContext';

const motosAguardandoMock = [
  { id: '1', placa: 'ABC1234', tempo: '15 min', status: 'Pronta para saída' },
  { id: '2', placa: 'XYZ5678', tempo: '8 min', status: 'Aguardando retirada' },
  { id: '3', placa: 'LMN9988', tempo: '3 min', status: 'Pronta para saída' },
];

export default function Aguardando() {
  const router = useRouter();
  const { temaEscuro } = useTheme();

  return (
    <LinearGradient
      colors={temaEscuro ? ['#0f0f0f', '#1c1c1c'] : ['#e0f0ff', '#ffffff']}
      style={styles.container}
    >
      <Text style={[styles.title, { color: temaEscuro ? '#fff' : '#007AFF' }]}>
        📦 Motos Aguardando Saída
      </Text>

      <FlatList
        data={motosAguardandoMock}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff' }]}>
            <Text style={[styles.placa, { color: temaEscuro ? '#fff' : '#000' }]}>
              🏍️ {item.placa}
            </Text>
            <Text style={[styles.tempo, { color: temaEscuro ? '#aaa' : '#333' }]}>
              🕒 Esperando há: {item.tempo}
            </Text>
            <Text style={[styles.status, { color: temaEscuro ? '#28d47c' : '#28a745' }]}>
              ✅ {item.status}
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
  tempo: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 2,
  },
  status: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  voltar: {
    marginBottom: 400,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});
