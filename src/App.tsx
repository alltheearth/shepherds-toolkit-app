import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Header from "./containers/Header";
import GlobalStyles from './styles/GlobalStyles';
import Home from './pages/Home';
import ContatosPage from './pages/Contatos';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/contatos' element={<ContatosPage />}/>
        </Routes>
      </main>
    </Router>
  );
};

export default App;
