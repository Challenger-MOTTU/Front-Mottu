import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from './contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { getMotoByPlaca } from '../src/services/mockMotoService'; // 👈 novo import

export default function Buscar() {
  const router = useRouter();
  const { t } = useTranslation();
  const { temaEscuro } = useTheme();

  const [placa, setPlaca] = useState('');
  const [resultado, setResultado] = useState<null | { placa: string; modelo: string; status: string; patio: string }>(null);

  const handleBuscar = async () => {
    if (!placa) {
      Alert.alert(t("alerts.alertBuscar.alert1"));
      return;
    }

    const moto = await getMotoByPlaca(placa);

    if (moto) {
      setResultado(moto);
    } else {
      setResultado(null);
      Alert.alert(t("alerts.alertBuscar.alert2"));
    }

    setPlaca('');
  };

  return (
    <LinearGradient
      colors={temaEscuro ? ['#0f0f0f', '#1c1c1c'] : ['#e0f0ff', '#ffffff']}
      style={styles.container}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.inner}>
        <Text style={[styles.title, { color: temaEscuro ? '#fff' : '#007AFF' }]}>
          {t("buscarScreen.title")}
        </Text>

        <TextInput
          placeholder={t("buscarScreen.input")}
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

        <Pressable style={styles.button} onPress={handleBuscar}>
          <Text style={styles.buttonText}>{t("buscarScreen.buscarButton")}</Text>
        </Pressable>

        {resultado && (
          <View style={[styles.resultado, { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff' }]}>
            <Text style={[styles.resultadoTexto, { color: temaEscuro ? '#fff' : '#000' }]}>
              Placa: {resultado.placa}
            </Text>
            <Text style={[styles.resultadoTexto, { color: temaEscuro ? '#fff' : '#000' }]}>
              Modelo: {resultado.modelo}
            </Text>
            <Text style={[styles.resultadoTexto, { color: temaEscuro ? '#fff' : '#000' }]}>
              Status: {resultado.status}
            </Text>
            <Text style={[styles.resultadoTexto, { color: temaEscuro ? '#fff' : '#000' }]}>
              Pátio: {resultado.patio}
            </Text>
          </View>
        )}

        <Pressable onPress={() => router.back()}>
          <Text style={[styles.voltar, { color: temaEscuro ? '#ccc' : '#007AFF' }]}>
            {t("backHome")}
          </Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
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
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});
