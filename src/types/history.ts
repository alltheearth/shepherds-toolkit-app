import type { StatusContato } from "./contato"

export interface History {
    id: string
    nome: string
    contato_id: string
    semana_inicio: string
    ultima_mensagem: string
    status:StatusContato
    prioridade: string
    observacoes: string
}