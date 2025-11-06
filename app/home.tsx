import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { useTheme } from './contexts/ThemeContext';
import {useTranslation} from 'react-i18next'

export default function Home() {
  const router = useRouter();
  const {t} = useTranslation();
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
            {t("homeScreen.titleGroup.welcome1")}
          </Text>
          <Text style={[styles.title, { color: temaEscuro ? '#fff' : '#007AFF' }]}>
            {t("homeScreen.titleGroup.welcome2")}
          </Text>
          <Text style={[styles.description, { color: temaEscuro ? '#aaa' : '#666' }]}>
            {t("homeScreen.titleGroup.welcome3")}
          </Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={800} style={styles.buttonContainer}>
          <CustomButton text={t("homeScreen.registerButton")} onPress={() => router.push('/registrar')} />
          <CustomButton text={t("homeScreen.searchButton")} onPress={() => router.push('/buscar')} />
          <CustomButton text={t("homeScreen.viewMapButton")} onPress={() => router.push('/mapa')} />
          <CustomButton text={t("homeScreen.historyButton")} onPress={() => router.push('/historico')} />
          <CustomButton text={t("homeScreen.identidyButton")} onPress={() => router.push('/camera')} />
          <CustomButton text={t("homeScreen.alertButton")} onPress={() => router.push('/alertas')} />
          <CustomButton text={t("homeScreen.viewMotoButton")} onPress={() => router.push('/aguardando')} />
          <CustomButton text={t("homeScreen.settingsButton")} onPress={() => router.push('/configuracoes')} />
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
