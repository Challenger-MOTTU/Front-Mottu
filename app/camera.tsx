import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';

export default function Camera() {
  const router = useRouter();
  const { temaEscuro } = useTheme();

  const [identificando, setIdentificando] = useState(false);
  const [resultado, setResultado] = useState<string | null>(null);

  const simularIdentificacao = () => {
    setIdentificando(true);
    setResultado(null);

    setTimeout(() => {
      setIdentificando(false);
      setResultado('🏍️ Moto identificada: ABC1234\n📍 Zona A - Fila 1');
    }, 2500);
  };

  return (
    <LinearGradient
      colors={temaEscuro ? ['#0f0f0f', '#1c1c1c'] : ['#e0f0ff', '#ffffff']}
      style={styles.container}
    >
      <Text style={[styles.title, { color: temaEscuro ? '#fff' : '#007AFF' }]}>
        📸 Identificar Moto via Câmera
      </Text>

      <Pressable
        style={styles.button}
        onPress={simularIdentificacao}
        disabled={identificando}
      >
        <Text style={styles.buttonText}>Ativar Reconhecimento</Text>
      </Pressable>

      {identificando && (
        <View style={[styles.resultado, { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff' }]}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={[styles.status, { color: temaEscuro ? '#ccc' : '#666' }]}>
            Identificando moto...
          </Text>
        </View>
      )}

      {resultado && (
        <View style={[styles.resultado, { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff' }]}>
          <Text style={[styles.resultadoTexto, { color: temaEscuro ? '#fff' : '#000' }]}>
            {resultado}
          </Text>
        </View>
      )}

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
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
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
  },
  voltar: {
    marginTop: 24,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});
