// ContactModal.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem
} from "@mui/material";

export interface FormData {
    nome: string,
    faixa_etaria: string,
    classificacao: string,
    envolvimento: string,
    participacao: string,
    aniversario: string,
    rede_social: string,
    bairro: string,
    prioridade: 1 | 2 | 3,
    ultima_mensagem: string,
    status: "Não contatado" | "Mensagem enviada" | "Aguardando resposta" | "Respondeu" | "Encerrado"
    observacoes: string
  }

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function ContactModal({ open, onClose, onSave }: ContactModalProps) {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    faixa_etaria: "",
    classificacao: "",
    envolvimento: "",
    participacao: "",
    aniversario: "",
    rede_social: "",
    bairro: "",
    prioridade: 2,
    ultima_mensagem: "",
    status: "Não contatado",
    observacoes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.nome.trim()) {
      alert("O campo Nome é obrigatório.");
      return;
    }
    onSave(formData);
    console.log(formData)
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Registrar Contato</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <TextField
          select
          label="Faixa Etária"
          name="faixa_etaria"
          value={formData.faixa_etaria}
          onChange={handleChange}
        >
          <MenuItem value="Adolescente">Adolescente</MenuItem>
          <MenuItem value="Jovem">Jovem</MenuItem>
          <MenuItem value="Adulto">Adulto</MenuItem>
        </TextField>

        <TextField
          label="Classificação"
          name="classificacao"
          value={formData.classificacao}
          onChange={handleChange}
        />

        <TextField
          label="Envolvimento"
          name="envolvimento"
          value={formData.envolvimento}
          onChange={handleChange}
        />

        <TextField
          label="Participação"
          name="participacao"
          value={formData.participacao}
          onChange={handleChange}
        />

        <TextField
          type="date"
          label="Aniversário"
          name="aniversario"
          value={formData.aniversario}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Rede Social"
          name="rede_social"
          value={formData.rede_social}
          onChange={handleChange}
        />

        <TextField
          label="Bairro"
          name="bairro"
          value={formData.bairro}
          onChange={handleChange}
        />

        <TextField
          select
          label="Prioridade"
          name="prioridade"
          value={formData.prioridade}
          onChange={handleChange}
        >
          <MenuItem value={1}>Alta</MenuItem>
          <MenuItem value={2}>Média</MenuItem>
          <MenuItem value={3}>Baixa</MenuItem>
        </TextField>

        <TextField
          type="date"
          label="Última Mensagem"
          name="ultima_mensagem"
          value={formData.ultima_mensagem}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="Não contatado">Não contatado</MenuItem>
          <MenuItem value="Mensagem enviada">Mensagem enviada</MenuItem>
          <MenuItem value="Aguardando resposta">Aguardando resposta</MenuItem>
          <MenuItem value="Respondeu">Respondeu</MenuItem>
          <MenuItem value="Encerrado">Encerrado</MenuItem>
        </TextField>

        <TextField
          label="Observações"
          name="observacoes"
          multiline
          rows={3}
          value={formData.observacoes}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
