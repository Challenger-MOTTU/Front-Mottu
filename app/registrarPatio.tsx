import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from './contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { addPatio } from '../src/services/persistentMockPatioService'; // <-- importa função mockada

export default function PatioRegistrar() {
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const { temaEscuro } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const handleRegistrar = async () => {
    if (!nome || !cidade || !capacidade) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      await addPatio(nome, cidade, Number(capacidade)); // 👈 substitui api.post()
      Alert.alert('✅ Sucesso', 'Pátio cadastrado com sucesso!');
      setNome('');
      setCidade('');
      setCapacidade('');
    } catch (error) {
      console.error(error);
      Alert.alert('❌ Erro', 'Não foi possível cadastrar o pátio.');
    }
  };

  return (
    <LinearGradient
      colors={temaEscuro ? ['#0f0f0f', '#1c1c1c'] : ['#e0f0ff', '#ffffff']}
      style={styles.container}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.inner}>
          <Text style={[styles.title, { color: temaEscuro ? '#fff' : '#007AFF' }]}>
            Cadastrar Pátio
          </Text>

          <TextInput
            placeholder="Nome do Pátio"
            placeholderTextColor={temaEscuro ? '#999' : undefined}
            style={[
              styles.input,
              { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff', color: temaEscuro ? '#fff' : '#000' },
            ]}
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            placeholder="Cidade"
            placeholderTextColor={temaEscuro ? '#999' : undefined}
            style={[
              styles.input,
              { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff', color: temaEscuro ? '#fff' : '#000' },
            ]}
            value={cidade}
            onChangeText={setCidade}
          />

          <TextInput
            placeholder="Capacidade"
            placeholderTextColor={temaEscuro ? '#999' : undefined}
            style={[
              styles.input,
              { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff', color: temaEscuro ? '#fff' : '#000' },
            ]}
            value={capacidade}
            onChangeText={setCapacidade}
            keyboardType="numeric"
          />

          <Pressable style={styles.button} onPress={handleRegistrar}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </Pressable>

          <Pressable onPress={() => router.back()}>
            <Text style={[styles.voltar, { color: temaEscuro ? '#ccc' : '#007AFF' }]}>Voltar</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  wrapper: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  inner: { alignItems: 'center', paddingVertical: 40 },
  title: { fontSize: 24, fontFamily: 'Inter_700Bold', marginBottom: 24, textAlign: 'center' },
  input: {
    width: '100%', padding: 14, borderRadius: 12, fontSize: 16,
    fontFamily: 'Inter_400Regular', marginBottom: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 2, elevation: 1,
  },
  button: { backgroundColor: '#007AFF', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 14, marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  voltar: { marginTop: 20, fontFamily: 'Inter_400Regular', fontSize: 14 },
});
