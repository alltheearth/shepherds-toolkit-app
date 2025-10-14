import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Bible from './components/bible';
import Sidebar from './components/layout/Sidebar';
import Sermons from './components/Sermons';

const App: React.FC = () => {
  return (

    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/login" element={<Auth />} />

          {/* Rotas protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bible"
            element={
              <ProtectedRoute>
                <Bible />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sermons"
            element={
              <ProtectedRoute>
                <Sermons />
              </ProtectedRoute>
            }
          />
          {/* Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
          </main>
    </div>
  );
};

export default App;