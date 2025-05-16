import { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  temaEscuro: boolean;
  setTemaEscuro: (valor: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  temaEscuro: false,
  setTemaEscuro: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [temaEscuro, setTemaEscuro] = useState(false);

  useEffect(() => {
    const carregarTema = async () => {
      const tema = await AsyncStorage.getItem('temaEscuro');
      if (tema !== null) setTemaEscuro(tema === 'true');
    };
    carregarTema();
  }, []);

  const atualizarTema = (valor: boolean) => {
    setTemaEscuro(valor);
    AsyncStorage.setItem('temaEscuro', valor.toString());
  };

  return (
    <ThemeContext.Provider value={{ temaEscuro, setTemaEscuro: atualizarTema }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
