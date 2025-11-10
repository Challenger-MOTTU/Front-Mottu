// services/mockMotoService.ts
import { delay } from "./utils";

let motos = [
  { placa: 'ABC1234', modelo: 'Yamaha X1', status: 'disponível', patio: 'Zona B - Fila 2' },
  { placa: 'DEF5678', modelo: 'Honda Titan', status: 'manutenção', patio: 'Zona A - Fila 3' },
  { placa: 'GHI9999', modelo: 'Suzuki Burgman', status: 'alugada', patio: 'Zona C - Fila 1' },
];


interface Moto {
  id: number;
  modelo: string;
  placa: string;
  status: string;
  patio: string;
}

let motosMock: Moto[] = [
  { id: 1, modelo: 'CG 160', placa: 'ABC1234', status: 'Ativa', patio: 'Pátio Central' },
  { id: 2, modelo: 'Fan 125', placa: 'XYZ5678', status: 'Em manutenção', patio: 'Pátio Leste' },
];

export const getMockMotos = async (): Promise<Moto[]> => {
  await delay(500);
  return motosMock;
};

export const addMockMoto = async (
  modelo: string,
  placa: string,
  status: string,
  patio: string
): Promise<Moto> => {
  await delay(800); // simula uma chamada de rede

  // Simula ID incremental
  const novaMoto: Moto = {
    id: motosMock.length + 1,
    modelo,
    placa,
    status,
    patio,
  };

  motosMock.push(novaMoto);
  return novaMoto;
};

export const getMotoByPlaca = async (placa: string) => {
  await delay(400);
  const moto = motos.find((m) => m.placa.toLowerCase() === placa.toLowerCase());
  return moto || null;
};
