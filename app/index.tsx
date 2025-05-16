import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/motogrid-logo.png')} style={styles.logo} />

      <Text style={styles.subtitle}>Bem-vindo ao</Text>
      <Text style={styles.title}>MotoGrid</Text>
      <Text style={styles.description}>Gestão inteligente de motos nos pátios</Text>

      <View style={styles.buttonContainer}>
        <CustomButton text="Cadastro" onPress={() => router.push('/cadastro')} />
        <CustomButton text="Detalhes" onPress={() => router.push('/detalhes')} />
        <CustomButton text="Mapa" onPress={() => router.push('/mapa')} />
        <CustomButton text="Configurações" onPress={() => router.push('/configuracoes')} />
      </View>
    </View>
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
    backgroundColor: '#f0f6ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: '#005ecb',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
