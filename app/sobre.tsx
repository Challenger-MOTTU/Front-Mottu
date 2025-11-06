import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useTheme } from './contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Sobre() {
  const { temaEscuro } = useTheme();
  const { t } = useTranslation();

  return (
    <LinearGradient
      colors={temaEscuro ? ['#0f0f0f', '#1c1c1c'] : ['#cde0ff', '#f5f9ff']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo animada */}
        <Animatable.Image
          animation="fadeInDown"
          duration={1000}
          source={require('../assets/images/motogrid-logo.png')}
          style={styles.logo}
        />

        {/* Título e descrição */}
        <Animatable.View animation="fadeInUp" delay={300} style={styles.textGroup}>
          <Text style={[styles.title, { color: temaEscuro ? '#fff' : '#007AFF' }]}>
            {t("aboutScreen.title") || "Sobre o Projeto"}
          </Text>
          <Text style={[styles.description, { color: temaEscuro ? '#aaa' : '#555' }]}>
            {t("aboutScreen.description") ||
              "Este aplicativo foi desenvolvido por estudantes dedicados, com foco em inovação, tecnologia e sustentabilidade."}
          </Text>
        </Animatable.View>

        {/* Integrantes com fotos */}
        <Animatable.View animation="fadeInUp" delay={600} style={styles.membersContainer}>
          <View style={styles.memberItem}>
            <Image source={require('../assets/images/motogrid-logo.png')} style={styles.memberImage} />
            <Text style={[styles.member, { color: temaEscuro ? '#fff' : '#333' }]}>
              Victor Hugo Carvalho Pereira
            </Text>
          </View>

          <View style={styles.memberItem}>
            <Image source={require('../assets/images/motogrid-logo.png')} style={styles.memberImage} />
            <Text style={[styles.member, { color: temaEscuro ? '#fff' : '#333' }]}>
              Juliana de Andrade Sousa
            </Text>
          </View>

          <View style={styles.memberItem}>
            <Image source={require('../assets/images/motogrid-logo.png')} style={styles.memberImage} />
            <Text style={[styles.member, { color: temaEscuro ? '#fff' : '#333' }]}>
              Gabriel Gomes Mancera
            </Text>
          </View>
        </Animatable.View>
        
        {/* Campo simples de log */}
        <View style={styles.logContainer}>
          <Text style={[styles.logTitle, { color: temaEscuro ? '#ccc' : '#555' }]}>
            Último Commit:
          </Text>
          <Text style={[styles.logText, { color: temaEscuro ? '#fff' : '#333' }]}>
            18278e415f4f277e649f2236e623b4778eb8afd3
          </Text>
        </View>

        {/* Rodapé */}
        <Animatable.Text
          animation="fadeInUp"
          delay={900}
          style={[styles.footer, { color: temaEscuro ? '#777' : '#666' }]}
        >
          {t("aboutScreen.footer") || "© 2025 MotoGrid — Todos os direitos reservados."}
        </Animatable.Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  textGroup: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  logContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logTitle: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  logText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    paddingHorizontal: 12,
  },
  membersContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    gap: 24,
  },
  memberItem: {
    alignItems: 'center',
  },
  memberImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  member: {
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
});
