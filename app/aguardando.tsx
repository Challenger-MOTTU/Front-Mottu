import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const motosAguardandoMock = [
  { id: '1', placa: 'ABC1234', tempo: '15 min', status: 'Pronta para saída' },
  { id: '2', placa: 'XYZ5678', tempo: '8 min', status: 'Aguardando retirada' },
  { id: '3', placa: 'LMN9988', tempo: '3 min', status: 'Pronta para saída' },
];

export default function Aguardando() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#e0f0ff', '#ffffff']} style={styles.container}>
      <Text style={styles.title}>📦 Motos Aguardando Saída</Text>

      <FlatList
        data={motosAguardandoMock}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.placa}>🏍️ {item.placa}</Text>
            <Text style={styles.tempo}>🕒 Esperando há: {item.tempo}</Text>
            <Text style={styles.status}>✅ {item.status}</Text>
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
  tempo: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#333',
    marginBottom: 2,
  },
  status: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#28a745',
  },
  voltar: {
    marginTop: 16,
    textAlign: 'center',
    color: '#007AFF',
    fontFamily: 'Inter_400Regular',
  },
});
