import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function Registrar() {
  const [nome, setNome] = useState('');
  const [placa, setPlaca] = useState('');
  const [zona, setZona] = useState('');
  const router = useRouter();

  const handleRegistrar = () => {
    if (!nome || !placa || !zona) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    Alert.alert('Moto Registrada', `Condutor: ${nome}\nPlaca: ${placa}\nZona: ${zona}`);
    setNome('');
    setPlaca('');
    setZona('');
  };

  return (
    <LinearGradient colors={['#e0f0ff', '#ffffff']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.inner}>
          <Text style={styles.title}>📍 Registrar Moto no Pátio</Text>

          <TextInput
            placeholder="Nome do condutor"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            placeholder="Placa da moto"
            style={styles.input}
            value={placa}
            onChangeText={setPlaca}
            autoCapitalize="characters"
            maxLength={7}
          />
          <TextInput
            placeholder="Zona ou Fila (ex: Zona A)"
            style={styles.input}
            value={zona}
            onChangeText={setZona}
          />

          <Pressable style={styles.button} onPress={handleRegistrar}>
            <Text style={styles.buttonText}>Registrar</Text>
          </Pressable>

          <Pressable onPress={() => router.back()}>
            <Text style={styles.voltar}>← Voltar para Home</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  inner: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#007AFF',
    marginBottom: 24,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  voltar: {
    marginTop: 20,
    color: '#007AFF',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});
