import AsyncStorage from '@react-native-async-storage/async-storage';
import { delay } from './utils';

const KEY = '@mock:patios';

const seed = async () => {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) {
    const initial = [
      { id: 1, nome: 'Pátio Central', cidade: 'São Paulo', capacidade: 120 },
    ];
    await AsyncStorage.setItem(KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(raw);
};

export const getPatios = async () => {
  await delay(300);
  const list = await seed();
  return list;
};

export const addPatio = async (nome: string, cidade: string, capacidade: number) => {
  await delay(300);
  const list = JSON.parse((await AsyncStorage.getItem(KEY)) ?? '[]');
  const id = list.length ? Math.max(...list.map((p:any)=>p.id)) + 1 : 1;
  const novo = { id, nome, cidade, capacidade };
  list.push(novo);
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
  return novo;
};