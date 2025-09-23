import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { useTheme } from './contexts/ThemeContext';

export default function Home() {
  const router = useRouter();
  const { temaEscuro } = useTheme();

  return (
    <LinearGradient
      colors={temaEscuro ? ['#0f0f0f', '#1c1c1c'] : ['#cde0ff', '#f5f9ff']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animatable.Image
          animation="fadeInDown"
          duration={1000}
          source={require('../assets/images/motogrid-logo.png')}
          style={styles.logo}
        />

        <Animatable.View animation="fadeInUp" delay={400} style={styles.textGroup}>
          <Text style={[styles.subtitle, { color: temaEscuro ? '#ccc' : '#555' }]}>
            Bem-vindo ao
          </Text>
          <Text style={[styles.title, { color: temaEscuro ? '#fff' : '#007AFF' }]}>
            MotoGrid
          </Text>
          <Text style={[styles.description, { color: temaEscuro ? '#aaa' : '#666' }]}>
            Gestão inteligente de motos nos pátios
          </Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={800} style={styles.buttonContainer}>
          <CustomButton text="📍 Registrar Moto no Pátio" onPress={() => router.push('/registrar')} />
          <CustomButton text="🔍 Buscar Moto por Placa" onPress={() => router.push('/buscar')} />
          <CustomButton text="🗺️ Visualizar Mapa do Pátio" onPress={() => router.push('/mapa')} />
          <CustomButton text="🧾 Histórico de Movimentações" onPress={() => router.push('/historico')} />
          <CustomButton text="📸 Identificar Moto via Câmera" onPress={() => router.push('/camera')} />
          <CustomButton text="🚨 Alertas e Avarias" onPress={() => router.push('/alertas')} />
          <CustomButton text="📦 Ver Motos Aguardando Saída" onPress={() => router.push('/aguardando')} />
          <CustomButton text="⚙️ Configurações do Sistema" onPress={() => router.push('/configuracoes')} />
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
}

function CustomButton({ text, onPress }: { text: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 12,
  },
  textGroup: {
    alignItems: 'center',
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 12,
    fontFamily: 'Inter_400Regular',
  },
  title: {
    fontSize: 34,
    fontFamily: 'Inter_700Bold',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  buttonContainer: {
    gap: 14,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '90%',
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: '#005ecb',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
