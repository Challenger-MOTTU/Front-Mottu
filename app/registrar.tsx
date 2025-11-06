import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from './contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Registrar() {
  const [nome, setNome] = useState('');
  const {t}=useTranslation();
  const [placa, setPlaca] = useState('');
  const [zona, setZona] = useState('');
  const router = useRouter();
  const { temaEscuro } = useTheme();

  const handleRegistrar = () => {
    if (!nome || !placa || !zona) {
      Alert.alert(t("alerts.alertRegister.alert1"));
      return;
    }

    Alert.alert(t("alerts.alertRegister.alert2"), `Condutor: ${nome}\nPlaca: ${placa}\nZona: ${zona}`);
    setNome('');
    setPlaca('');
    setZona('');
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
            value={nome}
            onChangeText={setNome}
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
            value={zona}
            onChangeText={setZona}
          />

          <Pressable style={styles.button} onPress={handleRegistrar}>
            <Text style={styles.buttonText}>{t("register")}</Text>
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
