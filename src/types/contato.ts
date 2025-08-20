export type StatusContato = 
  | "Não contatado"
  | "Mensagem enviada"
  | "Aguardando resposta"
  | "Respondeu"
  | "Encerrado";

export type Prioridade = 1 | 2 | 3; // 1=Alta, 2=Média, 3=Baixa

export interface Contato {
  id: number;
  nome: string;
  faixa_etaria?: string;
  classificacao?: string;
  envolvimento?: string;
  participacao?: string;
  aniversario?: string;
  rede_social?: string;
  bairro?: string;
  prioridade: Prioridade;
  ultima_mensagem?: string;
  status: StatusContato;
  observacoes?: string;
}
