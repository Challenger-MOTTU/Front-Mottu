import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function Camera() {
  const router = useRouter();
  const [identificando, setIdentificando] = useState(false);
  const [resultado, setResultado] = useState<string | null>(null);

  const simularIdentificacao = () => {
    setIdentificando(true);
    setResultado(null);

    setTimeout(() => {
      setIdentificando(false);
      setResultado('🏍️ Moto identificada: ABC1234\n📍 Zona A - Fila 1');
    }, 2500); // simula carregamento da IA
  };

  return (
    <LinearGradient colors={['#e0f0ff', '#ffffff']} style={styles.container}>
      <Text style={styles.title}>📸 Identificar Moto via Câmera</Text>

      <Pressable style={styles.button} onPress={simularIdentificacao} disabled={identificando}>
        <Text style={styles.buttonText}>Ativar Reconhecimento</Text>
      </Pressable>

      {identificando && (
        <View style={styles.resultado}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.status}>Identificando moto...</Text>
        </View>
      )}

      {resultado && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoTexto}>{resultado}</Text>
        </View>
      )}

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
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#007AFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  resultado: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
  },
  resultadoTexto: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  status: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  voltar: {
    marginTop: 24,
    fontFamily: 'Inter_400Regular',
    color: '#007AFF',
    fontSize: 14,
  },
});
