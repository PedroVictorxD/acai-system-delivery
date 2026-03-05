import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { LoginPage } from './pages/Login';
import { DashboardPage } from './pages/Dashboard';
import { PedidosPage } from './pages/Pedidos';
import { Header } from './components/layout/Header';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <>
      <Header title={title} />
      <div className="p-6">
        <div className="bg-surface-100 border border-surface-300 rounded-2xl p-8 text-center">
          <p className="text-text-muted text-lg">🚧 {title} — Em construção</p>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="pedidos" element={<PedidosPage />} />
            <Route path="cardapio" element={<PlaceholderPage title="Cardápio" />} />
            <Route path="produtos" element={<PlaceholderPage title="Produtos" />} />
            <Route path="clientes" element={<PlaceholderPage title="Clientes" />} />
            <Route path="caixa" element={<PlaceholderPage title="Caixa" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
