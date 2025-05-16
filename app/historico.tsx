import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const movimentacoesMock = [
  { id: '1', placa: 'ABC1234', tipo: 'Entrada', data: '16/05/2025 09:22' },
  { id: '2', placa: 'XYZ5678', tipo: 'Saída', data: '16/05/2025 12:47' },
  { id: '3', placa: 'JTR8941', tipo: 'Entrada', data: '16/05/2025 13:15' },
  { id: '4', placa: 'QWE4412', tipo: 'Saída', data: '16/05/2025 14:55' },
];

export default function Historico() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#e0f0ff', '#ffffff']} style={styles.container}>
      <Text style={styles.title}>🧾 Histórico de Movimentações</Text>

      <FlatList
        data={movimentacoesMock}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.placa}>🏍️ {item.placa}</Text>
            <Text style={styles.tipo}>{item.tipo}</Text>
            <Text style={styles.data}>{item.data}</Text>
          </View>
        )}
      />

      <Pressable onPress={() => router.back()}>
        <Text style={styles.voltar}>← Voltar para Home</Text>
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
    color: '#007AFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  lista: {
    paddingBottom: 40,
  },
  item: {
    backgroundColor: '#fff',
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
    color: '#007AFF',
    marginBottom: 2,
  },
  data: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  voltar: {
    marginTop: 16,
    textAlign: 'center',
    color: '#007AFF',
    fontFamily: 'Inter_400Regular',
  },
});
