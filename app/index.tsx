import { View, Text, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/motogrid-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo ao MotoGrid</Text>

      <Link href="/cadastro" style={styles.link}>Ir para Cadastro</Link>
      <Link href="/detalhes" style={styles.link}>Ir para Detalhes</Link>
      <Link href="/mapa" style={styles.link}>Ir para Mapa</Link>
      <Link href="/configuracoes" style={styles.link}>Ir para Configurações</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 18,
    marginVertical: 6,
    color: '#007AFF',
  },
});
