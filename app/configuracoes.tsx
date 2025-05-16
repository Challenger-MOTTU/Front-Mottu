import { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Configuracoes() {
  const router = useRouter();
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(false);

  useEffect(() => {
    const carregarPreferencias = async () => {
      const noti = await AsyncStorage.getItem('notificacoes');
      const tema = await AsyncStorage.getItem('temaEscuro');

      if (noti !== null) setNotificacoesAtivas(noti === 'true');
      if (tema !== null) setTemaEscuro(tema === 'true');
    };

    carregarPreferencias();
  }, []);

  const alterarNotificacoes = async (valor: boolean) => {
    setNotificacoesAtivas(valor);
    await AsyncStorage.setItem('notificacoes', valor.toString());
  };

  const alterarTema = async (valor: boolean) => {
    setTemaEscuro(valor);
    await AsyncStorage.setItem('temaEscuro', valor.toString());
  };

  return (
    <LinearGradient colors={['#e0f0ff', '#ffffff']} style={styles.container}>
      <Text style={styles.title}>⚙️ Configurações do Sistema</Text>

      <View style={styles.item}>
        <Text style={styles.label}>🔔 Notificações</Text>
        <Switch
          value={notificacoesAtivas}
          onValueChange={alterarNotificacoes}
          trackColor={{ false: '#ccc', true: '#007AFF' }}
          thumbColor={notificacoesAtivas ? '#007AFF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>🌓 Tema Escuro</Text>
        <Switch
          value={temaEscuro}
          onValueChange={alterarTema}
          trackColor={{ false: '#ccc', true: '#007AFF' }}
          thumbColor={temaEscuro ? '#007AFF' : '#f4f3f4'}
        />
      </View>

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
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#007AFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  voltar: {
    marginTop: 24,
    textAlign: 'center',
    color: '#007AFF',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});
