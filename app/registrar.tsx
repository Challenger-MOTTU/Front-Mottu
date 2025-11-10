import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from './contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { addMockMoto } from '../src/services/mockMotoService';


export default function Registrar() {
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [status, setStatus] = useState('');
  const [patioId, setPatioId] = useState('');
  const router = useRouter();
  const { temaEscuro } = useTheme();
  const { t } = useTranslation();

  const handleRegistrar = async () => {
  if (!modelo || !placa || !status || !patioId) {
    Alert.alert(t("error"), t("alerts.alertRegister.alert1"));
    return;
  }

  try {
    const novaMoto = await addMockMoto(modelo, placa, status, patioId);
    Alert.alert(
      'Sucesso',
      `Moto cadastrada!\nModelo: ${novaMoto.modelo}\nPlaca: ${novaMoto.placa}`
    );

    setModelo('');
    setPlaca('');
    setStatus('');
    setPatioId('');
  } catch (error) {
    console.error(error);
    Alert.alert('Erro', 'Não foi possível registrar a moto (mock).');
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
            {t("registrarScreen.title")}
          </Text>

          <TextInput
            placeholder={t("registrarScreen.inputs.input1")}
            placeholderTextColor={temaEscuro ? '#999' : undefined}
            style={[
              styles.input,
              { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff', color: temaEscuro ? '#fff' : '#000' },
            ]}
            value={modelo}
            onChangeText={setModelo}
          />

          <TextInput
            placeholder={t("registrarScreen.inputs.input2")}
            placeholderTextColor={temaEscuro ? '#999' : undefined}
            style={[
              styles.input,
              { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff', color: temaEscuro ? '#fff' : '#000' },
            ]}
            value={placa}
            onChangeText={setPlaca}
            autoCapitalize="characters"
            maxLength={7}
          />

          <TextInput
            placeholder={t("registrarScreen.inputs.input3")}
            placeholderTextColor={temaEscuro ? '#999' : undefined}
            style={[
              styles.input,
              { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff', color: temaEscuro ? '#fff' : '#000' },
            ]}
            value={status}
            onChangeText={setStatus}
          />

          <TextInput
            placeholder={t("registrarScreen.inputs.input4")}
            placeholderTextColor={temaEscuro ? '#999' : undefined}
            keyboardType="numeric"
            style={[
              styles.input,
              { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff', color: temaEscuro ? '#fff' : '#000' },
            ]}
            value={patioId}
            onChangeText={setPatioId}
          />

          <Pressable style={styles.button} onPress={handleRegistrar}>
            <Text style={styles.buttonText}>Registrar</Text>
          </Pressable>

          <Pressable onPress={() => router.back()}>
            <Text style={[styles.voltar, { color: temaEscuro ? '#ccc' : '#007AFF' }]}>{t("backHome")}</Text>
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
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
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
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});
