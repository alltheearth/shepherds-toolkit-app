import { useState } from "react";
import { useGetContatosQuery, useGetHistoryQuery } from "../../services/contatosApi";
import { Container, Typography } from "@mui/material";
import ContactModal from "../../components/ContactModal";
import ContactTable from "../../components/ContactTable";
import { ModalButton } from "./styles";


const ContatosPage = () => {

  const { data, error, isLoading } = useGetContatosQuery();
  const {data: history} = useGetHistoryQuery()

  history && console.log(history)

  const [open, setOpen] = useState(false);

  const handleSave = async (formData: FormData) => {
    console.log("Novo contato:", data);

  try {
    const response = await fetch('http://localhost:8000/contatos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
    
};

  if (isLoading) return  <p>Carregando</p>;
  if (error) return <p>Erro ao carregar contatos</p>;

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contatos
        </Typography>
        {data && <ContactTable data={data} />}
        <ContactModal open={open} onClose={() => setOpen(false)} onSave={handleSave} />
        <ModalButton onClick={() => setOpen(true)}>New contact</ModalButton>
      </Container>
    </>
  );
};

export default ContatosPage;
