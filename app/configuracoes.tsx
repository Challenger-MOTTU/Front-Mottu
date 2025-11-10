import { View, Text, Switch, StyleSheet, Pressable, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from './contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Configuracoes() {
  const router = useRouter();
  const {t,i18n} = useTranslation()
  const { temaEscuro, setTemaEscuro } = useTheme();
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === "pt" ? "es" : "pt";
    i18n.changeLanguage(newLang);
  };

  const realizarLogoff = async () => {
    await AsyncStorage.removeItem("@user");
    router.push("/");
  };

  useEffect(() => {
    const carregarPreferencias = async () => {
      const noti = await AsyncStorage.getItem('notificacoes');
      if (noti !== null) setNotificacoesAtivas(noti === 'true');
    };
    carregarPreferencias();
  }, []);

  const alterarNotificacoes = async (valor: boolean) => {
    setNotificacoesAtivas(valor);
    await AsyncStorage.setItem('notificacoes', valor.toString());
  };

  return (
    <LinearGradient
      colors={temaEscuro ? ['#0f0f0f', '#1c1c1c'] : ['#e0f0ff', '#ffffff']}
      style={styles.container}
    >
      <Text style={[styles.title, { color: temaEscuro ? '#fff' : '#007AFF' }]}>
        {t("configuracoesScreen.title")}
      </Text>

      <View style={[styles.item, { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff' }]}>
        <Text style={[styles.label, { color: temaEscuro ? '#fff' : '#000' }]}>
          {t("configuracoesScreen.notify")}
        </Text>
        <Switch
          value={notificacoesAtivas}
          onValueChange={alterarNotificacoes}
          trackColor={{ false: '#ccc', true: '#007AFF' }}
          thumbColor={notificacoesAtivas ? '#007AFF' : '#f4f3f4'}
        />
      </View>

      <View style={[styles.item, { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff' }]}>
        <Text style={[styles.label, { color: temaEscuro ? '#fff' : '#000' }]}>
          {t("configuracoesScreen.tema")}
        </Text>
        <Switch
          value={temaEscuro}
          onValueChange={setTemaEscuro}
          trackColor={{ false: '#ccc', true: '#007AFF' }}
          thumbColor={temaEscuro ? '#007AFF' : '#f4f3f4'}
        />
      </View>

       <Button            
          title={i18n.language === "pt" ? "Mudar para Espanhol" : "Cambiar al portugués"}
          onPress={toggleLanguage}
          color= "green"           
        />  
      <Button title={t("configuracoesScreen.sairButton")} onPress={realizarLogoff} color = "red"/>

      <Pressable onPress={() => router.back()}>
        <Text style={[styles.voltar, { color: temaEscuro ? '#ccc' : '#007AFF' }]}>
          {t("backHome")}
        </Text>
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
    marginBottom: 30,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});
