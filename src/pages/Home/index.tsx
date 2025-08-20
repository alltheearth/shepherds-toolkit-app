import {useGetHistoryQuery } from "../../services/contatosApi";

const Home = () => {

  const { data, error, isLoading } = useGetHistoryQuery()

  if (isLoading) return <p>Carregando</p>;
  if (error) return <p>Erro ao carregar contatos</p>;
  console.log(data)
  return (
    <>

    </>
  );
};

export default Home;
