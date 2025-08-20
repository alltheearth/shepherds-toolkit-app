import axios from "axios";
import type { Contato } from "../types/contato";

export const api = axios.create({
  baseURL: "http://localhost:8000", // depois trocamos para o backend real
});

export const getContatos = async (): Promise<Contato[]> => {
  const res = await api.get<Contato[]>("/contatos");
  return res.data;
};
    
export function ultimoDomingoBrasil() {
  const agora = new Date();

  // Ajusta para horário de Brasília (UTC-3)
  const offsetBrasil = -3 * 60; // minutos
  const agoraBrasil = new Date(agora.getTime() + (offsetBrasil - agora.getTimezoneOffset()) * 60000);

  const diaSemana = agoraBrasil.getDay(); // domingo=0, segunda=1...
  
  // Se hoje for domingo, diasParaDomingo = 0
  const diasParaDomingo = diaSemana; 

  const domingo = new Date(agoraBrasil);
  domingo.setDate(agoraBrasil.getDate() - diasParaDomingo);

  const ano = domingo.getFullYear();
  const mes = String(domingo.getMonth() + 1).padStart(2, '0');
  const dia = String(domingo.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

console.log(ultimoDomingoBrasil());
