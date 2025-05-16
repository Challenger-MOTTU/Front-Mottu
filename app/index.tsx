import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/motogrid-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo ao</Text>
      <Text style={styles.brand}>MotoGrid</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/cadastro')}>
        <Text style={styles.buttonText}>Cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/detalhes')}>
        <Text style={styles.buttonText}>Detalhes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/mapa')}>
        <Text style={styles.buttonText}>Mapa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/configuracoes')}>
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#f4f9ff',
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: '300',
  },
  brand: {
    fontSize: 32,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    width: '70%',
    paddingVertical: 14,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
