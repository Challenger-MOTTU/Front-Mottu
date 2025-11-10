import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from './contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { getPatios } from '../src/services/persistentMockPatioService'; // seu arquivo mock
import { Pressable } from 'react-native';

interface Patio {
  id: number;
  nome: string;
  cidade: string;
  capacidade: number;
}

export default function ListarPatios() {
  const [patios, setPatios] = useState<Patio[]>([]);
  const [loading, setLoading] = useState(true);
  const { temaEscuro } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const carregarPatios = async () => {
    try {
      const data = await getPatios();
      setPatios(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os pátios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPatios();
  }, []);

  return (
    <LinearGradient
      colors={temaEscuro ? ['#0f0f0f', '#1c1c1c'] : ['#e0f0ff', '#ffffff']}
      style={styles.container}
    >
      <Text style={[styles.title, { color: temaEscuro ? '#fff' : '#007AFF' }]}>
        {t("listarPatiosScreen.title") ?? 'Pátios Cadastrados'}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 40 }} />
      ) : patios.length === 0 ? (
        <Text style={[styles.emptyText, { color: temaEscuro ? '#aaa' : '#555' }]}>
          Nenhum pátio cadastrado.
        </Text>
      ) : (
        <ScrollView style={styles.scroll}>
          {patios.map((patio) => (
            <View
              key={patio.id}
              style={[
                styles.card,
                { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff' },
              ]}
            >
              <Text style={[styles.cardTitle, { color: temaEscuro ? '#fff' : '#000' }]}>
                {patio.nome}
              </Text>
              <Text style={[styles.cardText, { color: temaEscuro ? '#ccc' : '#333' }]}>
                Cidade: {patio.cidade}
              </Text>
              <Text style={[styles.cardText, { color: temaEscuro ? '#ccc' : '#333' }]}>
                Capacidade: {patio.capacidade} motos
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

      <Pressable onPress={() => router.back()} style={styles.voltarBtn}>
        <Text style={[styles.voltar, { color: temaEscuro ? '#ccc' : '#007AFF' }]}>
          {t("backHome") ?? '← Voltar'}
        </Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  emptyText: {
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    marginTop: 40,
  },
  voltarBtn: {
    alignItems: 'center',
    marginBottom: 400,
  },
  voltar: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});
