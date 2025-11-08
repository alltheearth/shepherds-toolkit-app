// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
// import MainLayout from './components/layout/MainLayout';
// import AuthLayout from './components/layout/AuthLayout'; 
// import Login from './pages/Auth/Login';
// import Register from './pages/Auth/Register';
import Dashboard from './components/Dashboard';
import Bible from './components/Bible'
import Sermons from './components/Sermons';
import Goals from './components/Goals';
import Calendar from './components/Calendar';
import Members from './components/Members';
import Finances from './components/Finances';
import Prayer from './components/Prayer';
import Library from './components/Library';
import Auth from './components/Auth';
import MainLayout from './components/layout/MainLayout';
import ReadingPlan from './components/ReadingPlan';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas de Autenticação */}
          <Route path="/" element={<Auth/>}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="login" element={<Auth />} />
            {/* <Route path="register" element={<Register />} /> */}
          </Route>

          {/* Rota Pública da Bíblia (sem sidebar) */}
          {/* <Route path="/bible" element={<Bible />} /> */}
          {/* Rotas Protegidas com Layout Principal */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/bible" element={<Bible />} />
            <Route path="/reading-plan" element={<ReadingPlan />} />
            <Route path="sermons" element={<Sermons />} />
            <Route path="goals" element={<Goals />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="members" element={<Members />} />
            <Route path="finances" element={<Finances />} />
            <Route path="prayer" element={<Prayer />} />
            <Route path="library" element={<Library />} />
          </Route>

          {/* Rota 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;