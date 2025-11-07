import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text,TextInput, Image, StyleSheet, Pressable, ScrollView, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import{auth} from '../src/services/fireBaseConfig'
import { useTheme } from './contexts/ThemeContext';
import { useTranslation } from 'react-i18next';


export default function Login(){
  const router = useRouter();
  const { temaEscuro } = useTheme();
  const {t} = useTranslation()
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const verificarUsuarioLogado = async () => {
      try {
        const usuarioSalvo = await AsyncStorage.getItem('@user')
        if (usuarioSalvo) {
          router.replace('/home')//Se tiver algo armazenado local, redireciona para HomeScreen
        }
      } catch (error) {
        console.log("Erro ao verificar login", error)
      }
    }

    //Chama a função estruturada acima
    verificarUsuarioLogado()
  },[])
  
  // Função para simular o envio do formulário
const handleLogin = () => {
  if (!email || !senha) {
    Alert.alert(t("atention"), t('alerts.alertIndex.alert1'));
    return;
  }
  //Função para realizar o login
  signInWithEmailAndPassword(auth, email, senha)
    .then(async(userCredential)=>{
      const user = userCredential.user
      await AsyncStorage.setItem('@user',JSON.stringify(user))
      router.replace('/home')
    })
    .catch((error)=>{
      const errorCode = error.code
      const errorMessage = error.message
      console.log("Error Mensagem: ",errorMessage)
      if(error.code === 'auth/invalid-credential'){
        Alert.alert(t("error"), t("alerts.alertIndex.alert2"))
      }
    })
  };

  //Função enviar o e-mail de reset de senha para o usuário
  const esqueceuSenha = () => {
    if (!email) {
      alert(t("alerts.alertIndex.alert3"))
      return
    }
    sendPasswordResetEmail(auth, email)
      .then(() => { alert(t("alerts.alertIndex.alert4")) })
      .catch((error) => {
        console.log("Error ao enviar email", error.message)
        alert(t("alerts.alertIndex.alert5"))
      })
  }

  return(
    <LinearGradient 
    colors={temaEscuro ? ['#0f0f0f', '#1c1c1c'] : ['#0f0f0f', '#1c1c1c']}
    style={styles.container}
    >
      <Text style={[styles.titulo,]}>{t("indexScreen.title")}</Text>

      


      {/* Campo Email */}
      <TextInput
         style={[
              styles.input,
              { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff', color: temaEscuro ? '#fff' : '#000' },
            ]}
        placeholder="E-mail"
        placeholderTextColor={temaEscuro ? '#999' : undefined}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Campo Senha */}
      <View>
        <TextInput
          style={[styles.input,
          { backgroundColor: temaEscuro ? '#2c2c2c' : '#fff', color: temaEscuro ? '#fff' : '#000' }
          ]}
          placeholder={t('indexScreen.password')}
          placeholderTextColor={temaEscuro ? '#999' : undefined}
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
      <TouchableOpacity style={[styles.botao, ]} onPress={handleLogin}>
        <Text style={styles.textoBotao}>{t('indexScreen.title')}</Text>
      </TouchableOpacity>

      <Link href="cadastro" style={{ marginTop: 20, marginLeft: 150, color: temaEscuro ? '#ccc' : '#007AFF'  }}>{t("indexScreen.register")}</Link>

      {/* Texto Esqueceu a senha */}
      <Text style={{  justifyContent: "center", marginLeft: 130, color: temaEscuro ? '#ccc' : '#007AFF' }}
        onPress={esqueceuSenha}>{t("indexScreen.forgotPass")}
      </Text>
    </View>

    </LinearGradient>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  botao: {
    backgroundColor: '#00B37E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
   title: {
    fontSize: 34,
    fontFamily: 'Inter_700Bold',
    marginBottom: 6,
  },
  
});