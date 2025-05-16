import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function Buscar() {
  const router = useRouter();
  const [placa, setPlaca] = useState('');
  const [resultado, setResultado] = useState<null | { placa: string; condutor: string; zona: string }>(null);

  const handleBuscar = () => {
    if (!placa) {
      Alert.alert('Informe a placa da moto');
      return;
    }

    // Simulando busca
    if (placa.toUpperCase() === 'ABC1234') {
      setResultado({
        placa: 'ABC1234',
        condutor: 'João da Silva',
        zona: 'Zona B - Fila 2',
      });
    } else {
      setResultado(null);
      Alert.alert('Moto não encontrada');
    }

    setPlaca('');
  };

  return (
    <LinearGradient colors={['#e0f0ff', '#ffffff']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.inner}>
        <Text style={styles.title}>🔍 Buscar Moto por Placa</Text>

        <TextInput
          placeholder="Digite a placa (ex: ABC1234)"
          style={styles.input}
          value={placa}
          onChangeText={setPlaca}
          autoCapitalize="characters"
          maxLength={7}
        />

        <Pressable style={styles.button} onPress={handleBuscar}>
          <Text style={styles.buttonText}>Buscar</Text>
        </Pressable>

        {resultado && (
          <View style={styles.resultado}>
            <Text style={styles.resultadoTexto}>Placa: {resultado.placa}</Text>
            <Text style={styles.resultadoTexto}>Condutor: {resultado.condutor}</Text>
            <Text style={styles.resultadoTexto}>Localização: {resultado.zona}</Text>
          </View>
        )}

        <Pressable onPress={() => router.back()}>
          <Text style={styles.voltar}>← Voltar para Home</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#007AFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginBottom: 14,
    elevation: 1,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  resultado: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    width: '100%',
    marginBottom: 20,
  },
  resultadoTexto: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  voltar: {
    marginTop: 10,
    color: '#007AFF',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});
