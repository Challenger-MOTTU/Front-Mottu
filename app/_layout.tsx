import { Slot } from 'expo-router';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { View, ActivityIndicator } from 'react-native';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from "../src/services/i18n";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </I18nextProvider>
  );
}
